import React from 'react'
import { useState, useContext , useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/userContext';

const DashboardLeft = () => {

  const [leagues, setLeagues]=useState([])
  const { user, setUser } = useContext(UserContext)
  const [errors, setErrors] = useState({
    leagues : {
      league_name: ""
    },
  })
  const [leagueInput, setLeagueInput] = useState({league_name: "", user: user._id})

// Do not need this code bc we are mapping through leagues via user
//   const allLeagues = () => {
    
// };

  useEffect(() => {
    axios.get("http://localhost:8000/api/allLeagues")
    .then(res => {
      
        setLeagues(res.data.allLeagues.filter(league => league.user === user._id));
        // console.log("LEAGUES", leagues)
    })
    .catch(err => {
        console.log(err);
    });
      // console.log("LEAGUES2", leagues)
  }, []);


  //submitting league form
  const handleLeagueSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  axios.post('http://localhost:8000/api/league/new', { ...leagueInput })
    .then(res => {
      console.log(res);
      setLeagueInput({ league_name: "", user: user._id });

      // Update the leagues state directly using the returned data
      setLeagues(prevLeagues => [...prevLeagues, res.data.newLeague]);

      // If needed, you can still use setUser to update the user state
      setUser(prevUser => ({
        ...prevUser,
        ["leagues"]: res.data.updatedUser.leagues
      }));
    })
    .catch(err => {
      setErrors(err.response.data.errors);
    });
}

  // need to make axios call to grab users leagues. How to do this using the logged in users id? 
    const handleChange = (e) => {
        e.preventDefault()
        setLeagueInput( prevInput=> ({
          ...prevInput, 
            [e.target.name]: e.target.value
        }))
        
    }

  return (

    <>
        

        {/* display users leagues */}
        <div className="yourLeagues shadow bg-white rounded-3 overflow-hidden border border-1 border-white">
          <div className="leagueForm mb-3">
            <h3 className='fs-5 text-center text-white fw-bold w-100 p-2' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>Create a League</h3>
            {/* League Form */}
            <form className="text-center px-2" onSubmit={(e) => handleLeagueSubmit(e)}>
              <div className="mb-3 d-flex input-group-sm">
                <label className='input-group-text bg-white border-0' >League Name: </label>
                <input type="text" name="league_name"  value={leagueInput.league_name} onChange={(e)=>handleChange(e)} className="form-control"/>
              </div>
              <button type="submit" className="btn btn-sm fw-semibold" style={{backgroundColor: "#00ff85"}}>Submit</button>
              {errors.league_name ? <p style={{color:"red"}}>{errors.league_name.message}</p> : ""}
            </form>
          </div>
          <h3 className='fs-5 text-center text-white fw-bold w-100 p-2 rounded-top-3' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>Your Leagues</h3>
          <div className='px-2'>
            {leagues.map((league)=>(

              <div key={league._id}>
                  <Link to={`/oneLeague/${league._id}`} className='btn shadow text-dark-emphasis fw-bold mb-1 w-100'>{league.league_name}</Link>
              </div>

              ))}
          </div>
        </div>

    </>
  )
}

export default DashboardLeft