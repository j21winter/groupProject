import React from 'react'
import { useEffect, useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/userContext';

const DashboardLeft = (props) => {
  const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [leagues, setLeagues]=useState([])
  const [errors, setErrors] = useState({
    leagues : {
      league_name: ""
    },
    
  })
  console.log("all leagues" + leagues)

  //Grab all leagues function
  const All_Leagues = () => {
    axios.get("http://localhost:8000/api/allLeagues")
    .then(res => {
        console.log(res);
        setLeagues(res.data.allLeagues.filter(league => league.user === user._id));
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
                console.log(res.data)
                setLeagueInput({league_name: "", user: user._id})
                setUser(prevUser=>({...prevUser, ["leagues"]:res.data.updatedUser.leagues

                }));
                //axios call to grab users leagues to populate
                axios.get('http://localhost:8000/api/allLeagues')
        .then((res) => {
          setLeagues(res.data.allLeagues.filter((league) => league.user == user._id));
        })
        setErrors({
          leagues : {
            league_name: ""
          },
          
        })
        .catch((err) => {
          console.log(err);
        });


                 // redirect to same dashboard, new league should pop up above form
                All_Leagues()
                navigate('/dashboard')
            })
            .catch(err=>{
              console.log(err)
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


  return (

    <>
        

        {/* display users leagues */}
        <div className="yourLeagues">
          <h3>Your Leagues</h3>{
          leagues.map((league)=>(
            <div key={league._id}>
                    <p ><Link to={`/oneLeague/${league._id}`}>{league.league_name}</Link></p>
            
            </div>
            ))}
        </div>

        <div className="leagueForm">
          <h3>Create a League</h3>
          {/* League Form */}
        <form onSubmit={(e) => handleLeagueSubmit(e)}>
          <div className="mb-3 ">
            
            <label >League Name: </label>
            <input type="text" name="league_name"  value={leagueInput.league_name} onChange={(e)=>handleChange(e)}
            className="form-control"/>
            <button type="submit" className="btn btn-success ">Submit</button>
          </div>
          {errors.league_name ? <p style={{color:"red"}}>{errors.league_name.message}</p> : ""}

        </form>
        </div>
         
        
    </>
  )
}

export default DashboardLeft