import React from 'react'
import {Link} from 'react-router-dom'

const Predictions = () => {
  return (
    <>
      <div className="container">
        <Link to={'/dashboard'}>Dashboard</Link>
        <h2>Make a Prediction on this weeks upcoming games</h2>
        {/* need to make api call for games, map through them, create a popup form for user to predict */}
      </div>      

    </>
  )
}

export default Predictions