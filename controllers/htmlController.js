module.exports = function(app,mongoose){
	bodyParser = require('body-parser').json();
	//var urlencodedParser = bodyParser.urlencoded({ extended: true });
	const User = require('../models/user')
    const auth = require('../middleware/auth');
    const {
    sendWelcomeEmail,
    sendCancellationEmail
} = require('../emails/account')

	app.get('/', function(req,res){ // rendering sample html
	//res.send('<html><head><link rel="stylesheet" type="text/css" href="assets/style.css"></head><body>Hello world!</body></html>');
	res.render('index');
})

	const multer = require('multer')
   const upload = multer({
})

app.get('/register', function(req,res){ // rendering sample html
	//res.send('<html><head><link rel="stylesheet" type="text/css" href="assets/style.css"></head><body>Hello world!</body></html>');
	res.render('register');
})

app.post('/users',bodyParser,async(req, res) => { // form submission post
	//Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (user == null) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        //res.render('profile', {user: user })
         res.send({ user, token})
        
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /logout
app.post('/users/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send('Logout successfully');
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/users/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send('all your account logout successfully');
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/upload', auth, upload.single('upload'), async (req, res) => {
	req.user.avatar = req.file.buffer
	await req.user.save();
res.sendStatus(200);
}, (error, req, res, next) => {
	res.status(400).send({error: error.message})
})

app.post('/create_user',bodyParser,async(req, res) => { // form submission post
	 // Check if this user already exisits
        // Insert the new user if they do not exist yet

        console.log(req.body.email);

        User.findOne({ email: req.body.email } , function(err,exist_user){
         
         if (exist_user == null)
         {

         	if (req.body.email &&
  req.body.username &&
  req.body.password) {
  userData = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
  //use schema.create to insert data into the db
  User.create(userData, async(err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send(err)
    } else {
      sendWelcomeEmail(user.email, user.username)	
      const token = await user.generateAuthToken()	
      //return res.redirect('/');
      res.status(201).send({ user, token })
    }
  });
}
         }
         else
         {
         	return res.status(400).send('User already exisits!');
         }

        });

        


})

app.get('/user/:id', function(req,res){ //dynamic params pass
	//res.send('<html><head></head><body><h1>Person: '+ req.params.id+'!</h1></body></html>'); // dynamic passed id showing in view.
	res.render('person', {id: req.params.id , qstrs: req.query.qstr }); // this 'req.query.qstr' which qstr is  passing via paraams in browser 
})

app.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    // for getting any resource need to verify user logged in.
    res.send(req.user)
})

app.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user || !user.avatar) {
			throw new Error('User cannot be found')
		}
		res.set('Content-Type', 'image/png')
		res.send(user.avatar)
	} catch (error) {
		res.status(404).send(error)
	}

})


}