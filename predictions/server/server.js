const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

const cookieParser = require('cookie-parser');
require('dotenv').config();


app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


require('./config/mongoose.config');

// ROUTES
require('./routes/user.routes')(app)
require('./routes/prediction.routes')(app)
require('./routes/league.routes')(app)


app.listen(port, () => console.log(`listening on port: ${port}`));

// const fetchTeamIdAndName = async () => {
//     try {
//         const response = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static');
//         const teams = response.data.teams;
//         const teamInfo = teams.map(team => ({ id: team.id, name: team.name }));
//         console.log(teamInfo);
//         return teamInfo;
//     } catch (error) {
//         console.error('Error fetching team ID and name:', error);
//         return null;
//     }
// };
// fetchTeamIdAndName()



