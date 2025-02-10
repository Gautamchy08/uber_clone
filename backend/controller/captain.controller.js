const { validationResult } = require('express-validator')

const captainService = require('../services/captain.service')
const captainModel = require('../models/captain.model')

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errrors: errors.array() })
  }
  const { fullname, email, password, vehicle } = req.body
  const hashedPassword = await captainModel.hashPassword(password)
  const user = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    status: 'active',
    vehicle
  })

  res.status(200).json({ user })
}

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const isCaptainAlreadyExist = await captainModel.findOne({ email })
  if (!isCaptainAlreadyExist) {
    return res.status(401).json({ message: 'Captain already exist' })
  }
  const user = await captainModel.findOne({ email }).select('+password')
  if (!user) {
    return res.status(401).json({ message: 'invalid email or password' })
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const token = user.generateAuthToken()

  res.cookie('token', token)
  res.status(200).json({ token, user })

  res.status(200).json({ user })
}
