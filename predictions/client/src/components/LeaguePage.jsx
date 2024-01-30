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
  const [membersDetails, setMembersDetails] = useState([]);
  const navigate = useNavigate();
  // console.log(membersDetails)

  // Fetch user by ID
  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${ userId }`);
      return response.data; // Assuming this includes name and points
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  // Fetch league members
  const fetchLeagueMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/league/${ id }`);
      setLeague(response.data);

      const membersData = await Promise.all(response.data.members.map(memberId => fetchUserById(memberId)));
      setMembersDetails(membersData.filter(member => member !== null));
    } catch (error) {
      console.error("Error fetching league members:", error);
    }
  };

//TO UPDATE OR JOIN THE LEAGUE
const handleJoinLeague = () => {
  axios.patch(`http://localhost:8000/api/league/${league._id}`, { userId: user._id })
      .then(res => {
          console.log(res);
          console.log("Joined successfully")
          navigate("/dashboard")
      })
      .catch(err => {
          console.log(err);
      });
};


  const handleDelete= (_id) => {
    axios.delete(`http://localhost:8000/api/league/${_id}`)
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

  
  useEffect(() => {
    fetchLeagueMembers();
  }, [id]);

  return (
    <div style={{ backgroundColor: "#38003c" }}>
      <Header />
      <div className="container my-4">
        <div className="row">
          <div className="col text-center">
            {/* <Link to="/dashboard" className="btn btn-secondary mb-3">Dashboard</Link> */}
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
              {membersDetails.map((member, index) => (
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
              {league.members && league.members.includes(user._id) || league.user === user._id ?
                <p className="mt-3">
                  <span className="badge badge-success">You are a MEMBER</span>
                </p>
              :
                <button className="btn btn-join mt-3" onClick={handleJoinLeague}>Join League</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaguePage;