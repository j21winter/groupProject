const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
    league_name: { 
      type: String,
      required: [true, "League name is required"],
      minlength: [1, "League name must be at least 1 characters long"]
    }, 

    admin: {
      type : mongoose.Schema.Types.ObjectId, 
      ref : "users" 
    }, 

    members: [
      {type : mongoose.Schema.Types.ObjectId, 
      ref : "users" }
    ]

  },

    
    
{ timestamps: true }
);
const League = mongoose.model("League", LeagueSchema);
module.exports = League;
