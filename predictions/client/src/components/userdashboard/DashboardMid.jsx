import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import UserContext from '../../context/userContext';

export const DashboardMid = () => {
  const {user, setUser}=useContext(UserContext)
  const {teamNames, setteamNames} = useContext(UserContext)
  const [users, setUsers]=useState([])
  // console.log(teamNames)
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
console.log("POINTS", user.points)
//number to display on leaderboard
let num=0


  return (
    <>
      <div className="container">
        <h3>Global Leaderboard</h3>
        {

            [...users].sort((a, b) => b.points - a.points) // Sort users by points in descending order
                .slice(0, 5) // Get only the first 5 users
                  .map((user, index) => (
                    <div key={user._id}>
                      <p>{index + 1}. {user.firstName} {user.points} points</p>
                    </div>
              ))

        }
        <h3>Your points</h3>
        <p>{user.points}</p>

      </div>

    </>
  )
}

export default DashboardMid