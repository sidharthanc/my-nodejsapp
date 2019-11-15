var obj = {
	name : 'john doe',
	greet : function(){
		console.log(`Hello ${this.name}`);

	}
}

obj.greet();
obj.greet.call({name : 'sidhu'});
obj.greet.apply({name : 'sidhu'});