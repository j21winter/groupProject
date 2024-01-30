import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/userContext'
import axios from 'axios'

const Predictions = () => {
  const {user, setUser, scoresAndPredictions, setScoresAndPredictions, teamNames } = useContext(UserContext)
  const [forms, setForms] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [displayWeek , setDisplayWeek] = useState({})
  const [gameWeekPoints, setGameWeekPoints] = useState("0")

  useEffect(() => {
    const nextGameWeek = Object.entries(scoresAndPredictions).filter(([key, value]) => value.gameWeekInfo && value.gameWeekInfo.is_next === true)
    setDisplayWeek(nextGameWeek[0][1])
  }, [])

// change handler
const changeHandler = (e, gameId) => {
  e.preventDefault()
  setForms(prevInput => ({
    ...prevInput, 
      [gameId] : {
        ...(prevInput[gameId] || { "gameId" : gameId, "user" : user._id}), 
        [e.target.name] : e.target.value}
  }))
}

const viewGameWeek = (e, data) => {
  e.preventDefault()
  const chosenGameWeek = Object.entries(scoresAndPredictions).filter(([key, value]) => key === data)
  setDisplayWeek(chosenGameWeek[0][1])
  gameWeekPointsTotal(chosenGameWeek[0][1].games)
}



const validatePredictionData = () => {
  setFormErrors({})
  let isValid = true
  const data = forms
  for(let key in data){
    if(!data[key].gameId || !data[key]['homeTeamScore'] || !data[key]['awayTeamScore']){
      setFormErrors(prevErrors => ({
        ...prevErrors, 
        [key] : "Error in Game " + key
        })
      )
      isValid = false
    }
  }

  return isValid
}

const submitPredictions = (e) => {
  e.preventDefault()
  const data = forms
  if(!validatePredictionData(data)){
    console.log("validation failed")
    return
  } else {
    console.log("validation passed!")
    setFormErrors({})
    const arrForms = Object.entries(forms).map(([key, value]) => value)
    axios.post('http://localhost:8000/api/predictions/new/many', arrForms, {withCredentials: true})
      .then(res => {
        setUser(prevUser => ({
          ...prevUser, 
          ['predictions'] : res.data.updatedUser.predictions,
          ['points'] : res.data.updatedUser.points
        }))
        setScoresAndPredictions(res.data.scoresAndPredictions)
        setForms({})
      })
      .catch(err => console.log(err))
  }
}

  // convert date format concise
    const convertDateConcise = data => {
      const localDate = new Date(localDeadline(data))
      return localDate.toLocaleDateString()
    }
  
  // Convert to US time 
  const localDeadline = date => {
    let deadline = new Date(date)
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let localDeadline = deadline.toLocaleString('en-US', {userTimeZone})

    return localDeadline
  }

  const sortByDate = data => {
    const dateOrder = data.slice().sort((a,b) => new Date(a.gameInfo.kickoff_time) -  new Date(b.gameInfo.kickoff_time))
    return dateOrder
  }

  const gameWeekPointsTotal = (games) => {


    let pointsSum = 0 
    for(let game of games){
      console.log(game)
      if(game.prediction){
        pointsSum += game.prediction.pointsLog.totalPoints

        console.log(pointsSum)
      } else {
        continue
      }
    }

    setGameWeekPoints(pointsSum)
  }
  
  return (
    <>
      <div className="container">
        <div className='main d-flex'>
          {/* left */}
          <div className='sidebar col-2 p-2'>
            <div className='text-center'>
              <p>Your Predictions</p>
              <button className="btn btn-outline-primary p-2 mb-2" onClick={(e) => submitPredictions(e)}>Submit your Predictions</button>
            </div>
            {Object.entries(scoresAndPredictions).map(([key, value]) => (
              <button key={key} className='btn btn-sm btn-primary w-100 mb-1' onClick={(e) => viewGameWeek(e, key)}>{value.gameWeekInfo ? value.gameWeekInfo.name : "unassigned Games"} </button>
            ))}
          </div>
          {/* right */}
          <div className='w-100'>

            {/* header */}
            <div className='d-flex justify-content-end '>
              <div className='text-center'>
                <p>Total Points</p>
                <p>{user.points}</p>
              </div>
              <Link to={'/dashboard'} className='col-5 text-end'>Dashboard</Link>
            </div>

            {/* scores and predictions */}
              {displayWeek && displayWeek.gameWeekInfo && 
                <div>
                  <p className='text-center'>{displayWeek.gameWeekInfo.name || "unassigned Games"} </p>
                  <div className='d-flex justify-content-evenly'>
                    <p> Game Count {displayWeek.games.length}</p>
                    {displayWeek.gameWeekInfo ? <p>Deadline : {convertDateConcise(displayWeek.gameWeekInfo.deadline_time)}</p> : <p>No Deadline Set</p>}
                    <p> Finished: {displayWeek.gameWeekInfo && displayWeek.gameWeekInfo.finished ? "true" : "False"}</p>
                    {displayWeek.gameWeekInfo.is_current ? (
                      <p>Current Game Week</p> 
                      ) : displayWeek.gameWeekInfo.is_previous ? (
                        <p>Previous Game Week</p> 
                      ) : displayWeek.gameWeekInfo.is_next ? (
                        <p>Next Game Week</p>
                      ) : displayWeek.gameWeekInfo.finished ? (
                        <p>Past Game Week</p>
                      ) : <p>Future Game Week</p>
                    }
                    <p>Gameweek Points : {gameWeekPoints}</p>
                  </div>
                </div>
              }

                {displayWeek && displayWeek.games && sortByDate(displayWeek.games).map((game) => (
                  <div id={displayWeek.gameWeekInfo ? displayWeek.gameWeekInfo.id : "unassigned Games"} key={game.gameInfo.id} className=' border border-1 border-black rounded rounded-2 '>
                    <div className='w-100 d-flex justify-content-between align-items-center p-2 m-0'>
                      <p  className='col-1 text-start px-1'>Game {game.gameInfo.id}</p>
                      <div className='d-flex justify-content-center align-items-center border border-1 border-dark-subtle col-7'>
                        {game.prediction ? 
                          <div className='text-center'>
                            <p className='m-0'>Prediction</p>
                            <p className='text-danger m-0'>{game.prediction.homeTeamScore}</p>
                          </div>
                          : "" }
                          <div className='d-flex justify-content-evenly w-100'>
                            <p className='col-4 text-center m-0'>{teamNames[game.gameInfo.team_h]}</p>
                            <p className='col-1 text-center m-0'>{game.gameInfo.team_h_score}</p>
                            <p className='m-0'>vs</p>
                            <p className='col-1 text-center m-0'>{game.gameInfo.team_a_score}</p>
                            <p className='col-4 text-center m-0'>{teamNames[game.gameInfo.team_a]}</p>
                          </div>
                        {game.prediction ? 
                          <div className='text-center'>
                            <p className='m-0'>Prediction</p>
                            <p className='text-danger m-0'>{game.prediction.awayTeamScore}</p>
                          </div>
                          : "" }
                      </div>
                      <div>
                        <p className='col-1 text-center'>{game.gameInfo.kickoff_time ? convertDateConcise(game.gameInfo.kickoff_time) : ""}</p>
                        {game.prediction ? <p>Total Points: {game.prediction.pointsLog.totalPoints}</p> : ""}
                      </div>
                    </div>
                    {/* iif prediction is needed and we are not passed the deadline */}
                    {game.prediction === null && new Date() < new Date(localDeadline(displayWeek.gameWeekInfo.deadline_time)) ? (
                      <div className='mx-auto'>
                      {formErrors[game.gameInfo.id] ? <p className='text-danger text-center '>{formErrors[game.gameInfo.id]}</p> : ""}
                        <form action="" className='text-center mb-2 d-flex bg-danger-subtle p-1 mx-1 align-items-center '>

                            <p className='text-center w-25 m-0 p-0'>Prediction REQUIRED</p>

                            <div className='w-75 d-flex'>
                              
                              <div className="input-group input-group-sm border-1 border-black px-1">
                                <label htmlFor="homeTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_h]} Score:</label>
                                <input type="number" name='homeTeamScore' min={0} className="form-control border-1 text-center" onChange={(e) => changeHandler(e, game.gameInfo.id)}/>
                              </div>

                              <div className="input-group input-group-sm border-1 border-black px-1">
                                <label htmlFor="awayTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_a]} Score</label>
                                <input type="number" name='awayTeamScore' min={0} className="form-control border-1 text-center"  onChange={(e) => changeHandler(e, game.gameInfo.id)}/>
                              </div>

                            </div>

                        </form>
                      </div>
                    ) : (
                      ""
                    ) }
                  </div>
                ))}
              </div>
            </div>
          </div>

    </>
  )
}

export default Predictions