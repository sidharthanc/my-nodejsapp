// read content from one file and write to another.

var fs = require('fs');
var readable = fs.createReadStream(__dirname + '/greet.txt', {encoding : 'utf8'});
var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

readable.on('data', function(chunk){

	console.log(chunk);
	writable.write(chunk);
})
