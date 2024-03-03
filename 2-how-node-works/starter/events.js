const EventEmitter = require('events')


class Sales extends EventEmitter {
    constructor() {
        super()
    }
}

const myEmitter = new Sales()

myEmitter.on('newSale', () => {
    console.log('There was a new sale')
})

myEmitter.on('newSale', () => {
    console.log('Customer name : Alok')
})

myEmitter.on('newSale', (stock) => {
    console.log('Total items:', stock)
})

// myEmitter.emit('newSale', 9)

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const http = require('http')

const server = http.createServer()

// server.on('request', (req, res) => {
//     console.log('request received')
//     // res.end('request received')
// })
// server.on('request', (req, res) => {
//     res.end('Another request')
// })
// server.on('close', () => {
//     console.log('Server closed')
// })

server.listen(8000, '127.0.0.1', () => {
    console.log('waiting for request')
})