const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const mapRoutes = require('./routes/map.routes')
const cookieParser = require('cookie-parser')
const connectToDb = require('./db/db')
const rideRoutes = require('./routes/ride.routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectToDb()
// Serve static files from React frontend
app.use(express.static(path.join(__dirname, 'public')))

// Serve frontend for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/', (req, res) => {
  res.send(' gautam here')
})

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapRoutes)
app.use('/rides', rideRoutes)
module.exports = app
