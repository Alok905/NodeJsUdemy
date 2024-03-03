/*
console.log('log 1')
process.nextTick(() => {
    console.log('Process.next 1')
})
console.log('log 2')

// o/p:

// log 1
// log 2
// Process.next 1
*/

/*
Promise.resolve().then(() => console.log('Promise.resolve 1'))
process.nextTick(() => console.log('Process.nexttick 1'))
// o/p:
// Process.nexttick 1
// Promise.resolve 1
*/

/*
process.nextTick(() => console.log('process.nextTick 1'))
process.nextTick(() => {
    console.log('process.nextTick 2')
    process.nextTick(() => console.log('Process.nextTick inside process.nextTick'))
})
process.nextTick(() => console.log('process.nextTick 3'))

Promise.resolve().then(() => console.log('Promise.resolve 1'))
Promise.resolve().then(() => {
    console.log('Promise.resolve 2')
    process.nextTick(() => console.log('Process.nextTick inside Promise.resolve'))
})
Promise.resolve().then(() => console.log('Promise.resolve 3'))

// o/p:
// process.nextTick 1
// process.nextTick 2
// process.nextTick 3
// Process.nextTick inside process.nextTick
// Promise.resolve 1
// Promise.resolve 2
// Promise.resolve 3
// Process.nextTick inside Promise.resolve
*/

/*
setTimeout(() => console.log('setTimeout 1'), 0)
setTimeout(() => {
    console.log('setTimeout 2')
    process.nextTick(() => console.log('Process.nextTick inside setTimeout'))
    console.log('setTimeout 22')
}, 0)
setTimeout(() => console.log('setTimeout 3'), 0)

process.nextTick(() => console.log('process.nextTick 1'))
process.nextTick(() => {
    console.log('process.nextTick 2')
    process.nextTick(() => console.log('Process.nextTick inside process.nextTick'))
})
process.nextTick(() => console.log('process.nextTick 3'))

Promise.resolve().then(() => console.log('Promise.resolve 1'))
Promise.resolve().then(() => {
    console.log('Promise.resolve 2')
    process.nextTick(() => console.log('Process.nextTick inside Promise.resolve'))
})
Promise.resolve().then(() => console.log('Promise.resolve 3'))

// o/p:
// process.nextTick 1
// process.nextTick 2
// process.nextTick 3
// Process.nextTick inside process.nextTick
// Promise.resolve 1
// Promise.resolve 2
// Promise.resolve 3
// Process.nextTick inside Promise.resolve
// setTimeout 1
// setTimeout 2
// setTimeout 22
// Process.nextTick inside setTimeout
// setTimeout 3
*/

/*
const fs = require('fs')
fs.readFile('./test.txt', () => {
    console.log('readfile 1')
})
setTimeout(() => console.log('setTimeout 1'), 0)

// o/p:
// Here the order of execution can not be guarenteed. Internally the implementation of setTimeOut function is for minimum 1s delay, so if the I/O completes within in less than(not less than or equal to) 1s, then I/O callback will be executed and in the next loop the timeout callback. otherwise the timer callback will be executed first.
*/

/*
const fs = require('fs')
fs.readFile('./test.txt', () => {
    console.log('readfile 1')
})
process.nextTick(() => console.log('process.nextTick 1'))
Promise.resolve().then(() => console.log('Promise.resolve 1'))
setTimeout(() => console.log('setTimeout 1'), 0)
for (let i = 0; i < 1000000000; i++);

// o/p:
// process.nextTick 1
// Promise.resolve 1
// setTimeout 1
// readfile 1
*/

/*
const fs = require('fs')
fs.readFile('./test.txt', () => {
    console.log('readfile 1')
})
process.nextTick(() => console.log('process.nextTick 1'))
Promise.resolve().then(() => console.log('Promise.resolve 1'))
setTimeout(() => console.log('setTimeout 1'), 0)
setImmediate(() => console.log('setImmediate 1'))
for (let i = 0; i < 10000000000; i++);

// o/p:
// process.nextTick 1
// Promise.resolve 1
// setTimeout 1
// setImmediate 1
// readfile 1

// Here the readFile1 should be printed before the setImmediate1. As we have already run a long for loop so till then the file should be read and the callback function should be added to the queue but the reality is different. when the event loop come to the I/O queue after completing the timer queue, it poll to check if any I/O operation is completed or not, the completed one's callback functions are then added to the I/O callback queue and then the event loop proceed further. And then in the next iteration the I/O callbacks are executed.
*/

/*
const fs = require('fs')
fs.readFile('./test.txt', () => {
    console.log('readfile 1')
    setImmediate(() => console.log('setImmediate inside readfile'))
    fs.readFile('./test.txt', () => console.log('readfile inside readfile'))
})
process.nextTick(() => console.log('process.nextTick 1'))
Promise.resolve().then(() => console.log('Promise.resolve 1'))
setTimeout(() => console.log('setTimeout 1'), 0)
setImmediate(() => console.log('setImmediate 1'))
for (let i = 0; i < 10000000000; i++);

// o/p:
// process.nextTick 1
// Promise.resolve 1
// setTimeout 1
// setImmediate 1
// readfile 1
// setImmediate inside readfile
// readfile inside readfile
*/

/*
const fs = require('fs')
fs.readFile('./test.txt', () => {
    console.log('readfile 1')
    setImmediate(() => console.log('setImmediate inside readfile'))
    process.nextTick(() => console.log('process.nextTick inside readfile'))
    Promise.resolve().then(() => console.log('Promise.resolve inside readfile'))
})
process.nextTick(() => console.log('process.nextTick 1'))
Promise.resolve().then(() => console.log('Promise.resolve 1'))
setTimeout(() => console.log('setTimeout 1'), 0)
setImmediate(() => console.log('setImmediate 1'))
for (let i = 0; i < 10000000000; i++);

// o/p:
// process.nextTick 1
// Promise.resolve 1
// setTimeout 1
// setImmediate 1
// readfile 1
// process.nextTick inside readfile
// Promise.resolve inside readfile
// setImmediate inside readfile
*/

/*
setImmediate(() => console.log('setImmediate 1'))
setImmediate(() => {
    console.log('setImmediate 2')
    process.nextTick(() => console.log('process.nextTick inside setImmediate'))
    Promise.resolve().then(() => console.log('Promise.resolve inside setImmediate'))
})
setImmediate(() => console.log('setImmediate 3'))

// o/p:
// setImmediate 1
// setImmediate 2
// process.nextTick inside setImmediate
// Promise.resolve inside setImmediate
// setImmediate 3
*/