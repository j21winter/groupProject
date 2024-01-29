import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import UserContext from '../../context/userContext';

const DashboardRight = () => {
  const navigate=useNavigate()
  const { user, setUser, leagues, setLeagues } = useContext(UserContext)
  const [notUsersLeagues, setNotUsersLeagues] = useState([])

// axios call to get available leagues links for leagues user can join 

//  axios call to get all leagues
  useEffect(()=>{
    axios.get("http://localhost:8000/api/allLeagues")
    .then(res => {
        console.log(res)
        setNotUsersLeagues( res.data.allLeagues.filter( league => league.user != user._id))
    })
    .catch(err=>{
        console.log(err)
    })
}, []
)

    // Logout user
    const handleLogout = () => {
      setUser(null);
      document.cookie = 'userToken=;';
      navigate('/login');
    };
console.log("LEAGUES", leagues)
// const leaguesToJoin=leagues.filter(league=>league.user!=user._id)

  return (
    <>
    <div>
    <h3>Join a League </h3>
      {
          notUsersLeagues.slice(0,10).map((league)=>(
            <div key={league._id}>
                  
                    <p ><Link to={`/oneLeague/${league._id}`}>{league.league_name}</Link></p>
            
            </div>
      ))}
      {/* Logout button */}
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
      
        
    </>
  )
}

export default DashboardRight