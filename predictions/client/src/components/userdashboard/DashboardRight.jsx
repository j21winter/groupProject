import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import UserContext from '../../context/userContext';


const DashboardRight = () => {
  const { user, setUser, leagues, setLeagues } = useContext(UserContext)
  const [notUsersLeagues, setNotUsersLeagues] = useState([])

// axios call to get available leagues links for leagues user can join 

//  axios call to get all leagues
  useEffect(()=>{
    axios.get("http://localhost:8000/api/allLeagues")
    .then(res => {
        // setNotUsersLeagues( res.data.allLeagues.filter( league => league.user != user._id))
      //   const notUser = res.data.allLeagues.filter(league => league.user != user._id)
      // const finalList = notUser.filter(league => league.members.includes(user._id) ? null : league)
      // console.log("FINAL LIST", finalList)
      const finalList = res.data.allLeagues.filter(league => league.user !== user._id && !league.members.some(member => member._id === user._id));
      

      setNotUsersLeagues(finalList)
      console.log("NOT USERS LEAGUES", notUsersLeagues)
    })
    .catch(err=>{
        console.log(err)
    })
}, []
)

  return (
    <>
    <div className="joinLeagues shadow bg-white rounded-3 overflow-hidden border border-1 border-white">
      <h3 className='fs-5 text-center text-white fw-bold w-100 p-2' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>Join a League</h3>
      <div>
        {notUsersLeagues.length > 0 ? 
          (notUsersLeagues.slice(0,10).map((league)=>(
            <Link key={league._id} to={`/oneLeague/${league._id}`} className='btn shadow text-dark-emphasis fw-bold mb-1 w-100'>{league.league_name}</Link>
        ))) : 
            <p className='btn shadow text-dark-emphasis fw-bold mb-1 w-100'>No Leagues available</p>
        }

      </div>
    </div>
    </>
  )
}

export default DashboardRight