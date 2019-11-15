//create array object from other one.
var person = {
	first_name : '',
	last_name : '',
	greet : function() {
		return this.first_name + ' '+ this.last_name;
	}
}


var john = Object.create(person);
john.first_name = 'sidhu';
john.last_name = 'c';
console.log(john.greet());
