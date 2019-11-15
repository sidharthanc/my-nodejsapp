var mongoose = require('mongoose');
var bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken')
const Post = require('./post')
const validator = require('validator')
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
     validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid email')
            }
        },

    trim: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
  avatar: {
    type: Buffer
  }
});

// one user has many post relation here.

UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'owner'
})


UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, 'WinterIsComingGOT2019')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
     user = await User.findOne({ email} )
    if (user!=null) {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
       if (!isPasswordMatch) {
         user = null ;
       }  
    }
    
    return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User