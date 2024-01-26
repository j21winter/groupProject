import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'

const DashboardRight = () => {
  const [leagues, setLeagues]=useState({})
// axios call to get available leagues links for leagues user can join 
  
  useEffect(()=>{
    axios.get('/api/allLeagues')
    .then(res=>{
        console.log(res)
        setLeagues(res.data.leagues)
    })
    .catch(err=>{
        console.log(err)
    })
}, []
)

  return (
    <>
      <h3>All Leagues</h3>
      {
          leagues.map((league)=>(
            <div key={league._id}>
              
                  <p ><Link to={`/oneLeague/${league._id}`}>{league.league_name}</Link></p>
            
            </div>
))}
        
    </>
  )
}

export default DashboardRight