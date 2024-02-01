import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import UserContext from '../context/userContext';
import '../App.css'
import Header from '../components/Header'

const LeaguePage = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [league, setLeague] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    // get a copy of the league with populated members 
    axios.get(`http://localhost:8000/api/league/${ id }`, {withCredentials: true})
      .then(res => {
          setLeague(res.data)
        })
      .catch(err => console.log(err))

  }, [id]);

  //TO UPDATE OR JOIN THE LEAGUE
  const handleJoinLeague = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:8000/api/league/${league._id}`, { userId: user._id }, {withCredentials: true})
        .then(res => {
            setLeague(res.data)
        })
        .catch(err => {
            console.log(err);
        });
  };

  // Leave league
  const handleLeaveLeague = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:8000/api/league/leave/${league._id}`, { userId: user._id }, {withCredentials: true})
        .then(res => {
            navigate("/dashboard")
        })
        .catch(err => {
            console.log(err);
        });
  }

// DELETE LEAGUE
  const handleDelete = (_id) => {
    axios.delete(`http://localhost:8000/api/league/${_id}`, {withCredentials: true})
    .then(res => {
        setUser(prevUser => ({
          ...prevUser,
          ['leagues'] : prevUser.leagues.filter(league => league._id != res.data._id)
        }))
        navigate("/dashboard")
    })
    .catch(err=>{
        console.log(err)
    })
  }

  return (
    <div style={{ backgroundColor: "#38003c" }}>
      <Header />
      <div className="container my-4">
        <div className="row">
          <div className="col text-center">
            <h1 className="display-4 text-white">{league.league_name}</h1>
            <h3 className="mb-4 text-white">Members</h3>
            <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {league.members && league.members.map((member, index) => (
                <tr key={index}>
                  <td>{member.firstName} {member.lastName}</td>
                  <td>{member.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
              {league.user === user._id ? (
                <div className="d-flex justify-content-center">
                <div className="col-6 col-md-4">
                  <Link to={`/update/${league._id}`} className="btn btn-edit w-80">Edit</Link>
                </div>
                <div className="col-6 col-md-4">
                  <button className="btn btn-delete w-80" onClick={() => handleDelete(league._id)}>Delete</button>
                </div>
              </div>
              ) : ''}
              {league.members && league.members.some(member => member._id === user._id) || league.user === user._id ?
                <div className='mb-3'>
                  <p className="badge badge-success">You are a MEMBER</p>
                  { league.user === user._id ? "" : <button className="btn btn-join m-3" onClick={(e) => handleLeaveLeague(e)}>Leave League</button>} 
                </div>
                
              :
                <button className="btn btn-join m-3" onClick={(e) => handleJoinLeague(e)}>Join League</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaguePage;