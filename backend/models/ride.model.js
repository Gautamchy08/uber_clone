const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captain'
  },
  pickup: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'ongoing', 'cancelled'],
    default: 'pending'
  },
  duration: {
    type: Number
  }, //in seconds
  distance: {
    type: Number
  },
  paymentID: {
    type: String
  },
  orderID: {
    type: String
  },
  signature: {
    type: String
  }
})
module.exports = mongoose.model('ride', rideSchema)
