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


app.listen(port, () => console.log(`listening on port: ${port}`));
