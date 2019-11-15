var buf = new Buffer('Hello','utf8');
console.log(buf);
console.log(buf.toString());
buf.write('world');
console.log(buf.toString());