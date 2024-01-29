const mongoose = require('mongoose');

// make sure we only save one prediction per game... need validations function

const PredictionSchema = new mongoose.Schema({
    user : {
        // reference the user object with the ID
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    // gameWeekId : {
    //     // reference the game week, useful for searching games per game week
    //     type: Number, 
    //     required : [true , "Game week ID is required"]
    // }, 
    gameId : {
        // reference the game
        type: Number, 
        required : [true , "Game ID is required"]
    },
    homeTeamScore : {
        type: Number, 
        required : [true , "Score is required for both teams"],
        min : [0 , "Score must be 0 or higher"]
    },
    awayTeamScore : {
        type: Number, 
        required : [true , "Score is required for both teams"], 
        min : [0 , "Score must be 0 or higher"]
    }

}, {timestamps : true})

module.exports = mongoose.model("Predictions", PredictionSchema)