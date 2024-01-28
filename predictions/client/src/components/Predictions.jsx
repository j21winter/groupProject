import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/userContext'

const Predictions = () => {


  const {user, setUser, scoresAndPredictions, setScoresAndPredictions, teamNames } = useContext(UserContext)

  const [gameWeeksWithScores, setGameWeeksWithScores] = useState({})

  useEffect(() => {
    
    const dataHolder = {}
    Object.entries(scoresAndPredictions).forEach(([key, value]) => {
      if(dataHolder.hasOwnProperty( value.gameInfo.event )){
        dataHolder[value.gameInfo.event].push(value)
      } else {
        dataHolder[value.gameInfo.event] = [value]
        console.log(dataHolder[value.gameInfo.event])
      }
    })

    console.log(dataHolder)

    setGameWeeksWithScores(dataHolder)

  }, [])

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
          <p>Your Predictions</p>
          <div className='text-center'>
            <p>Total Points</p>
            <p>{user.points}</p>
          </div>
          <Link to={'/dashboard'}>Dashboard</Link>
        </div>

    {/* try filtering into game weeks. May need to adjust the data before the mapping */}
        <div>
          {gameWeeksWithScores && Object.values(gameWeeksWithScores).map((value, index) => (
            value.map((game, index) => (
              <div className=' border border-1 border-black rounded rounded-2 '>
                <div className='w-100 d-flex justify-content-between   '>
                  <p>Game {game.gameInfo.id}</p>
                  <p>{game.gameInfo.kickoff_time ? convertDateConcise(game.gameInfo.kickoff_time) : ""}</p>
                  <p>Game Finished :{ game.gameInfo.finished ? "true" : "false" }</p>
                </div>
                <div className='d-flex w-100'>
                  <div className='col-4 p-1'>
                    <p>Game Info</p>
                    <div className="d-flex justify-content-between ">
                      <p className='col-6'>{teamNames[game.gameInfo.team_h]}</p>
                      <p className='col-6'>{game.gameInfo.team_h_score}</p>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p className='col-6'>{teamNames[game.gameInfo.team_a]}</p>
                      <p className='col-6'>{game.gameInfo.team_a_score}</p>
                    </div>
                  </div>
                  <div className='col-4 p-1 '>
                    {/* if prediciton is there, display prediction, else display form */}
                    <form className='text-center'>
                      <div className='text-center '>
                        <p>Prediction REQUIRED</p>
                      </div>
                      <div className="input-group input-group-sm border-1 border-black mb-1 px-1 ">
                        <label htmlFor="homeTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_h]} Score Prediction:</label>
                        <input type="number" name='homeTeamScore' min={0} className="form-control border-1 text-end" />
                      </div>
                      <div className="input-group input-group-sm border-1 border-black  mb-1 px-1 ">
                        <label htmlFor="awayTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>{teamNames[game.gameInfo.team_a]} Score Prediction:</label>
                        <input type="number" name='awayTeamScore' min={0} className="form-control border-1 text-end" />
                      </div>
                      <button className='btn btn-info' type="submit">Save Prediction</button>
                    </form>
                    
                  </div>
                  <div className='col-4 text-center'> 
                    <p>Points Log</p>
                    {game.prediction && game.prediction.pointsLog ? (
                      <div>
                        <div className='d-flex'>
                          <div className="left w-50">
                            <div className='d-flex text-center justify-content-around '>
                              <p>Home Score: </p>
                              <p>{game.prediction.pointsLog.homeTeamScore ? game.prediction.pointsLog.homeTeamScore : "0" } </p>
                            </div>
                            <div className='d-flex text-center justify-content-around  '>
                              <p>Away Score: </p>
                              <p>{game.prediction.pointsLog.awayTeamScore ? game.prediction.pointsLog.awayTeamScore : "0" }</p>
                            </div>
                          </div>
                          <div className="right w-50">
                            <div className='d-flex text-center justify-content-around  '>
                              <p>Result: </p>
                              <p>{game.prediction.pointsLog.result ? game.prediction.pointsLog.result : "0" }</p>
                            </div>
                            <div className='d-flex text-center justify-content-around  '>
                              <p>Bonus</p>
                              <p>{game.prediction.pointsLog.bonus ? game.prediction.pointsLog.bonus : "0" }</p>
                            </div>
                          </div>
                        </div>
                        <div className='d-flex text-center justify-content-around  '>
                          <p>Total Points : {game.prediction.pointsLog.totalPoints ? game.prediction.pointsLog.totalPoints : "0" }</p>
                        </div>
                      </div>
                        ) : 
                      "No Prediction stored"}
                      
                  </div>
                </div>
              </div>
          ))
          ))}
        </div> 
      </div> 
    </>
  )
}

export default Predictions