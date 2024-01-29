import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import UserContext from '../context/userContext';

const LeaguePage = (props) => {
  const { id } = useParams()
  const [league, setLeague]=useState({})
  const { user, setUser } = useContext(UserContext)
  const navigate=useNavigate()

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

  const handleDelete=(_id)=>{
    axios.delete(`http://localhost:8000/api/league/${_id}`)
    .then(res=>{
        console.log(res)
        removeFromDom(_id)
    })
    .catch(err=>{
        console.log(err)
    })
    navigate("/dashboard")
  }
    
  return (
    <div>
        <Link to={'/dashboard'}>Dashboard</Link>
        <h1>{league.league_name}</h1>
        {/* will want to display all league members by mapping through */}
          <div>
          {league.user==user._id ?
          (<p><Link to={`/update/${league._id}`}>Edit</Link> <button onClick={(e)=>handleDelete(league._id)}>Delete</button></p>): (<p>Join League</p>)
        }
        </div>
    </div>
  )
}

export default LeaguePage