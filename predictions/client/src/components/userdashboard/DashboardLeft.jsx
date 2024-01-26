import React from 'react'
import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/userContext';

const DashboardLeft = (props) => {
  // const { saveLoggedInUser } = useContext(UserContext)
  //need to grab errors object for form
  // Errors
  const [errors, setErrors] = useState({
    leagues : {
      league_name: ""
    },
    
  })
  const [leagueInput, setLeagueInput]=useState({})

  const handleLeagueSubmit = (e) => {
    e.preventDefault();
   
    axios.post('http://localhost:8000/api/league/new', {leagueInput}, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                // redirect to same dashboard, new league should pop up above form
                navigate('/dashboard')
            })
            .catch(err=>{
              console.log(err)
              setErrors(err.response.data.error.errors);
              console.log("error1", errors)
          }) 
  }
  // need to make axios call to grab users leagues. How to do this using the logged in users id? 

  return (

    <>
        {/* Links to leaderboard and predictions pages */}
        <Link to ={"/leaderboard"}>Global Leaderboard</Link>
        <br />
        <Link to ={"/predictions"}>Your Predictions</Link>

        {/* display users leagues */}
        <div className="yourLeagues">
          <h5>Your Leagues</h5>
          {/* will need to map through the users leagues and display */}
        </div>

        <div className="leagueForm">
          <h5>Create a League</h5>
          {/* League Form */}
        <form onSubmit={(e) => handleLeagueSubmit(e)}>
{/* will possibly need user id as hidden input for owner */}
          <div >
            <label >League Name: </label>
            <input type="text" name="league_name"  onChange={(e)=>setLeagueInput(e.target.value)}/>
            <button>Submit</button>
          </div>
          {errors.league_name ? <p className='text-white text-center'>{errors.league_name.message}</p> : ""}

        </form>
        </div>
        
        
    </>
  )
}

export default DashboardLeft