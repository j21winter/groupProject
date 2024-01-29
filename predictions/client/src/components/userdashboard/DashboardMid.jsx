import React, {useContext} from 'react'
import UserContext from '../../context/userContext'

export const DashboardMid = () => {
  const {user, scoresAndPredictions} = useContext(UserContext)

 {/* api calls to get info from Games
        axios call to get your points */}
        

  return (
    <div>
        <p>Your points : {user.points}</p>
        <p>Recent Games</p>
        {/* go through scores and predictions and display the game weeks that have PREVIOUS/CURRENT/NEXT as true statements */}
        <p>Upcoming Games</p>


    </div>
  )
}

export default DashboardMid