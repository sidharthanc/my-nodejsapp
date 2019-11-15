module.exports = function(app){
	var bodyParser = require('body-parser');
	var jsonParser = bodyParser.json();
	app.get('/api/user', function(req,res){ // rendering json response
	res.json({firstname:'Sid',lastname:'C'});
})

	app.post('/personjson',jsonParser,function(req,res){ // json pass through ajax..
	console.log(req.body.firstname);
})

}