import React from 'react'
import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/userContext';

const DashboardLeft = (props) => {
  const { saveLoggedInUser } = useContext(UserContext)
  //need to grab errors object for form
  const {errors, setErrors} = props

  const handleLeagueSubmit = (e) => {
    e.preventDefault();
    // error reset
    setErrors( prevErrors =>({
        ...prevErrors, 
            ["league"] : { 
                error : ""
            }
    }));

    axios.post('http://localhost:8000/api/league/new', leagueInput, {withCredentials: true})
            .then(res => {
                newLeague(res.data.league)
                // redirect to same dashboard, new league should pop up above form
                navigate('/dashboard')
            })
            .catch(err => {
                // Add errors for display
                setErrors( prevErrors =>({
                    ...prevErrors, 
                        ["league"] : { 
                        ...prevErrors.league,
                            ["error"] : "Error creating league"
                    }
            }));
        });
  }
  // need to make axios call to grab users leagues. How to do this using the logged in users id? 

  return (

    <>
        {/* Links to leaderboard and predictions pages */}
        <Link to ={"/leaderboard"}>Global Leaderboard</Link>
        <Link to ={"/predictions"}>Your Predictions</Link>

        {/* display users leagues */}
        <div className="yourLeagues">
          <h3>Your Leagues</h3>
          {/* will need to map through the users leagues and display */}
        </div>

        <div className="leagueForm">
          <h3>Create a League</h3>
          {/* League Form */}
        <form onSubmit={(e) => handleLeagueSubmit(e)}>
{/* will possibly need user id as hidden input for owner */}
          <div >
            <label htmlFor="league_name" >League Name: </label>
            <input type="text" name='league_name'  value={leagueInput.league_name} onChange={(e) => handleLeagueInputChange(e)}/>
          </div>
          {errors.league.league_name ? <p className='text-white text-center'>{errors.league.league_name}</p> : ""}

        </form>
        </div>
        
        
    </>
  )
}

export default DashboardLeft