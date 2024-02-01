import { useEffect, useState } from 'react'
import {Routes, Route, Navigate, useParams} from 'react-router-dom'
import axios from 'axios'

import UserContext from './context/userContext'
import ProtectedRoute from './components/protected/ProtectedRoute'
import LoginAndReg from './components/auth/LoginAndReg'
import Dashboard from './components/userDashboard/Dashboard'
import Predictions from './components/Predictions'
import LeaguePage from './components/LeaguePage'
import Homepage from './components/Homepage/Homepage'
import UpdateLeague from './components/UpdateLeague'



function App() {

  // if the user is already stored in local storage then pull that info down into state
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedScoresAndPredictions = JSON.parse(localStorage.getItem('scoresAndPredictions'))

  // state to store info on our user
  const [user, setUser] = useState(storedUser)
  const [scoresAndPredictions, setScoresAndPredictions] = useState(storedScoresAndPredictions) 
  const [leagues,setLeagues]=useState([])
  const [teamNames, setTeamNames] = useState(
    {
      '1': 'Arsenal',
      '2': 'Aston Villa',
      '3': 'Bournemouth',
      '4': 'Brentford',
      '5': 'Brighton',
      '6': 'Burnley',
      '7': 'Chelsea',
      '8': 'Crystal Palace',
      '9': 'Everton',
      '10': 'Fulham',
      '11': 'Liverpool',
      '12': 'Luton',
      '13': 'Man City',
      '14': 'Man Utd',
      '15': 'Newcastle',
      '16': "Nott'm Forest",
      '17': 'Sheffield Utd',
      '18': 'Spurs',
      '19': 'West Ham',
      '20': 'Wolves'
    }
  )
  

  // save the logged in user to state
  const saveLoggedInUser = userData => {

    const userObj = {...userData, password: ""}
    setUser(userObj)
    localStorage.setItem('user', JSON.stringify(user))
  }



  useEffect(() => {
    // save user every time a change is made to the user state in the dom
    if(user){

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('scoresAndPredictions', JSON.stringify(scoresAndPredictions))
    }
  }, [user, scoresAndPredictions])

  return (
    <>

      <UserContext.Provider value={{user, setUser, saveLoggedInUser, scoresAndPredictions, setScoresAndPredictions, teamNames, leagues, setLeagues }}>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path='/predictions' element={
            <ProtectedRoute>
              <Predictions/>
            </ProtectedRoute>
          }/>
          <Route path='/oneLeague/:id' element={
            <ProtectedRoute>
              <LeaguePage/>
            </ProtectedRoute>
          }/>
          <Route path='/update/:id' element={
            <ProtectedRoute>
              <UpdateLeague/>
            </ProtectedRoute>
          }/>
        </Routes>
      </UserContext.Provider>
      
    </>
  )
}

export default App
