const captainModel = require('../models/captain.model')

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  status,
  vehicle: { colour, plate, capacity, vehicleType }
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !colour ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error('All fields are required')
  }
  const user = captainModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password,
    status,
    vehicle: {
      colour,
      plate,
      capacity,
      vehicleType
    }
  })
  return user
}
