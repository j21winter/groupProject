import React from 'react'
import {Link} from 'react-router-dom'

const Leaderboard = () => {
  return (
    <>
      <div className='row' >
        <Link to={'/dashboard'}>Dashboard</Link>
        {/* make an axios call to grab the users and sort by highest points/or grab points and sort by highest to lowest up to 25? */}
        <div className='col' style={{border:"3px solid black"}}>
          <h3>Global Leaderboard</h3>
        </div>
        {/* axios call to grab points by week */}
        <div className='col' style={{border:"3px solid black"}} >
          <h3>Weekly Leaderboard</h3>
        </div>
      </div>
    
    
    
    </>
  )
}

export default Leaderboard