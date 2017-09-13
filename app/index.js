// app/index.js
import foo from './foo.js';
import cookie from './cookie.js';

console.log(foo);

cookie.create('ratio',120/96,30);
console.log(cookie.read('ratio'));