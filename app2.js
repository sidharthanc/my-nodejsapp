var obj = {
	greet : 'hey are you there??'
}

console.log(obj.greet);
console.log(obj['greet']);


//functions and arrays

var array = [];

array.push(function(){
	console.log('Hello1');
})

array.push(function(){
	console.log('Hello2');
})

array.push(function(){
	console.log('Hello3');
})


array.forEach(function(items){
	console.log(items);
	items();
})