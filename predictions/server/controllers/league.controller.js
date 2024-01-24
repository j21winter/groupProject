const League = require('../models/league.model')

// CREATE
const addLeague = (req, res) => {
    League.create(req.body)
        .then( newLeague => {
            res.status(200).json(newLeague)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

// READ
const findLeague = (req, res) => {
    League.findById(req.params.id)
        .then( foundLeague => {
            res.status(200).json(foundLeague)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
// UPDATE
const updateLeague = (req, res) => {
    League.findByIdAndUpdate(req.params.id, req.body)
        .then( updatedLeague => {
            res.status(200).json(updatedLeague)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

// DELETE
const deleteLeague = (req, res) => {
    // DOUBLE CHECK
    // do we need to remove from user.league before we delete?

    League.findByIdAndDelete(req.params.id)
        .then( deletedLeague => {
            res.status(200).json(deletedLeague)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


module.exports = {
    addLeague, 
    findLeague, 
    updateLeague, 
    deleteLeague
}