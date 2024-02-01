import React, { useEffect } from 'react'
import UserContext from '../context/userContext'
import {useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const {user, setUser, scoresAndPredictions} = useContext(UserContext)
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState({})
    const [gameWeekName, setGameWeekName] = useState("")



    useEffect(() => {
      const intervalId = setInterval(() => {
        makeCountdown();
      }, 1000);
    
      return () => {
        // Clear the interval to prevent memory leaks
        clearInterval(intervalId);
      };
      

    }, [])

    const makeCountdown = () => {
      const deadline = getDeadline()
      const time = timeToDeadLine(deadline)
      setCountdown(time)
      return time
    }
  
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

  // Deadline Countdown
  const getDeadline = () => {
    const nextGameWeek = Object.entries(scoresAndPredictions).filter(([key, value]) => value.gameWeekInfo && value.gameWeekInfo.is_next === true)[0][1]

    setGameWeekName(nextGameWeek.gameWeekInfo.name)
    const nextDeadline = new Date(nextGameWeek.gameWeekInfo.deadline_time)
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDeadline = nextDeadline.toLocaleString('en-US', {userTimeZone})

    return localDeadline
  }

  const timeToDeadLine = (deadline) => {
    const now = new Date().getTime();
    const target = new Date(deadline).getTime();

    const difference = target - now;

    if(difference <= 0) {
      return {days: 0, hours: 0, minutes : 0, seconds: 0}
    }

    const days = Math.floor(difference /(1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);


    return { days, hours, minutes, seconds };
  }

  return (
    <div>
        <div className='header d-flex justify-content-between p-2 align-items-center ' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>
          <h1 className='text-white'>Premier League Predictions</h1>
        </div>
        <div className='toolBar bg-white p-2 d-flex justify-content-between align-items-center'>
          <p className='btn shadow text-dark-emphasis fw-bold m-0' style={{borderColor: "#00ff85"}}>Welcome, {user.firstName}.</p>
          <p className='btn shadow text-dark-emphasis fw-bold m-0' style={{borderColor: "#00ff85"}}>Your points: {user.points}</p>
          {countdown && countdown.seconds ? 
          <p className='btn shadow text-dark-emphasis fw-bold m-0' style={{borderColor: "#00ff85"}}>{countdown.days}d, {countdown.hours}h, {countdown.minutes}m, {countdown.seconds}s to {gameWeekName} Deadline</p>  : ""}
          <Link to={"/dashboard"} className='btn shadow text-dark-emphasis fw-bold' style={{borderColor: "#00ff85"}}>Dashboard</Link>
          <Link to={"/predictions"} className='btn shadow text-dark-emphasis fw-bold' style={{borderColor: "#00ff85"}}>Your Predictions</Link>

          <button onClick={handleLogout} className="btn" style={{backgroundColor : "#e90052", color: "#ffffff"}}>Logout</button>
        </div>
    </div>
        
  )
}

export default Header