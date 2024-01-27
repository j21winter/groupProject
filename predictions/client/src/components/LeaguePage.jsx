import {useState} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'

const LeaguePage = () => {
    const [leagueMembers, setLeagueMembers]=useState([])

    // api call to grab all league members
  return (
    <div>
        <Link to={'/dashboard'}>Dashboard</Link>
        <h1>League Name will go here!</h1>
        {/* will want to display all league members by mapping through */}
    </div>
  )
}

export default LeaguePage