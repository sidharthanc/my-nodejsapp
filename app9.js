// read content from one file and write to another using pipe.

var fs = require('fs');
var readable = fs.createReadStream(__dirname + '/greet.txt', {encoding : 'utf8'});
var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');
readable.pipe(writable);