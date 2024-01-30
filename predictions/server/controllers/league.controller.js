const League = require('../models/league.model')
const User = require('../models/user.model')

// CREATE
const addLeague = async(req, res) => {
    try{
        const leagueData = {
            ...req.body,
            members: [req.body.user]
        };
        const newLeague= await League.create(leagueData)
        const updatedUser= await User.findOneAndUpdate(
            { _id: req.body.user },
            { 
                $push: { leagues: newLeague }, // push to the history array
            },
            { new: true, runValidators: true }
        ).populate("leagues")
            res.json({newLeague, updatedUser})
    } catch (err) { 
        console.log(err)
        res.status(400).json(err)
    }
}

// READ ONE by League id
const findLeague = (req, res) => {
    League.findById(req.params.id)
        .then( foundLeague => {
            res.status(200).json(foundLeague)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

// READ ALL
const findAllLeagues=(req, res)=> {
    League.find().populate("members")
        .then(allLeagues => {
            console.log("LEAGUES1", allLeagues)
            res.status(200).json({allLeagues})
        })
        .catch(err => {
            res.status(400).json(err)
        });

}
// UPDATE to add members
const updateLeague = (req, res) => {
    League.findByIdAndUpdate(
        {_id: req.params.id}, 
        { $addToSet: { members: req.body.userId } }, // use $addToSet instead of push to avoid dublicates
        { new: true, runValidators: true }
    )
    .then(updatedLeague => {
        res.status(200).json(updatedLeague)
    })
    .catch(err => res.status(400).json({ message: "something went wrong in update method", error: err }))
};

// UPDATE to add members
const updateLeagueinfo = (req, res) => {
    League.findByIdAndUpdate(
        { _id: req.params.id }, 
        { league_name: req.body.leagueName }, // Update league_name instead of members
        { new: true, runValidators: true }
    )
    .then(updatedLeague => {
        res.status(200).json(updatedLeague);
    })
    .catch(err => res.status(400).json({ message: "something went wrong in update method", error: err }));
};

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
    deleteLeague,
    findAllLeagues,
    updateLeagueinfo
}