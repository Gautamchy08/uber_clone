const http = require('http')
const app = require('./app')

const port = process.env.PORT || 5000

const server = http.createServer(app)

server.listen(4000, () => {
  console.log(`server listen at http://localhost:${port}`)
})
