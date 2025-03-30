const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator')
const mapService = require('../services/map.service')
const { sendMessageToSocketId } = require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { userId, pickup, destination, vehicleType } = req.body

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType
    })
    res.status(201).json(ride)

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup)

    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      200
    )
    ride.otp = ''
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate('user')
    captainsInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: 'new-ride',
        data: rideWithUser
      })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

module.exports.getByFare = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() })
  }
  const { pickup, destination } = req.body
  try {
    const fare = await rideService.getFare({ pickup, destination })
    res.status(200).json({ fare })
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.error(error)
  }
}

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { rideId } = req.body

  try {
    const ride = await rideService.confirmRide({ rideId, captain: req.captain })

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    })

    return res.status(200).json(ride)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { rideId, otp } = req.query

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain
    })

    console.log(ride)

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    })

    return res.status(200).json(ride)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { rideId } = req.body

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain })

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-ended',
      data: ride
    })

    return res.status(200).json(ride)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
