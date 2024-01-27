const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// check for uniqueness of email 
const isEmailUnique = async (email, userId)=> {
    const query = {email, _id : { $ne : userId }};
    let foundUser = await mongoose.models.User.findOne(query);
    return !foundUser ;
}

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'First name is required'],
        minlength : [3, 'First name must be 3 or more characters'],
        trim: true
    },
    lastName : {
        type: String,
        required: [true, 'Last name is required'],
        minlength : [3, 'Last name must be 3 or more characters'],
        trim: true
    },
    email : {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        validate: [
            // check email format 
            {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            },
            // check email is unique
            {
                validator: function (val ) {
                    // call the function to test this
                    return isEmailUnique(val, this._id)
                }, 
                message: "Email already in use!"
        }]
    
    },
    password : {
        type : String,
        required: [true, 'Password is required'],
        minlength : [8, 'Password must be 8 or more characters'],
        trim: true
    }, 
    // hold accumulative points for the user
    points : {
        type : Number,
        min : 0, 
        default: 0
    }, 
    // hold all predictions in value prediction object
    predictions : [{
        // reference the prediciton object with the object ID
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Predictions"
    }]
    //Do we need to add leagues as well?
    //Ex:
    //leagues : {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "league"
        
    // }
}, {timestamps : true});

// MIDDLEWEAR

// do not save confirm password in the db
UserSchema.virtual('confirmPassword')
    .get( () => this.confirmPassword )
    .set( value => this.confirmPassword = value );

// validate password match
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });

    // has the pw before saving
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });

module.exports = mongoose.model('User', UserSchema);