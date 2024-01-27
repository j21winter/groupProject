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

  return (
    <>
      <div className="container">
        <div className="header d-flex justify-content-between align-items-center ">
          <p>Your Predictions</p>
          <Link to={'/dashboard'}>Dashboard</Link>
        </div>

    {/* try filtering into game weeks. May need to adjust the data before the mapping */}
        <div>
          {gameWeeksWithScores && Object.values(gameWeeksWithScores).map((value, index) => (
            value.map((game, index) => (
              <div className='w-100 bg-secondary-subtle'>
                <div className='w-100 d-flex justify-content-around'>
                  <p>Game</p>
                  <p>{teamNames[game.gameInfo.team_h]}</p>
                  <p>{game.gameInfo.team_h_score}</p>
                  <p>{game.gameInfo.team_a_score}</p>
                  <p>{teamNames[game.gameInfo.team_a]}</p>
                </div>
                {game.prediction ? 
                (<div className='w-100 d-flex justify-content-around'>
                  <p>Prediction</p>
                  <p>H: {game.prediction.homeTeamScore}</p>
                  <p>A: {game.prediction.homeTeamScore}</p>
                  <p>Points Log</p>
                  <p>Result : {game.prediction.result}</p>
                  <p>Home Score: {game.prediction.homeTeamScore}</p>
                  <p>Away Score: {game.prediction.awayTeamScore}</p>
                  <p>Bonus : {game.prediction.bonus}</p>
                </div>)
                : 
                (
                  // form processing and handle change state variables
                  <form>
                    <div className="input-group input-group-sm border-1 border-black mb-1 px-1 ">
                      <label htmlFor="homeTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>Home Score:</label>
                      <input type="number" name='homeTeamScore' min={0} className="form-control border-1 text-end" />
                    </div>
                    <div className="input-group input-group-sm border-1 border-black  mb-1 px-1 ">
                      <label htmlFor="awayTeamScore" className="input-group-text border-1" style={{backgroundColor: "#ffffff"}}>Away Score:</label>
                      <input type="number" name='awayTeamScore' min={0} className="form-control border-1 text-end" />
                    </div>
                  </form>
                )}
              </div>
            ))
          ))}
        </div> 
        <p>test</p>
      </div> 
    </>
  )
}

export default Predictions