import React from 'react'
import { useEffect, useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/userContext';

const DashboardLeft = (props) => {
  const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext)
  const {leagues, setLeagues}=useContext(UserContext)
  const [usersLeagues, setUsersLeagues]=useState([])
  const [errors, setErrors] = useState({
    leagues : {
      league_name: ""
    },
    
  })

  //Grab all leagues function
  const All_Leagues = () => {
    axios.get("http://localhost:8000/api/allLeagues")
    .then(res => {
        console.log(res);
        setUsersLeagues(res.data.allLeagues.filter(league => league.user === user._id));
    })
    .catch(err => {
        console.log(err);
    });
};

  // Grab all leagues when render
  useEffect(() => {
      All_Leagues();
  }, []);

  const [leagueInput, setLeagueInput]=useState({league_name: "", user: user._id})

  //submitting league form
  const handleLeagueSubmit = (e) => {
    e.preventDefault();
    console.log("submitting")
    axios.post('http://localhost:8000/api/league/new', {...leagueInput})
            .then(res => {
                console.log("RES", res.data)
                setLeagueInput({league_name: "", user: user._id})
                setUser(prevUser=>({...prevUser, ["leagues"]:res.data.updatedUser.leagues
                }))
                //need to reset users leagues here to include the newest one! and updates all leagues.
                //want to have users leagues include the newest one without reset
                setErrors({
                  leagues : {
                    league_name: ""
                  },
                  
                })
                 // redirect to same dashboard, new league should pop up above form
                All_Leagues()
                navigate('/dashboard')
            })
            .catch(err=>{
              console.log("ERR", err)
              console.log(err.response.data.errors)
              setErrors(err.response.data.errors);
              console.log("error1", errors)
          }) 
          
  }
  // need to make axios call to grab users leagues. How to do this using the logged in users id? 
    const handleChange=e=>{
        e.preventDefault()
        setLeagueInput(prevInput=>({
          ...prevInput, 
          [e.target.name]: e.target.value
        }))
    }
    // Logout user
  const handleLogout = () => {
    setUser(null);
    document.cookie = 'userToken=;';
    navigate('/login');
  };

  return (

    <>
        {/* link to predictions page */}
        <h3><Link to ={"/predictions"}>Your Predictions</Link></h3>

        {/* display users leagues */}
        <div className="yourLeagues">
          <h3>Your Leagues</h3>{
          usersLeagues.map((league)=>(
            <div key={league._id}>
                  
                    <p ><Link to={`/oneLeague/${league._id}`}>{league.league_name}</Link></p>
            
            </div>
           ))}
        </div>

        <div className="leagueForm">
          <h3>Create a League</h3>
          {/* League Form */}
        <form onSubmit={(e) => handleLeagueSubmit(e)}>
{/* will possibly need user id as hidden input for owner */}
          <div >
            
            <label >League Name: </label>
            <input type="text" name="league_name"  value={leagueInput.league_name} onChange={(e)=>handleChange(e)}/>
            <button>Submit</button>
          </div>
          {errors.league_name ? <p style={{color:"red"}}>{errors.league_name.message}</p> : ""}

        </form>
        </div>
         {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
        
    </>
  )
}

export default DashboardLeft