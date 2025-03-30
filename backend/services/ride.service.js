const rideModel = require('../models/ride.model')
const mapService = require('./map.service')
const crypto = require('crypto')
const captainModel = require('../models/captain.model')

module.exports.getFare = async ({ pickup, destination }) => {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required')
  }
  const distanceTime = await mapService.getDistanceAndTime(pickup, destination)
  const baseFare = {
    auto: 15,
    bike: 10,
    car: 20
  }
  const fareRates = {
    auto: 5, // rate per km
    bike: 3, // rate per km
    car: 15 // rate per km
  }
  const perMinuteRates = {
    auto: 2, // rate per minute
    bike: 1, // rate per minute
    car: 5 // rate per minute
  }

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * fareRates.auto +
        (distanceTime.duration.value / 60) * perMinuteRates.auto
    ),
    motorcycle: Math.round(
      baseFare.bike +
        (distanceTime.distance.value / 1000) * fareRates.bike +
        (distanceTime.duration.value / 60) * perMinuteRates.bike
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * fareRates.car +
        (distanceTime.duration.value / 60) * perMinuteRates.car
    )
  }
  return fare
}

function getOtp (num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString()
  return otp
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required')
  }
  const fare = await module.exports.getFare({ pickup, destination })
  const ride = await rideModel.create({
    user,
    pickup,
    fare: fare[vehicleType],
    otp: getOtp(6),
    destination
  })
  return ride
}

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) throw new Error('Ride id is required')
  await rideModel.findOneAndUpdate(
    {
      _id: rideId
    },
    {
      status: 'accepted',
      captain: captain._id
    }
  )

  const ride = await rideModel
    .findOne({
      _id: rideId
    })
    .populate('user')
    .populate('captain')
    .select('+otp')

  if (!ride) {
    throw new Error('Ride not found')
  }

  return ride
}
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error('Ride id and OTP are required')
  }

  const ride = await rideModel
    .findOne({
      _id: rideId
    })
    .populate('user')
    .populate('captain')
    .select('+otp')

  if (!ride) {
    throw new Error('Ride not found')
  }

  if (ride.status !== 'accepted') {
    throw new Error('Ride not accepted')
  }

  if (ride.otp !== otp) {
    throw new Error('Invalid OTP')
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId
    },
    {
      status: 'ongoing'
    }
  )

  return ride
}
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error('Ride id is required')
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id
    })
    .populate('user')
    .populate('captain')
    .select('+otp')

  if (!ride) {
    throw new Error('Ride not found')
  }

  if (ride.status !== 'ongoing') {
    throw new Error('Ride not ongoing')
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId
    },
    {
      status: 'completed'
    }
  )

  return ride
}
