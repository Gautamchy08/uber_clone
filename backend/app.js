const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const mapRoutes = require('./routes/map.routes')
const cookieParser = require('cookie-parser')
const connectToDb = require('./db/db')
const rideRoutes = require('./routes/ride.routes')

app.use(
  cors({
    // origin: 'https://uber-clone-topaz.vercel.app', // your frontend URL
    origing: '*',
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectToDb()
// Serve static files from React frontend

app.get('/', (req, res) => {
  res.send(' gautam here')
})

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapRoutes)
app.use('/rides', rideRoutes)
module.exports = app
