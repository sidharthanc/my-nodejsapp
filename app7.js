//file operations syncronous -> time depends result get that time.

var fs = require('fs');
var greet = fs.readFileSync(__dirname + '/greet.txt','utf8');
console.log(greet);

// file read operation aynchronous - not time depends we dont know when result getting.

var greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8',
	function(err,data)
	{
		if (err)
		{   console.log('error');
		//console.log(err);
		}
		else
		{
			console.log(data);
		}

	});

  console.log('Done!');