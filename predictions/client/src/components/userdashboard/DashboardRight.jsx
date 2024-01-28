import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import UserContext from '../../context/userContext';

const DashboardRight = () => {

  const { user, setUser } = useContext(UserContext)
  const [leagues, setLeagues]=useState([])
// axios call to get available leagues links for leagues user can join 

  


//  axios call to get all leagues
  useEffect(()=>{
    axios.get("http://localhost:8000/api/allLeagues")
    .then(res=>{
        console.log(res)
        setLeagues(res.data.allLeagues.filter(league=> league.user!=user._id))
        
        
        
        
    })
    .catch(err=>{
        console.log(err)
    })
}, []
)

console.log("LEAGUES", leagues)
// const leaguesToJoin=leagues.filter(league=>league.user!=user._id)

  return (
    <>
    <div>
    <h3>Join a League </h3>
      {
          leagues.map((league)=>(
            <div key={league._id}>
                  
                    <p ><Link to={`/oneLeague/${league._id}`}>{league.league_name}</Link></p>
            
            </div>
      ))}
    </div>
      
        
    </>
  )
}

export default DashboardRight