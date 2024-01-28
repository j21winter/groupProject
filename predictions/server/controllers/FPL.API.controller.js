const axios = require('axios');
const Prediction = require('../models/predictions.model');
const User = require('../models/user.model');
require('../config/mongoose.config');

const getGames = async(userId) => {
    const allGames = {}

    try{
        // Get all games from FPL API 
        const allGamesRes = await axios.get('https://fantasy.premierleague.com/api/fixtures/')

        // get all predictions from user in DB
        // const allPredictionsRes = await axios.get('http://localhost:8000/api/predictions');
        const allPredictions = await Prediction.find({user : userId}).lean()

        // Create hash map of all games using FPL response 
        for (let game of allGamesRes.data){
            // if there is no game ID skip 
            if(!game.id){
                continue
            // if there is a game ID then create a key in AllGames and add the game object it 
            } else {
                allGames[game.id] =
                    {   
                        // add the game under game info 
                        gameInfo : {...game},
                        // create an empty prediction key to hold any completed predictions
                        prediction : null
                    }
                    }
            }

        
        // attach prediction to of a specific game to its corresponding game info and key in all games 
        if(allPredictions.length > 0){
            for(let myPrediction of allPredictions){
                // find all games with the same key as the prediction gameId and add to the prediction key
                allGames[myPrediction.gameId]["prediction"] = {...myPrediction}
            }
        }

        // !consider uncommenting after testing
        // assessPoints(allGames)
        // return all games with predictions attached 
        return allGames
        
    } catch (err) {
        console.log(err)
    }
}

const assessPoints = async (allGames) => {
    let pointsTotal = 0
    try{
        Object.entries(allGames).forEach(([key, value]) => {
            if(value.prediction != null){
                let pointsResponse = points(value)
                pointsTotal += pointsResponse.pointSum
                value.prediction = pointsResponse.prediction
            }
            
        })
        
        console.log("Total Points" + pointsTotal)
        const completeArray = []
        Object.entries(allGames).forEach(([key, value]) => completeArray.push(value))

        return {completeArray, pointsTotal}
    } catch (err) {
        console.log(err)
    }
}

const points = (data) => {

    const { gameInfo, prediction } = data

    prediction.pointsLog = {};

    let pointSum = 0 
    // check the score
    if(!gameInfo.finished){ //if the game hasn't finished yet then return 0 points
        return { pointSum: 0, prediction };
    } else {
        // compare predictions and results
        if(prediction.homeTeamScore > prediction.awayTeamScore && gameInfo.team_h_score > gameInfo.team_a_score){
            console.log('Correct result :' + prediction.gameId)
            pointSum += 1
            prediction["pointsLog"]["result"] = 1

        } else if(prediction.homeTeamScore < prediction.awayTeamScore && gameInfo.team_h_score < gameInfo.team_a_score) {
            console.log('Correct result :' + prediction.gameId)
            pointSum += 1
            prediction["pointsLog"]["result"] = 1

        } else if( prediction.homeTeamScore === prediction.awayTeamScore && gameInfo.team_h_score === gameInfo.team_a_score ) {
            console.log('Correct result :' + prediction.gameId)
            pointSum += 1
            prediction["pointsLog"]["result"] = 1
        } else {
            console.log('InCorrect result :' + prediction.gameId)
            prediction["pointsLog"]["result"] = 0
        }

        // check scores
        // check home team input
        if(prediction.homeTeamScore === gameInfo.team_h_score){
            console.log('Correct home team score')
            pointSum += 2
            prediction["pointsLog"]['homeTeamScore'] = 2
        } else {
            prediction["pointsLog"]['homeTeamScore'] = 0
        }

        // check away team input
        if(prediction.awayTeamScore === gameInfo.team_a_score){
            console.log('Correct away team score')
            pointSum += 2
            prediction["pointsLog"]['awayTeamScore'] = 2
        } else {
            prediction["pointsLog"]['awayTeamScore'] = 0
        }

        // check if they got both right ans award points
        if(prediction["pointsLog"]['homeTeamScore'] && prediction["pointsLog"]['awayTeamScore']){
            console.log('The perfect Result')
            pointSum += 3
            prediction["pointsLog"]['bonus'] = 3
        } else {
            prediction["pointsLog"]['bonus'] = 0
        }

        prediction["pointsLog"]["totalPoints"] = pointSum
    }

    return {pointSum, prediction}
}



const userID = '65b09dac8e0b112950cf0a2d'
const scoresAndPredictions = async(userID) => {
    try {
        const gamesWithPredictions = await getGames(userID)

        const {pointsTotal, completeArray} = await assessPoints(gamesWithPredictions)

        const updatedUser = await User.findByIdAndUpdate(userID, {points : pointsTotal}).populate('predictions')
        console.log(updatedUser)



        return {updatedUser, scoresAndPredictions: completeArray}
    } catch (err){
        console.log(err)
    }
}


module.exports = {
    scoresAndPredictions,
}
