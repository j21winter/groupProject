import React from 'react'

import { useEffect, useState, useContext } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/userContext';
import Header from '../components/Header'

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
        
        axios.patch(`http://localhost:8000/api/league/info/${id}`, {leagueName})
            .then(res => {
                console.log("RES", res);
                navigate(`/oneLeague/${id}`); 
            })
            .catch(err => {
                console.log("ERR", err)

                setErrors(err.response.data.error.errors);
                console.log("error1", errors)
            })
    
}
console.log(leagueName)
  return (
    <>
        <div style={{ backgroundColor: "#38003c" }}>
        <Header />
            <div className="content text-center p-3">
                <h1 style={{color: "white"}}>Update Your League Name</h1>
                {/* <p><Link to={"/dashboard"}>Dashboard</Link></p> */}
                <form onSubmit={handleSubmit} >
                    <div class="form-group row d-flex justify-content-center">
                        <label  for="leagueName" style={{color: "white"}}>League Name:</label>
                        <input className="form-control w-25 m-3" style={{border: "1px solid #00ff85"}} id="leagueName" type="text" name="league_name" value={leagueName} onChange={(e)=>{setLeagueName(e.target.value)} }/>
                        { errors.league_name ? 
                                    <p style={{color:"red"}}>{errors.league_name.message}</p>
                                    : null
                                }
                    </div>
                    <button className="btn btn-sm w-25 " type="submit" style={{backgroundColor: "#00ff85", color:"#38003c"}}>Update League Name</button>
                </form>

            </div>
        </div>
    </>
  )
}

export default UpdateLeague