const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt')
const secret_key = process.env.SECRET_KEY

// AUTHENTICATION
// register user // CREATE
const register = (req, res) => {
    User.create(req.body)
        .then(newUser => {
            // generate token
            const userToken = jwt.sign({
                id: newUser._id
            }, secret_key, {expiresIn: '1h'})
            // attach token to cookie
            res.cookie('userToken', userToken, {
                httpOnly: true
                })
                .json({ msg: "Account Registered!", user: newUser });
        })
        .catch(err => res.status(400).json(err));
    }

// login user
const login = async(req, res) => {
        const possibleUser = await User.findOne({ email: req.body.email })
            .populate("predictions")
    
        if(!possibleUser) {
            // email not found in users collection
            return res.sendStatus(400)
        }
        // compare stored password and input password
        const correctPassword = await bcrypt.compare(req.body.password, possibleUser.password);
        if(!correctPassword) {
            return res.sendStatus(400);
        }
        // create Json Web token
        const userToken = jwt.sign({
            id: possibleUser._id
        }, secret_key );
        // add JWT to the cookie in response
        res.cookie("userToken", userToken, {
                httpOnly: true
            })
            .json({ msg: "Login Successful!", user: possibleUser });
    }

// logout user
const logout = (req, res) => {
    res.clearCookie('userToken');
    res.sendStatus(200)
}


// READ
const findOne = (req, res) => {
    User.findOne({_id : req.params.id}).populate("predictions")
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
}

const isEmailUnique = async (email, userId)=> {
    const query = {email, _id : { $ne : userId }};
    let foundUser = await User.findOne(query);
    return !foundUser ;
}

// UPDATE
const updateUser =  async (req, res) => {
    console.log("update received")
    console.log(req.body)
    const {email, firstName, lastName} = req.body
    const userId = req.params.id

    try {
        // Find the user by ID
        const user = await User.findOne({_id : userId});

        if (email === user.email) {
            console.log("email is the same")
            const updatedUser = await User.findOneAndUpdate({_id: userId}, {firstName, lastName},  {new: true, runValidators: true})
            res.status(200).json(updatedUser)
        } else {
            console.log("email is different")

            const isUnique = await isEmailUnique(email, userId);
        
            if (isUnique) {
                const updatedUser = await User.findOneAndUpdate({_id: userId}, {firstName, lastName, email},  {new: true, runValidators: true})
                res.status(200).json(updatedUser)
            } else {
                res.status(400).json({errors:{email:{ message: "Email already in use!" }}})
            }
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

// DELETE 
const deleteUser = async (req, res) => {
    try{
        // Delete predictions of the list first
        const deletedPredictions = await Prediction.deleteMany({user : req.params.id})
        // Then delete the user
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        res.status(200).json(deletedUser)
    }catch (err){
        res.status(400).json(err)
    }
}

module.exports = {
    register,
    login, 
    logout, 
    findOne, 
    updateUser,
    deleteUser
}