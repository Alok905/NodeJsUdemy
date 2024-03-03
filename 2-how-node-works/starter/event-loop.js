const fs = require('fs')
const crypto = require('crypto')

// setTimeout(() => console.log('setTimeout 1'), 0)
// setImmediate(() => console.log('setImmediate 1'))
// fs.readFile('test-file.txt', () => {
//     console.log('I/O finished')
//     setTimeout(() => console.log('setTimeout 2'), 0)
//     setImmediate(() => console.log('setImmediate 2'))
// })
// console.log('top level console log')


// const start = Date.now()
// process.env.UV_THREADPOOL_SIZE = 4;
// fs.readFile("test-file.txt", () => {
//     console.log("I/O finished");
//     console.log("----------------");

//     setTimeout(() => console.log("Timer 2 finished"), 0);
//     setTimeout(() => console.log("Timer 3 finished"), 3000);
//     setImmediate(() => console.log("Immediate 2 finished"));

//     process.nextTick(() => console.log("Process.nextTick"));

//     crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
//     console.log(Date.now() - start, "Password encrypted");

//     crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
//     console.log(Date.now() - start, "Password encrypted");

//     crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
//     console.log(Date.now() - start, "Password encrypted");

//     crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
//     console.log(Date.now() - start, "Password encrypted");
// });