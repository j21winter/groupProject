import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from 'axios';

const RegForm = (props) => {
    const {errors, setErrors} = props
    const { saveLoggedInUser } = useContext(UserContext)
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
        }))
    
        // make API call to register
        axios.post('http://localhost:8000/api/register', regInput, {withCredentials: true})
            .then(res => {
                saveLoggedInUser(res.data.user)
                // redirect to homepage
                navigate('/home') 
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
        <div id='registration' className='card p-0 m-2 w-100 rounded rounded 2 overflow-hidden border-0 ' style={{ backgroundColor: "rgb(192, 214, 223)"}}>

            <form onSubmit={(e) => handleRegSubmit(e)} className=''>
                <div className='d-flex align-items-center text-center ps-2 pe-2 mb-3'  style={{color: '#ffffff', backgroundColor: "#26637b"}}>
                    <p className='fs-5 mx-auto m-0 text-center '>Registration</p>
                </div>

                <div className="input-group input-group-sm border-0 mb-3 px-2">
                    <label htmlFor="firstName" className="input-group-text border-0" style={{backgroundColor: "#ffffff"}}>First name </label>
                    <input type="text" name='firstName' className="form-control border-0 text-end bg-light" value={regInput.firstName} onChange={(e) => handleRegistrationInputChange(e)}/>
                </div>
                {errors.registration.firstName ? <p className='text-white text-center'>{errors.registration.firstName}</p> : ""}

                <div className="input-group input-group-sm border-0 mb-3 px-2">
                    <label htmlFor="lastName" className="input-group-text border-0" style={{backgroundColor: "#ffffff"}}>Last name </label>
                    <input type="text" name='lastName' className="form-control border-0 text-end bg-light" value={regInput.lastName} onChange={(e) => handleRegistrationInputChange(e)}/>
                </div>
                {errors.registration.lastName ? <p className='text-white text-center'>{errors.registration.lastName}</p> : ""}

                <div className="input-group input-group-sm border-0 mb-3 px-2">
                    <label htmlFor="email" className="input-group-text border-0 " style={{backgroundColor: "#ffffff"}}>Email </label>
                    <input type="email" name='email' className="form-control border-0 text-end bg-light" value={regInput.email} onChange={(e) => handleRegistrationInputChange(e)}/>
                </div>
                {errors.registration.email ? <p className='text-white text-center'>{errors.registration.email}</p> : ""}

                <div className="input-group input-group-sm border-0 mb-3 px-2">
                    <label htmlFor="password" className="input-group-text border-0 " style={{backgroundColor: "#ffffff"}}>Password </label>
                    <input type="password" name='password' className="form-control border-0 text-end bg-light" value={regInput.password} onChange={(e) => handleRegistrationInputChange(e)}/>
                </div>
                {errors.registration.password ? <p className='text-white text-center'>{errors.registration.password}</p> : ""}

                <div className="input-group input-group-sm border-0 mb-3 px-2">
                    <label htmlFor="confirmPassword" className="input-group-text border-0 " style={{backgroundColor: "#ffffff"}}>Confirm Password </label>
                    <input type="password" name='confirmPassword' className="form-control border-0 text-end bg-light" value={regInput.confirmPassword} onChange={(e) => handleRegistrationInputChange(e)}/>
                </div>
                {errors.registration.confirmPassword ? <p className='text-white text-center'>{errors.registration.confirmPassword}</p> : ""}

                <button className="btn btn-sm w-100 rounded-top-0 " type="submit" style={{backgroundColor: "#84a59d", color: "#ffffff"}}>Register</button>

            </form>
        </div>
    </>
  )
}

export default RegForm