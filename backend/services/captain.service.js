const captainModel = require('../models/captain.model')

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  status,
  vehicle: { colour, plate, model, capacity, vehicleType }
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !colour ||
    !plate ||
    !model ||
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
      model,
      capacity,
      vehicleType
    }
  })
  return user
}
