import React, { useState } from 'react';
import RegForm from './RegForm';
import LoginForm from './LoginForm';



const LoginAndReg = () => {
  // Errors
  const [errors, setErrors] = useState({
    login : {
      error: "",
      email: "",
      password: ""
    },
    registration : {
      firstName: "", 
      lastName: "", 
      email: "", 
      password: "", 
      confirmPassword: ""
    }
  })

  
  return(
    
      <div className="container-fluid main_container mh-100 d-inline-block " style={{backgroundColor: "	#38003c"}}>
        <div className='d-flex justify-content-evenly m-5'>
          <div className='w-50 ' >
            <RegForm errors={errors} setErrors={setErrors}/>

          </div>

          <div className='w-50'>
            <LoginForm errors={errors} setErrors={setErrors}/>
          
          </div>


        </div>
      </div>
 
  )
}
export default LoginAndReg