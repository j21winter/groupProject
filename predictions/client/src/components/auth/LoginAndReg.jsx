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
    <>
      <div className='d-flex justify-content-evenly mt-5'>
        <div className='w-50'>
          <RegForm errors={errors} setErrors={setErrors}/>

        </div>

        <div className='w-50'>
          <LoginForm errors={errors} setErrors={setErrors}/>
        
        </div>


      </div>
    </>
  )
}
export default LoginAndReg