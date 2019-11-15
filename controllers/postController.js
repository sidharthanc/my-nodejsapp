module.exports = function(app){
const Post = require('../models/post');
const auth = require('../middleware/auth');
bodyParser = require('body-parser').json();

app.post('/posts',bodyParser, auth, async (req, res) => {
    const post = new Post({
        ...req.body,
        owner: req.user._id
    })
    try {
        await post.save()
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
})


// Read a post of a user with pass post id
app.get('/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
            owner: req.user._id
        })
        if (!post) {
            return res.status(404).send()
        }
        res.send(post)
    } catch (error) {
        res.send(error)
    }
})

//delete a post by current user
app.delete('/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })
        if (!post) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})





}