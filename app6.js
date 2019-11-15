//array
var buffer = new ArrayBuffer(8);
var view = new Int32Array(buffer);
view[0] = 5;
view[1] = 6;
console.log(view);