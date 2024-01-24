const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    user : {
        // reference the user object with the ID
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    gameWeekId : {
        type: Number, 
        required : [true , "Game week ID is required"]
    }, 
    gameId : {
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