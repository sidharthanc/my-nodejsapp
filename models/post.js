const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

// Define the Task Model
const Post = mongoose.model('Post', postSchema)

module.exports = Post
