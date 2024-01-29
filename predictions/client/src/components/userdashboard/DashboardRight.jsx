import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'

const DashboardRight = () => {
  const [leagues, setLeagues ]=useState([])
// axios call to get available leagues links for leagues user can join 


 {/* having trouble with the axios call to map through leagues  */}
  useEffect(()=>{
    axios.get("http://localhost:8000/api/allLeagues")
    .then(res=>{
        console.log(res)
        setLeagues(res.data.allLeagues)
        
    })
    .catch(err=>{
        console.log(err)
    })
}, []
)

  return (
    <>
    <div>
    <h3>All Leagues</h3>
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