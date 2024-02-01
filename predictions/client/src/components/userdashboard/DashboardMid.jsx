import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import UserContext from '../../context/userContext';

export const DashboardMid = () => {
  const {teamNames, scoresAndPredictions} = useContext(UserContext)
  const [users, setUsers]= useState([])
  const [upcominggames, setUpcominggames] = useState({})
  const [currentGameWeek, setCurrentGameWeek] = useState(0);
  const gameWeeks = Object.keys(upcominggames);

  const goToNextWeek = () => {
        setCurrentGameWeek(current => (current + 1) % gameWeeks.length);
  };

  const goToPreviousWeek = () => {
        setCurrentGameWeek(current => (current - 1 + gameWeeks.length) % gameWeeks.length);
  };

  const checkfuturegames = () => {
    let upcomingGamesByWeek = {};
    for (const gameWeekKey in scoresAndPredictions) {
        const gameWeek = scoresAndPredictions[gameWeekKey];
        // Check if gameWeekInfo and games are defined
        if (gameWeek.gameWeekInfo && gameWeek.games) {
            const unfinishedGames = gameWeek.games.filter(game => game.gameInfo && !game.gameInfo.finished)
                .map(game => {
                    const teamAName = teamNames[game.gameInfo.team_a];
                    const teamHName = teamNames[game.gameInfo.team_h];
                    if (teamAName && teamHName) {
                        return {
                            teamA: teamAName,
                            teamH: teamHName,
                            kickoffTime: game.gameInfo.kickoff_time
                        };
                    } else {
                        // Log a warning if team information is missing
                        console.warn('Missing team information for game:', game);
                        return null;
                    }
                })
            if (unfinishedGames.length > 0) {
                upcomingGamesByWeek[gameWeek.gameWeekInfo.name] = unfinishedGames;
            }
        } else {
            console.warn(`Missing gameWeekInfo or games for game week: ${gameWeekKey}`);
        }
    }
    setUpcominggames(upcomingGamesByWeek);
};

  


  {/* api call to get all users*/}
  useEffect(()=>{

    axios.get("http://localhost:8000/api/users")
    .then(res=>{

        setUsers(res.data.allUsers)
        checkfuturegames()
    })
    .catch(err=>{
        console.log(err)
    })
  }, [])

// Convert to US time 
const localDeadline = date => {
let deadline = new Date(date)
let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let localDeadline = deadline.toLocaleString('en-US', {userTimeZone})

return localDeadline
}

  return (
    <>
      <div className="bg-white rounded rounded-3 overflow-hidden mx-3 border border-1 border-white">
        <h3 className='text-center text-white fw-bold p-2 m-0' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>Global Leaderboard</h3>
        <div>
          {
            [...users].sort((a, b) => b.points - a.points) // Sort users by points in descending order
                .slice(0, 5) // Get only the first 5 users
                  .map((user, index) => (
                      <p key={user._id} className='btn shadow text-dark-emphasis fw-bold mb-1 w-100'>{index + 1}. {user.firstName} {user.points} points</p>
              ))
          }
        </div>
        <div>
          <h3 className='text-center text-white fw-bold p-2 m-0 rounded-top-3' style={{backgroundImage: "linear-gradient(to right, #38003c, #04f5ff"}}>Future Games</h3>
          {gameWeeks.length > 0 && (
              <div className='p-1'>
                  <h3>{gameWeeks[currentGameWeek]}</h3>
                  {upcominggames[gameWeeks[currentGameWeek]].map((game, index) => (
                      <div key={index} className='d-flex w-100 justify-content-evenly btn shadow text-dark-emphasis fw-bold mb-1 w-100 '>
                          <p className='m-0'>{game.teamH} vs {game.teamA}</p>
                          <p className='m-0'>{localDeadline(game.kickoffTime)}</p>
                      </div>
                  ))}
                  <button onClick={goToPreviousWeek} disabled={currentGameWeek === 0} className="btn btn-sm fw-semibold border-0 mx-1 mb-1" style={{backgroundColor: "#04f5ff"}}>Previous Week</button>
                  <button onClick={goToNextWeek} disabled={currentGameWeek === gameWeeks.length - 1} className="btn btn-sm fw-semibold border-0  mx-1 mb-1" style={{backgroundColor: "#00ff85"}}>Next Week</button>
              </div>
            )}
        </div>
      </div>

    </>
  )
}

export default DashboardMid