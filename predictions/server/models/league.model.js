const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
    league_name: { 
      type: String,
      required: [true, "League name is required"],
      minlength: [1, "League name must be at least 1 characters long"]
    }},

 
    //Do we need to add an empty list of league members or a league owner here? Or does that come somewhere later?
        
    
{ timestamps: true }
);
const League = mongoose.model("League", LeagueSchema);
module.exports = League;
