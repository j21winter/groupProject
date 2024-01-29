import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import UserContext from '../../context/userContext';

export const DashboardMid = () => {
  const {user, setUser}=useContext(UserContext)
  const [users, setUsers]=useState([])
  
  {/* api call to get all users*/}
  useEffect(()=>{
    console.log("made api call")
    axios.get("http://localhost:8000/api/users")
    .then(res=>{
        // console.log("RESULTS", res)
        setUsers(res.data.allUsers)
        
    })
    .catch(err=>{
        console.log(err)
    })
}, []
)

  return (
    <>
      <div className="container">
        <h3>Global Leaderboard</h3>
        {
          users.map((user, index)=>(
            <div key={user.points}>
              <p>{index+=1}. {user.firstName} {user.points} points</p>
            </div>
          ))
        }
        {/* still need to figure out how to sort by most points */}
        
        <h3>Your points</h3>
        <p>{user.points}</p>

      </div>

    </>
  )
}

export default DashboardMid