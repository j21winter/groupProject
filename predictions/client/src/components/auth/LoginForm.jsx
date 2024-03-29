import React, {useState, useContext}from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/userContext';

const LoginForm = (props) => {
    const {errors, setErrors, setComponent} = props
    const { saveLoggedInUser, setScoresAndPredictions } = useContext(UserContext)
    const navigate = useNavigate()

    // INPUT STORAGE
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    });
    
    // ON CHANGE HANDLERS
    const handleLoginInputChange = e => {
        e.preventDefault();
    
        setLoginInput((prevInput) => ({
            ...prevInput, 
                [e.target.name]: e.target.value})
        )
    };
    
    // SUBMIT FUNCTIONS
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // error reset
        setErrors( prevErrors =>({
            ...prevErrors, 
                ["login"] : { 
                    error : ""
                }
        }));

        //FRONT END VALIDATE?
        if(!validate(loginInput)){
            return;
        }

        // API Call
        axios.post('http://localhost:8000/api/login', loginInput, {withCredentials: true})
            .then(res => {
                // save user to state and local memory
                saveLoggedInUser(res.data.user)
                // save scores and predictions to state
                setScoresAndPredictions(res.data.scoresAndPredictions)
                // redirect to dashboard
                navigate('/dashboard')
            })
            .catch(err => {
                // Add errors for display
                setErrors( prevErrors =>({
                    ...prevErrors, 
                        ["login"] : { 
                        ...prevErrors.login,
                            ["error"] : "Invalid Login Credentials"
                    }
            }));
        });
    };
    
    // Front end validation for login
    function validate(loginObject){
        const loginErrors = {}
        let isValid = true
        // check length
        if(loginObject['email'].length < 1){
            loginErrors.email = "Email is required"
            isValid = false
        }
        // check length
        if(loginObject['password'].length < 1){
            loginErrors.password = "Password is required"
            isValid = false
        }
        
        // Set the errors
        setErrors( prevErrors =>({
            ...prevErrors, 
                ["login"] : { 
                ...prevErrors.login,
                    ...loginErrors
                }
        }));
        return isValid
    }

return (
    <>
        <div id='login' className='card p-0 w-100 rounded rounded-2 overflow-hidden border-0'>


            {/* LOGIN FORM */}
            <form onSubmit={(e) => handleLoginSubmit(e)} className='shadow bg-white rounded-3 overflow-hidden border border-1 border-white text-center'>

                <div className='d-flex align-items-center text-center ps-2 pe-2 '  style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>
                    <p className='fs-5 mx-auto m-0 text-center text-white '>Login</p>
                </div>
                
                <div className="formInfo" >
                    <div className="input-group input-group-sm border-0 pt-3 mb-3 px-2 ">
                        <label htmlFor="email" className="input-group-text border-0" style={{backgroundColor: "#ffffff"}}>Email </label>
                        <input type="email" name='email' className="form-control border-0 text-end" value={loginInput.email} onChange={(e) => handleLoginInputChange(e)}/>
                    </div>
                    {errors.login.email ? <p className=' text-center'>{errors.login.email}</p> : ""}

                    <div className="input-group input-group-sm border-0 mb-3 px-2 ">
                        <label htmlFor="password" className="input-group-text border-0" style={{backgroundColor: "#ffffff"}}>Password </label>
                        <input type="password" name='password' className="form-control border-0 text-end" value={loginInput.password} onChange={(e) => handleLoginInputChange(e)}/>
                    </div>
                    {errors.login.password ? <p className=' text-center'>{errors.login.password}</p> : ""}
                    {errors.login.error ? <p className=' text-center'>{errors.login.error}</p> : ""}
                    
                    <button className="btn btn-sm m-1" type="submit" style={{backgroundColor: "#00ff85", color: "#38003c"}}>Login</button>
                    <button className="btn btn-sm btn-secondary  m-1" type="submit" onClick={() => setComponent("")}>Cancel</button>

                </div>

            </form>
        </div>
    </>
  )
}

export default LoginForm