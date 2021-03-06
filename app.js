var express = require('express');
var port = process.env.PORT || 3002 ;
var flash = require('req-flash');
var session = require('express-session');
const cookieParser = require('cookie-parser');
var app = express();

//moongose
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://sidharthan:sidharthan123@cluster0-euzw4.mongodb.net/myapp1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//end
var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');
var postController = require('./controllers/postController');
app.use('/assets', express.static(__dirname+ '/public')); // middle ware between request and response  store static files css,js.
//expressjs.com check for more middlewares and click resource tab and select which middleware need to use.
app.set('view engine', 'ejs' ); // template engine wat file extension like index.ejs,person.ejs 
// for flash message how much time should be there
app.use(cookieParser());
//use sessions for tracking logins

app.use(function(err, req, res, next){
    res.writeHead(err.status || 500,
     {'WWW-Authenticate':'Basic',
     'Content-Type':'text/plain'
 });
   }) 


app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.use(flash());

apiController(app);
htmlController(app);
postController(app);
app.listen(port);


