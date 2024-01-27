import { useEffect, useState } from 'react'
import {Routes, Route, Navigate, useParams} from 'react-router-dom'

import UserContext from './context/userContext'

import LoginAndReg from './components/auth/LoginAndReg'
import Dashboard from './components/userDashboard/Dashboard'
import Leaderboard from './components/Leaderboard'
import Predictions from './components/Predictions'
import LeaguePage from './components/LeaguePage'
import Homepage from './components/Homepage/HomePage'



function App() {

  // if the user is already stored in local storage then pull that info down into state
  const storedUser = JSON.parse(localStorage.getItem('user'))

  // state to store info on our user
  const [user, setUser] = useState(storedUser)

  // save the logged in user to state
  const saveLoggedInUser = userData => {
    console.log("saving", userData)
    const userObj = {...userData, password: ""}
    setUser(userObj)
    localStorage.setItem('user', JSON.stringify(user))
  }

  useEffect(() => {
    // save user every time a change is made to the user state in the dom
    if(user){
      console.log("saving user to local storage")
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  return (
    <>
    
      <UserContext.Provider value={{user, setUser, saveLoggedInUser}}>
          <Routes>
              <Route path='/' element={<Homepage/>} />  
              <Route path='/login' element={<LoginAndReg />} />
              <Route path='/leaderboard' element={<Leaderboard/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/predictions' element={<Predictions/>}/>
              <Route path='/oneLeague/:id' element={<LeaguePage/>}/>
          </Routes>
      </UserContext.Provider>
      
    </>
  )
}

export default App
