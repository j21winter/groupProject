import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import UserContext from '../context/userContext';

const LeaguePage = (props) => {
  const { id } = useParams()
  const [league, setLeague]=useState({})
  const { user, setUser } = useContext(UserContext)

  // api call to grab all league members
  useEffect(() => {
    axios.get(`http://localhost:8000/api/league/${id}`)
        .then(res => {
            console.log(res)
            console.log(res.data)
            setLeague(res.data)
        })
        .catch(err => console.log(err))
}, [])

    
  return (
    <div>
        <Link to={'/dashboard'}>Dashboard</Link>
        <h1>{league.league_name}</h1>
        {/* will want to display all league members by mapping through */}
          <div>
          {league.user==user._id ?
          (<p><Link to={`/update/${league._id}`}>Edit</Link> Delete</p>): (<p>Join League</p>)
        }
        </div>
    </div>
  )
}

export default LeaguePage