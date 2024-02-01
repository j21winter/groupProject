import React, {useContext, useState} from 'react';
import FootballWidget from '../../LiveApi/FootballWidget';
import { useNavigate } from 'react-router-dom';
// import '../../App.css';
import welcomingHeader from '../../assets/Black White Minimalist Animation Logo Video  (1).gif'
import ad from '../../assets/ad.gif'
import LoginForm from '../auth/LoginForm'
import RegForm from '../auth/RegForm'
import PremierLeagueStanding from '../../LiveApi/PremireLeagueStanding';



export default function Homepage() {
const Navigate = useNavigate();
const [component, setComponent ] = useState("")


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


return (
    <div className='w-100'> 
        <div className='header d-flex justify-content-between p-2 align-items-center ' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>
            <h1 className='text-white'>Premier League Predictions</h1>
        </div>
        <div className='d-flex justify-content-evenly w-100'>
            <button className='btn shadow text-dark-emphasis fw-bold m-1' style={{border: "1px solid #00ff85"}} onClick={() => setComponent('login')}>Login</button>
            <button className='btn shadow text-dark-emphasis fw-bold m-1'  style={{border: "1px solid #04f5ff"}} onClick={() => setComponent('register')}>Register</button>
        </div>
        <div className="ps-0 w-100 mx-auto overflow-hidden " style={{ backgroundColor: "#38003c" }}>
            {component && component == "login" ? (
                <div className='p-1 w-50 mx-auto m-2'>
                    <LoginForm errors={errors} setErrors={setErrors} setComponent={setComponent}/>
                </div>
            ) : component == "register" ? (
                <div className='p-1 w-50 mx-auto m-2'>
                    <RegForm errors={errors} setErrors={setErrors} setComponent={setComponent} />
                </div>
            ) : ""
            }
        </div>
        <img src={welcomingHeader} alt="welcoming-header" style={{ 
            width: '100vw',  
            height: '35vw',
            display: 'block', 
            objectFit: 'cover'
            }} /> 
        <div>
            <h2 className="text-center mb-4 mt-4" style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 'bold' }}>Football Fixtures</h2>
            <div className="container mb-4 mt-4" style={{ 
                backgroundColor: "#38003c", 
                borderRadius: "8px", 
                padding: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 2, 2)" // Added shadow
            }}>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4" style={{ padding: "10px", backgroundColor: "transparent" }}>
                        <FootballWidget />
                    </div>
                    <div className="col-md-8" style={{ padding: "10px", backgroundColor: "transparent" }}>
                        <PremierLeagueStanding />
                    </div>
                </div>
            </div>
        </div>
        <img src={ad} alt="welcoming-header" style={{ 
            width: '100vw',  
            height: 'auto',
            display: 'block', 
            objectFit: 'cover'}} />
    </div>
);
}
