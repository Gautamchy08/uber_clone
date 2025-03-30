const socketIo = require('socket.io')
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')

let io

const initializeSocket = server => {
  io = socketIo(server, {
    cors: {
      origin: '*', // Vite's default port
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', socket => {
    console.log('A user connected:', socket.id)

    socket.on('join', async data => {
      const { userId, userType } = data
      console.log(`user ${userId} joined as ${userType}`)
      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id
        })
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id
        })
      }
    })

    socket.on('update-location-captain', async data => {
      const { userId, location } = data

      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' })
      }

      const result = await captainModel.findByIdAndUpdate(
        userId,
        { $set: { location: { ltd: location.ltd, lng: location.lng } } },
        { new: true }
      )
    })
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })

  // Add more socket event listeners here
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject)

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data)
  } else {
    console.log('Socket.io not initialized.')
  }
}
module.exports = {
  initializeSocket,
  sendMessageToSocketId
}
