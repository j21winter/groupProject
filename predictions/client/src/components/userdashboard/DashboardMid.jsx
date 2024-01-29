import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import UserContext from '../../context/userContext';

export const DashboardMid = () => {
  const {user, setUser}=useContext(UserContext)
  const {teamNames, setteamNames} = useContext(UserContext)
  const {scoresAndPredictions, setscoresAndPredictions} = useContext(UserContext)
  const [users, setUsers]=useState([])
  const [upcominggames, setUpcominggames] = useState({})
  const [currentGameWeek, setCurrentGameWeek] = useState(0);
  const gameWeeks = Object.keys(upcominggames);

  const goToNextWeek = () => {
        setCurrentGameWeek(current => (current + 1) % gameWeeks.length);
  };

  const goToPreviousWeek = () => {
        setCurrentGameWeek(current => (current - 1 + gameWeeks.length) % gameWeeks.length);
  };
  // console.log(teamNames)
  // console.log(scoresAndPredictions)
  // console.log("upgames:>>>>" + upcominggames)

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
    console.log("made api call")
    axios.get("http://localhost:8000/api/users")
    .then(res=>{
        // console.log("RESULTS", res)
        setUsers(res.data.allUsers)
        checkfuturegames()
    })
    .catch(err=>{
        console.log(err)
    })
}, []
)

console.log("POINTS", user.points)
//number to display on leaderboard
let num=0
  return (
    <>
      <div className="container">
        <h3>Global Leaderboard</h3>
        {

            [...users].sort((a, b) => b.points - a.points) // Sort users by points in descending order
                .slice(0, 5) // Get only the first 5 users
                  .map((user, index) => (
                    <div key={user._id}>
                      <p>{index + 1}. {user.firstName} {user.points} points</p>
                    </div>
              ))

        }
        <div>
                <h2>Future Games</h2>
                {gameWeeks.length > 0 && (
                    <div>
                        <h3>{gameWeeks[currentGameWeek]}</h3>
                        {upcominggames[gameWeeks[currentGameWeek]].map((game, index) => (
                            <div key={index}>
                                <p>Match: {game.teamH} vs {game.teamA}</p>
                                <p>Kickoff Time: {game.kickoffTime}</p>
                            </div>
                        ))}
                        <button onClick={goToPreviousWeek} disabled={currentGameWeek === 0}>Previous Week</button>
                        <button onClick={goToNextWeek} disabled={currentGameWeek === gameWeeks.length - 1}>Next Week</button>
                    </div>
                )}
            </div>
        <div>
          <h3>Your points</h3>
          <p>{user.points}</p>
        </div>

      </div>

    </>
  )
}

export default DashboardMid