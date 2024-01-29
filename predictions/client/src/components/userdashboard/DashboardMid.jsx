import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import UserContext from '../../context/userContext';

export const DashboardMid = () => {
  const {user, setUser}=useContext(UserContext)
  const {teamNames, setteamNames} = useContext(UserContext)
  const {scoresAndPredictions, setscoresAndPredictions} = useContext(UserContext)
  const [users, setUsers]=useState([])
  const [upcominggames, setUpcominggames] = useState([])
  // console.log(teamNames)
  console.log(scoresAndPredictions)
  console.log("upgames:>>>>" + upcominggames)

  const checkfuturegames = () => {
    const upcomingGamesNotFinished = scoresAndPredictions.filter(upgame => {
      // Check if the game is not finished
      return !upgame.gameWeekInfo.finished;
    });
    // Set the filtered upcoming games in state
    setUpcominggames(upcomingGamesNotFinished);
  };

  {/* api call to get all users*/}
  useEffect(()=>{
    console.log("made api call")
    axios.get("http://localhost:8000/api/users")
    .then(res=>{
        // console.log("RESULTS", res)
        setUsers(res.data.allUsers)
        checkfuturegames()
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
        <div>
          <h2>Future Games</h2>

        </div>
        <div>
          <h3>Your points</h3>
          <p>{user.points}</p>
        </div>

      </div>

    </>
  )
}

export default DashboardMid