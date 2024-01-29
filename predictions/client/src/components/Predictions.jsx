import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/userContext'
import axios from 'axios'

const Predictions = () => {
  const {user, setUser, scoresAndPredictions, setScoresAndPredictions, teamNames } = useContext(UserContext)
  const [forms, setForms] = useState({})
  const [formErrors, setFormErrors] = useState({})

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
      const parts = data.split('T')
      const date = parts[0].split('-')

      const newDate = [date[1], date[2], date[0]]

      return newDate.join("/")
    }
  
  return (
    <>
      <div className="container">
        <div className="header d-flex justify-content-between align-items-center ">
          <div>
            <p>Your Predictions</p>
            <button onClick={(e) => submitPredictions(e)}>Submit your Predictions</button>
          </div>
          <div className='text-center'>
            <p>Total Points</p>
            <p>{user.points}</p>
          </div>
          <Link to={'/dashboard'}>Dashboard</Link>
        </div>

    {/* try filtering into game weeks. May need to adjust the data before the mapping */}
        <div>
          {Object.entries(scoresAndPredictions).map(([key, value]) => (
            <div key={key} >
              <p className='text-center'>{value.gameWeekInfo ? value.gameWeekInfo.name : "unassigned Games"} </p>
              <p> {value.gameWeekInfo ? convertDateConcise(value.gameWeekInfo.deadline_time) : "No Deadline Set"}</p>
              <p> Finished: {value.gameWeekInfo && value.gameWeekInfo.finished ? "true" : "False"}</p>
              <div>
                {value && value.games.map((game) => (
                  <div id={value.gameWeekInfo ? value.gameWeekInfo.id : "unassigned Games"} key={game.gameInfo.id} className=' border border-1 border-black rounded rounded-2 '>
                    <div className='w-100 d-flex justify-content-between   '>
                      <p  className='col-3 text-center'>Game {game.gameInfo.id}</p>
                      <p className='col-3 text-center'>{game.gameInfo.kickoff_time ? convertDateConcise(game.gameInfo.kickoff_time) : ""}</p>
                      <p className='col-3 text-center'>Game Finished :{ game.gameInfo.finished ? "true" : "false" }</p>
                    </div>
                    <div className='d-flex justify-content-center border border-1 border-dark-subtle'>
                      <p className='col-4 text-center'>{teamNames[game.gameInfo.team_h]}</p>
                      <p className='col-1 text-center'>{game.gameInfo.team_h_score}</p>
                      <p>vs</p>
                      <p className='col-1 text-center'>{game.gameInfo.team_a_score}</p>
                      <p className='col-4 text-center'>{teamNames[game.gameInfo.team_a]}</p>
                    </div>
                    {game.prediction ? (
                      <div className='bg-dark-subtle'>
                        <p className='text-center'>Prediction</p>
                        <div className='d-flex justify-content-center'>
                          <p className='col-1 text-center'>{game.prediction.homeTeamScore}</p>
                          <p>vs</p>
                          <p className='col-1 text-center'>{game.prediction.awayTeamScore}</p>
                        </div>
                        <p className='text-center'>Points = {game.prediction.pointsLog.totalPoints}</p>
                      </div>
                    ) : (
                      <div className='w-75 mx-auto'>
                        <p className='text-center'>Prediction REQUIRED</p>
                        {formErrors[game.gameInfo.id] ? <p className='text-danger bg-dark-subtle text-center '>{formErrors[game.gameInfo.id]}</p> : ""}
                        <form action="" className='text-center mb-2'>
                          <div className='d-flex bg-dark-subtle p-1'>
                            <div className="input-group input-group-sm border-1 border-black px-1 w-50">
                              <label htmlFor="homeTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_h]} Score:</label>
                              <input type="number" name='homeTeamScore' min={0} className="form-control border-1 text-center" onChange={(e) => changeHandler(e, game.gameInfo.id)}/>
                            </div>
                            <div className="input-group input-group-sm border-1 border-black px-1 w-50">
                              <input type="number" name='awayTeamScore' min={0} className="form-control border-1 text-center"  onChange={(e) => changeHandler(e, game.gameInfo.id)}/>
                              <label htmlFor="awayTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_a]} Score</label>
                            </div>
                          </div>
                        </form>
                      </div>
                    ) }

                  </div>
                ))}
              </div>
            </div>
              ))}

        </div> 
      </div> 
    </>
  )
}

export default Predictions