import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../context/userContext'
import axios from 'axios'
import Header from '../components/Header'

const Predictions = () => {
  const {user, setUser, scoresAndPredictions, setScoresAndPredictions, teamNames } = useContext(UserContext)
  const [forms, setForms] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [displayWeek , setDisplayWeek] = useState({})
  const [gameWeekPoints, setGameWeekPoints] = useState("0")

  // find the game week that is next and display it when the page is mounted
  useEffect(() => {
    const nextGameWeek = Object.entries(scoresAndPredictions).filter(([key, value]) => value.gameWeekInfo && value.gameWeekInfo.is_next === true)
    setDisplayWeek(nextGameWeek[0][1])
  }, [])

  // Change handler to track any new predictions that are made on any game
const changeHandler = (e, gameId) => {
  e.preventDefault()
  setForms(prevInput => ({
    ...prevInput, 
      [gameId] : {
        ...(prevInput[gameId] || { "gameId" : gameId, "user" : user._id}), 
        [e.target.name] : e.target.value}
  }))
}

// Function to adjust the game week we are viewing on click of a button in the left nav
  const viewGameWeek =  (e, data) => {
    e.preventDefault()
    const chosenGameWeek = scoresAndPredictions[data]
    setDisplayWeek(chosenGameWeek)
    gameWeekPointsTotal(chosenGameWeek.games)
  }

  // Update display after submitting any predictions
  const updateGameWeek =  (data, scores) => {
    const chosenGameWeek =  Object.entries(scores).filter(([key, value]) => key === data)
    setDisplayWeek(chosenGameWeek[0][1])
    gameWeekPointsTotal(chosenGameWeek[0][1].games)
  }

  // make sure what we are sending is in valid prediction format
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

  // Submit a bundle of predictions
const submitPredictions = async (e) => {
  e.preventDefault()

  try{
    const data = forms
    // if it fails validations return false message
    if(!validatePredictionData(data)){
      console.log("validation failed")
      return

    } else {
      // Validation passed
      console.log("validation passed!")
      // form errors are cleares away
      setFormErrors({})
      // convert the object to an array of values only. Key is not required 
      const arrForms = Object.entries(forms).map(([key, value]) => value)
      // send to the db
      const response = await axios.post('http://localhost:8000/api/predictions/new/many', arrForms, {withCredentials: true})
      // update the dom 
      setUser(prevUser => ({
        ...prevUser, 
        // replace predictions
        ['predictions'] : response.data.updatedUser.predictions,
        // replace points
        ['points'] : response.data.updatedUser.points
      }))
      // update scores and predictions with new updated version
      setScoresAndPredictions(response.data.scoresAndPredictions)
      // clear any forms data for new inputs to be made 
      setForms({})
      // refresh game week view 
      updateGameWeek(String(displayWeek.gameWeekInfo.id), response.data.scoresAndPredictions)
    }
  }catch(err) {
    console.log(err)
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

  // sort games in date order as they come in game # order
  const sortByDate = data => {
    const dateOrder = data.slice().sort((a,b) => new Date(a.gameInfo.kickoff_time) -  new Date(b.gameInfo.kickoff_time))
    return dateOrder
  }

  // Sum points in a given game week
  const gameWeekPointsTotal = (games) => {
    let pointsSum = 0 
    for(let game of games){
      if(game.prediction){
        pointsSum += game.prediction.pointsLog.totalPoints
      } else {
        continue
      }
    }
    setGameWeekPoints(pointsSum)
  }

  const submitUpdate = (e, predictionId) => {
    e.preventDefault()

    const updateObject = {
      id : predictionId,
      homeTeamScore : e.target.elements.homeTeamScore.value, 
      awayTeamScore : e.target.elements.awayTeamScore.value, 
    }

    axios.patch(`http://localhost:8000/api/predictions/${predictionId}`, updateObject, {withCredentials: true})
      .then(res => {
        // update the dom 
        setUser(prevUser => ({
          ...prevUser, 
          // replace predictions
          ['predictions'] : res.data.updatedUser.predictions,
          // replace points
          ['points'] : res.data.updatedUser.points
        }))
        // update scores and predictions with new updated version
        setScoresAndPredictions(res.data.scoresAndPredictions)
        // refresh game week view 
        updateGameWeek(String(displayWeek.gameWeekInfo.id), res.data.scoresAndPredictions)
      })
      .catch(err => console.log(err))
  }
  
  return (
    <>
      <div style={{backgroundColor: "	#38003c"}}>
        <Header />
        <div className='main d-flex p-3'>
          {/* left */}
          <div className='sidebar col-2 p-2 bg-white rounded rounded-3 mx-3 overflow-hidden border border-1 border-white'>
            <div className='text-center'>
              <button className="btn btn-sm fw-semibold border-0  mx-1 mb-1 shadow " style={{backgroundColor: "#00ff85"}} onClick={(e) => submitPredictions(e)}>Submit your Predictions</button>
            </div>
            {Object.entries(scoresAndPredictions).map(([key, value]) => (
              <button key={key} className='btn shadow text-dark-emphasis fw-bold mb-1 w-100' onClick={(e) => viewGameWeek(e, key)}>{value.gameWeekInfo ? value.gameWeekInfo.name : ""} </button>
            ))} 
          </div>
          {/* right */}
          <div className='w-100 bg-white rounded rounded-3 mx-3 overflow-hidden border border-1 border-white'>

            {/* scores and predictions */}
              {displayWeek && displayWeek.gameWeekInfo && 
                <div>
                  <h3 className='fs-5 text-center text-white fw-bold w-100 p-2' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>{displayWeek.gameWeekInfo.name || "unassigned Games"}</h3>

                  <div className='d-flex justify-content-evenly'>
                    <p className='btn shadow text-dark-emphasis fw-bold mb-1'> Game Count {displayWeek.games.length}</p>
                    {displayWeek.gameWeekInfo ? <p className='btn shadow text-dark-emphasis fw-bold mb-1'>Deadline : {convertDateConcise(displayWeek.gameWeekInfo.deadline_time)}</p> : <p className='btn shadow text-dark-emphasis fw-bold mb-1'>No Deadline Set</p>}
                    <p className='btn shadow text-dark-emphasis fw-bold mb-1'> Finished: {displayWeek.gameWeekInfo && displayWeek.gameWeekInfo.finished ? "true" : "False"}</p>
                    {displayWeek.gameWeekInfo.is_current ? (
                      <p className='btn shadow text-dark-emphasis fw-bold mb-1'>Current Game Week</p> 
                      ) : displayWeek.gameWeekInfo.is_previous ? (
                        <p className='btn shadow text-dark-emphasis fw-bold mb-1'>Previous Game Week</p> 
                      ) : displayWeek.gameWeekInfo.is_next ? (
                        <p className='btn shadow text-dark-emphasis fw-bold mb-1'>Next Game Week</p>
                      ) : displayWeek.gameWeekInfo.finished ? (
                        <p className='btn shadow text-dark-emphasis fw-bold mb-1'>Past Game Week</p>
                      ) : <p className='btn shadow text-dark-emphasis fw-bold mb-1'>Future Game Week</p>
                    }
                    <p className='btn shadow text-dark-emphasis fw-bold mb-1'>Gameweek Points : {gameWeekPoints}</p>
                  </div>
                </div>
              }
              <div className='p-2 h-100 overflow-auto'>
                {displayWeek && displayWeek.games && sortByDate(displayWeek.games).map((game) => (
                  <div id={displayWeek.gameWeekInfo ? displayWeek.gameWeekInfo.id : "unassigned Games"} key={game.gameInfo.id} className='btn shadow text-dark-emphasis fw-bold mb-1 w-100'>
                    <div className='w-100 d-flex justify-content-between align-items-center p-0 m-0'>
                        <p  className='text-start px-1 m-0'>Game {game.gameInfo.id}</p>
                        <div className='d-flex justify-content-evenly col-8'>
                          <p className='col-4 text-center m-0'>{teamNames[game.gameInfo.team_h]}</p>
                          <p className='col-1 text-center m-0'>{game.gameInfo.team_h_score}</p>
                          <p className='m-0'>vs</p>
                          <p className='col-1 text-center m-0'>{game.gameInfo.team_a_score}</p>
                          <p className='col-4 text-center m-0'>{teamNames[game.gameInfo.team_a]}</p>
                        </div>
                        <p className='text-center m-0'>{game.gameInfo.kickoff_time ? convertDateConcise(game.gameInfo.kickoff_time) : ""}</p>
                    </div>
                    {/* if prediction is needed and we are not passed the deadline */}
                    {game.prediction === null && new Date() < new Date(localDeadline(displayWeek.gameWeekInfo.deadline_time)) ? (
                      <div className='shadow text-dark-emphasis fw-bold m-1 w-100 mx-auto rounded-3 p-1' style={{backgroundColor : "#38003c"}}>
                        <p className='text-center text-white w-100 m-0 p-0'>Prediction Required</p>
                        {formErrors[game.gameInfo.id] && <p className='text-danger text-center '>{formErrors[game.gameInfo.id]}</p>}
                        <form action="" className='text-center mb-2 d-flex p-1 mx-1 align-items-center w-100'>
                          <div className="input-group input-group-sm border-1 border-black px-1">
                            <label htmlFor="homeTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_h]} Score:</label>
                            <input type="number" name='homeTeamScore' min={0} className="form-control border-1 text-center" onChange={(e) => changeHandler(e, game.gameInfo.id)}/>
                          </div>
                          <div className="input-group input-group-sm border-1 border-black px-1">
                            <label htmlFor="awayTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_a]} Score</label>
                            <input type="number" name='awayTeamScore' min={0} className="form-control border-1 text-center"  onChange={(e) => changeHandler(e, game.gameInfo.id)}/>
                          </div>
                        </form>
                      </div>
                      // if prediction is present but deadline is still open, allow user to update 
                    ) : game.prediction && new Date() < new Date(localDeadline(displayWeek.gameWeekInfo.deadline_time)) ? (
                      <div className='shadow text-dark-emphasis fw-bold m-1 w-100 mx-auto rounded-3 p-1 ' style={{backgroundColor : "#04f5ff"}}>
                        <div className='d-flex justify-content-evenly '>
                          {/* <p className='text-center text-dark-emphasis  w-100 m-0 p-0'>{game.prediction.homeTeamScore} </p> */}
                          <p className='text-center text-dark-emphasis  w-100 m-0 p-0'> Current Prediction  </p>
                          {/* <p className='text-center text-dark-emphasis  w-100 m-0 p-0'>{game.prediction.awayTeamScore}</p> */}
                        </div>
                        {formErrors[game.gameInfo.id] && <p className='text-danger text-center '>{formErrors[game.gameInfo.id]}</p>}
                        <form className='text-center mb-2 d-flex p-1 mx-1 align-items-center w-100' onSubmit={(e) => submitUpdate(e, game.prediction._id)}>
                          <div className="input-group input-group-sm border-1 border-black px-1">
                            <label htmlFor="homeTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_h]} Score:</label>
                            <input type="number" name='homeTeamScore' min={0} className="form-control border-1 text-center" placeholder={game.prediction.homeTeamScore} />
                          </div>
                          <div className="input-group input-group-sm border-1 border-black px-1">
                            <label htmlFor="awayTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_a]} Score: </label>
                            <input type="number" name='awayTeamScore' min={0} className="form-control border-1 text-center" placeholder={game.prediction.awayTeamScore} />
                          </div>
                          <button type="submit"  className="btn btn-sm fw-semibold border-0  mx-1 mb-1 shadow " style={{backgroundColor: "#00ff85"}}>Update</button>
                        </form>
                      </div>
                      // if prediction is present but the 
                    ) : game.prediction && new Date() > new Date(localDeadline(displayWeek.gameWeekInfo.deadline_time)) ? (
                      <div className='shadow text-white fw-bold m-1 w-100 mx-auto rounded-3 p-1 d-flex justify-content-between align-items-center' style={{backgroundColor : "#38003c"}}>
                        <p className='m-0'>Prediction</p>
                        <p className='btn shadow text-dark-emphasis fw-bold bg-white m-0'>{teamNames[game.gameInfo.team_h]} {game.prediction.homeTeamScore} - {game.prediction.awayTeamScore} {teamNames[game.gameInfo.team_a]} </p>
                        <p className='btn shadow text-dark-emphasis fw-bold bg-white m-0'>Points: {game.prediction.pointsLog.totalPoints ? game.prediction.pointsLog.totalPoints : "Pending"}</p>
                      </div>
                    ) : null}
                  </div>
                ))}

              </div>
              </div>
            </div>
          </div>

    </>
  )
}

export default Predictions