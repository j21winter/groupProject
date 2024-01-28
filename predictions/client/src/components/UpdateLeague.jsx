import React from 'react'

import { useEffect, useState, useContext } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/userContext';

const UpdateLeague = (props) => {
    const { id } = useParams()
    const [leagueName, setLeagueName]=useState("")
    const { user, setUser } = useContext(UserContext)
    const [errors, setErrors]=useState([])
    const navigate=useNavigate()

    //get league info
    useEffect(() => {
        axios.get(`http://localhost:8000/api/league/${id}`)
            .then(res => {
                console.log(res)
                console.log(res.data)
                setLeagueName(res.data.league_name)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit=(e)=>{
        console.log("LEAGUE NAME", leagueName)
        e.preventDefault();
        
        axios.patch(`http://localhost:8000/api/league/${id}`, {leagueName})
            .then(res => {
                console.log("RES", res);

                navigate(`/oneLeague/${id}`); 
            })
            .catch(err => {
                console.log("ERR", err)
                setErrors(err);
                console.log("error1", errors)
            })
    
}
console.log(leagueName)
  return (
    <>
        <div>
            <h1>Update Your League Name</h1>
            <p><Link to={"/dashboard"}>Dashboard</Link></p>
            <form onSubmit={handleSubmit}>
            <label >League Name:</label>
            <input type="text" name="league_name" value={leagueName} onChange={(e)=>{setLeagueName(e.target.value)} }/>
            { errors.league_name ? 
                        <p>{errors.league_name.message}</p>
                        : null
                    }
            <button>Update League Name</button>
        </form>
        </div>
    </>
  )
}

export default UpdateLeague