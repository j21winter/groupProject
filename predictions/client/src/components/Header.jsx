import React, { useEffect } from 'react'
import UserContext from '../context/userContext'
import {useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const {user, setUser, scoresAndPredictions} = useContext(UserContext)
    const navigate = useNavigate()

    // Logout user
    const handleLogout = (e) => {
      e.preventDefault()
      localStorage.removeItem("user")
      localStorage.removeItem("scoresAndPredictions")
      axios.post('http://localhost:8000/api/logout' , {}, {withCredentials: true})
          .then(res => {
              setUser({})
              navigate('/')
          })
          .catch(err => console.log(err))
        } 


  return (
    <div>
        <div className='header d-flex justify-content-between p-2 align-items-center ' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>
          <h1 className='text-white'>Premier League Predictions</h1>
        </div>
        <div className='toolBar bg-white p-2 d-flex justify-content-between align-items-center'>
          <p className='text-dark-emphasis fw-bold m-0' style={{borderColor: "#00ff85"}}>Welcome, {user.firstName}. You have {user.points} points.</p>
          {/* <p className='btn shadow text-dark-emphasis fw-bold m-0' style={{borderColor: "#00ff85"}}>Your points: {user.points}</p> */}
          <Link to={"/dashboard"} className='btn shadow text-dark-emphasis fw-bold' style={{borderColor: "#00ff85"}}>Dashboard</Link>
          <Link to={"/predictions"} className='btn shadow text-dark-emphasis fw-bold' style={{borderColor: "#00ff85"}}>Your Predictions</Link>

          <button onClick={handleLogout} className="btn" style={{backgroundColor : "#e90052", color: "#ffffff"}}>Logout</button>
        </div>
    </div>
        
  )
}

export default Header