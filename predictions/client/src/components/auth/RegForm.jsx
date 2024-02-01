import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from 'axios';

const RegForm = (props) => {
    const {errors, setErrors, setComponent} = props
    const { saveLoggedInUser, setScoresAndPredictions } = useContext(UserContext)
    const navigate = useNavigate();

    // INPUT STORAGE
    const [regInput, setRegInput] = useState({
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmPassword: ""
    });

    // ONCHANGE HANDLER
    const handleRegistrationInputChange = e => {
        e.preventDefault();
    
        setRegInput((prevInput) => ({
            ...prevInput, 
                [e.target.name]: e.target.value})
        )
    };

    // Validation function
    function validate(regInput){
        const registrationErrors = {};
        let isValid = true;
    
        
        if (regInput.firstName.length < 3) {
            registrationErrors.firstName = 'First name must be at least 3 characters';
            isValid = false;
        }
    
        
        if (regInput.lastName.length < 3) {
            registrationErrors.lastName = 'Last name must be at least 3 characters';
            isValid = false;
        }
    
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(regInput.email)) {
            registrationErrors.email = 'Invalid email format';
            isValid = false;
        }
    
        
        if (regInput.password.length < 8) {
            registrationErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }
    
        // Set the errors
        setErrors((prevErrors) => ({
        ...prevErrors,
        ['registration']: {
            ...prevErrors['registration'],
            ...registrationErrors,
        },
        }));
    
        return isValid;
    };

    // ONSUBMIT FUNCTION
    const handleRegSubmit = (e) => {
        e.preventDefault();
        //! error reset
        setErrors(prevErrors =>( {
            ...prevErrors, 
                ["registration"] : {
                    firstName: "", 
                    lastName: "", 
                    email: "", 
                    password: "", 
                    confirmPassword: ""
            }
        }));
        //Validation for Register
        if(!validate(regInput)){
            return;
        }
    
        // make API call to register
        axios.post('http://localhost:8000/api/register', regInput, {withCredentials: true})
            .then(res => {
                saveLoggedInUser(res.data.user)
                setScoresAndPredictions(res.data.scoresAndPredictions)
                navigate('/dashboard') 
            })
            .catch(err => {
                setErrors( prevErrors => {
                    const formErrors = err.response.data.errors
                    const updatedErrors = {...prevErrors}
                    for(const field in formErrors){
                        const message = formErrors[field]["message"]
                        updatedErrors["registration"][field] = message
                }
                return updatedErrors;
            })
        });
    };
        


    return (
    <>{/* REGISTRATION FORM */}
        <div id='registration' className='card p-0 w-100 rounded rounded-2 overflow-hidden border-0 bg-white'>

            <form onSubmit={(e) => handleRegSubmit(e)} className='shadow bg-white rounded-3 overflow-hidden border border-1 border-white' >
                <div className='d-flex align-items-center text-center ps-2 pe-2 '  style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>
                    <p className='fs-5 mx-auto m-0 text-center text-white '>Registration</p>
                </div>

                <div className="formInfo bg-white text-center" >

                    <div className="input-group input-group-sm border-0 pt-3 mb-3 px-2 " >
                        <label htmlFor="firstName" className="input-group-text border-0" style={{backgroundColor: "#ffffff"}}>First name </label>
                        <input type="text" name='firstName' className="form-control border-0 text-end bg-light" value={regInput.firstName} onChange={(e) => handleRegistrationInputChange(e)}/>
                    </div>
                    {errors.registration.firstName ? <p className=' text-center'>{errors.registration.firstName}</p> : ""}

                    <div className="input-group input-group-sm border-0 mb-3 px-2">
                        <label htmlFor="lastName" className="input-group-text border-0" style={{backgroundColor: "#ffffff"}}>Last name </label>
                        <input type="text" name='lastName' className="form-control border-0 text-end bg-light" value={regInput.lastName} onChange={(e) => handleRegistrationInputChange(e)}/>
                    </div>
                    {errors.registration.lastName ? <p className=' text-center'>{errors.registration.lastName}</p> : ""}

                    <div className="input-group input-group-sm border-0 mb-3 px-2">
                        <label htmlFor="email" className="input-group-text border-0 " style={{backgroundColor: "#ffffff"}}>Email </label>
                        <input type="email" name='email' className="form-control border-0 text-end bg-light" value={regInput.email} onChange={(e) => handleRegistrationInputChange(e)}/>
                    </div>
                    {errors.registration.email ? <p className=' text-center'>{errors.registration.email}</p> : ""}

                    <div className="input-group input-group-sm border-0 mb-3 px-2">
                        <label htmlFor="password" className="input-group-text border-0 " style={{backgroundColor: "#ffffff"}}>Password </label>
                        <input type="password" name='password' className="form-control border-0 text-end bg-light" value={regInput.password} onChange={(e) => handleRegistrationInputChange(e)}/>
                    </div>
                    {errors.registration.password ? <p className=' text-center'>{errors.registration.password}</p> : ""}

                    <div className="input-group input-group-sm border-0 mb-3 px-2">
                        <label htmlFor="confirmPassword" className="input-group-text border-0 " style={{backgroundColor: "#ffffff"}}>Confirm Password </label>
                        <input type="password" name='confirmPassword' className="form-control border-0 text-end bg-light" value={regInput.confirmPassword} onChange={(e) => handleRegistrationInputChange(e)}/>
                    </div>
                    {errors.registration.confirmPassword ? <p className=' text-center'>{errors.registration.confirmPassword}</p> : ""}

                    <button className="btn btn-sm m-1" type="submit" style={{backgroundColor: "#00ff85", color: "#38003c"}}>Login</button>
                    <button className="btn btn-sm btn-secondary  m-1" type="submit" onClick={() => setComponent("")}>Cancel</button>
                </div>


            </form>
        </div>
    </>
  )
}

export default RegForm