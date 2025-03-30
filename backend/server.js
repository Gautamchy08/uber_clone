const http = require('http')
const app = require('./app')
const { initializeSocket } = require('./socket')

const port = process.env.PORT || 5000

const server = http.createServer(app)

// Initialize socket.io
const io = initializeSocket(server)

server.listen(port, () => {
  console.log(`server listen at http://localhost:${port}`)
})
