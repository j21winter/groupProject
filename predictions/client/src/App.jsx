import { useEffect, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import UserContext from './context/userContext'

import LoginAndReg from './components/auth/LoginAndReg'


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

  const [scoresAndPredictions, setScoresAndPredictions] = useState({}) 

  useEffect(() => {
    // save user every time a change is made to the user state in the dom
    if(user){
      console.log("saving user to local storage")
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  return (
    <>
      <UserContext.Provider value={{user, setUser, saveLoggedInUser, scoresAndPredictions, setScoresAndPredictions }}>
          <Routes>
              <Route path='/' element={<Navigate to="/login"/>} />  
              <Route path='/login' element={<LoginAndReg />} />
          </Routes>
      </UserContext.Provider>
      
    </>
  )
}

export default App
