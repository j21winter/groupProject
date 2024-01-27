const Prediction = require('../models/predictions.model')
const FPL_API = require('../controllers/FPL.API.controller')

// CREATE
const addPrediction = (req, res) => {
    Prediction.create(req.body)
        .then( newPrediction => {
            //! add prediction to user 
            res.status(200).json(newPrediction)
        })
        .catch(err => {
            res.status(400).json(err)
        })
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
            console.log(allPredictions)
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
    findPrediction, 
    updatePrediction, 
    deletePrediction,
    findAllPredictions,
}