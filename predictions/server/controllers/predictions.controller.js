const Prediction = require('../models/predictions.model')
const User = require('../models/user.model')
const FPL_API = require('../controllers/FPL.API.controller')

// CREATE
const addPrediction = (req, res) => {
    Prediction.create(req.body)
        .then( newPrediction => {
            res.status(200).json(newPrediction)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const addMany = async (req, res) => {
    try{

        const newPredictions = await Prediction.insertMany(req.body)
        const updatedUserWithPredictions = await User.findOneAndUpdate(
            { _id: req.body[0].user },
            { 
                $push: { predictions: { $each : newPredictions } },
            },
            { new: true, runValidators: true }
        ).populate("predictions").populate('leagues')

        const {updatedUser, scoresAndPredictions} = await FPL_API.scoresAndPredictions(req.body[0].user)
        res.status(200).json({updatedUser, scoresAndPredictions})
    }catch(err){
        res.status(400).json(err)
    }

}

// READ
const findPrediction = (req, res) => {
    Prediction.findById(req.params.id)
        .then( foundPrediction => {
            res.status(200).json(foundPrediction)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const findAllPredictions = (req, res) => {
    Prediction.find({})
        .then(allPredictions => {
            res.status(200).json(allPredictions)})
        .catch(err => console.log(err))
}
// UPDATE
const updatePrediction = (req, res) => {
    Prediction.findByIdAndUpdate(req.params.id, req.body)
        .then( updatedPrediction => {
            res.status(200).json(updatedPrediction)
        })
        .catch(err => {
            res.status(400).json(err)
        })

}

// DELETE
const deletePrediction = (req, res) => {
    // DOUBLE CHECK
    // do we need to remove from user.predictions before we delete?

    Prediction.findByIdAndDelete(req.params.id)
        .then( deletedPrediction => {
            res.status(200).json(deletedPrediction)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


module.exports = {
    addPrediction, 
    addMany,
    findPrediction, 
    updatePrediction, 
    deletePrediction,
    findAllPredictions,
}