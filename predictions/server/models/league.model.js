const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
    league_name: { 
      type: String,
      required: [true, "League name is required"],
      minlength: [2, "League name must be at least 2 characters long"]
    }, 
    user : {
      // reference the user object with the ID
      type : mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    members: [{
      type : mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  
  }, { timestamps: true });

module.exports = mongoose.model("League", LeagueSchema);
