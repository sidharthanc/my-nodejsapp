function Greetr()
{
	this.greeting = 'hey sidhu';
	this.greet = function(){
		console.log(this.greeting);
	}
}

module.exports = Greetr;