import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import UserContext from '../context/userContext';

const LeaguePage = () => {
  const { id } = useParams();
  const [league, setLeague] = useState({});
  const [membersDetails, setMembersDetails] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(membersDetails)

  // Fetch user by ID
  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
      return response.data; // Assuming this includes name and points
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  // Fetch league members
  const fetchLeagueMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/league/${id}`);
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

  
  useEffect(() => {
    fetchLeagueMembers();
  }, [id]);

  return (
    <div>
      <div className="container text-center">
        <Link to={'/dashboard'}>Dashboard</Link>
        <h1>{league.league_name}</h1>
        <h3>Members</h3>
        <table className="table table-striped text-center">
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
            <>
                <p><Link to={`/update/${league._id}`}>Edit</Link></p>
                <button className="btn btn-outline-primary" onClick={(e) => handleDelete(league._id)}>Delete</button>
              
                <br />
            </>
        ) : ''}
        {
          (
            league.members && league.members.includes(user._id) || league.user === user._id ?
            "You are a MEMBER":
                <button className="btn btn-outline-primary" onClick={(e) => handleJoinLeague()}>Join League</button>
        )}
      </div>
      </div>
  </div>

  )

        }
export default LeaguePage;