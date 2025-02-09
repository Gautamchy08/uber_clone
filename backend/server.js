const http = require('http')
const app = require('./app')

const port = process.env.PORT || 5000

const server = http.createServer(app)

const connectToDb = require('./db/db')

server.listen(port, () => {
  connectToDb()
  console.log('server listen at localhost:${port}')
})
