//build a weserver module in js
var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
	//res.writeHead(200, {'Content-Type' : 'text/html'}); // if need to render content as html
	if (req.url === '/')
	{	
     fs.createReadStream(__dirname + '/index.htm').pipe(res);
	}
	else if(req.url === '/api')
	{
	  res.writeHead(200, {'Content-Type' : 'application/json'}); // display json data
	  //res.writeHead(200, {'Content-Type' : 'text/plain'}); // show content as plain text
	//var html = fs.readFileSync(__dirname + '/index.htm');
	//var html = fs.createReadStream(__dirname + '/index.htm', 'utf8').pipe(res);
	var obj = {
		firstname : 'Sidhu',
		lastname  :  'C'
	};
	//res.end('Hello World\n'); //send the response text
    //var message = 'Hey are you there?'
    //html = html.replace('{message}', message); // replace html content with dynamic one from server side
	//res.end(html); // send the response as html file.
	res.end(JSON.stringify(obj)); // send response string format of json
	}
   else
   {
   	res.writeHead(404);
	res.end();
   }
	
	
	
}).listen(1337,'127.0.0.1'); // when post local host with port 1337 then receive the request and get response