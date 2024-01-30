import React from 'react'
import UserContext from '../context/userContext'
import {useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Header = () => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
  
  
    // Logout user
    const handleLogout = async (e) => {
      e.preventDefault()
      await localStorage.removeItem("user")
      await localStorage.removeItem("scoresAndPredictions")
      axios.post('http://localhost:8000/api/logout' , {}, {withCredentials: true})
          .then(res => {
              setUser({})
              navigate('/login')
          })
          .catch(err => console.log(err))
        } 
  return (
    <div>
        <div className='header d-flex justify-content-between p-2 align-items-center ' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>
          <h1 className='text-white'>Premier League Predictions</h1>
        </div>
        <div className='toolBar bg-white p-2 d-flex justify-content-between align-items-center'>
          <Link to={"/predictions"} className='btn shadow text-dark-emphasis fw-bold'>Your Predictions</Link>
          <p className='btn shadow text-dark-emphasis fw-bold m-0'>Your points: {user.points}</p>
          <button onClick={handleLogout} className="btn" style={{backgroundColor : "#e90052", color: "#38003c"}}>Logout</button>
        </div>
    </div>
        
  )
}

export default Header