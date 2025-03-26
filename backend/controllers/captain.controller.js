const { validationResult } = require('express-validator')
const captainService = require('../services/captain.service')
const captainModel = require('../models/captain.model')
const blacklistTokenModel = require('../models/blacklist.model')
module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json('data format is not correct') // ✅ Stops execution
    }

    const { fullname, email, password, vehicle } = req.body

    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email })
    if (isCaptainAlreadyExist) {
      return res.status(401).json({ message: 'Captain already exists' }) // ✅ Stops execution
    }

    // Hash password and create new captain
    const hashedPassword = await captainModel.hashPassword(password)

    const user = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      status: 'active',
      vehicle
    })

    return res.status(201).json({ user }) // ✅ Success response
  } catch (error) {
    console.error('Error registering captain:', error)
    return res.status(500).json({ message: 'Internal Server Error' }) // ✅ Catches unexpected errors
  }
}

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  const captain = await captainModel.findOne({ email }).select('+password')
  if (!captain) {
    return res.status(401).json({ message: 'invalid email or password' })
  }

  const isMatch = await captain.comparePassword(password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const token = captain.generateAuthToken()

  res.cookie('token', token)
  res.status(200).json({ token, captain })
}

module.exports.getProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain })
}
module.exports.logoutCaptain = async (req, res, next) => {
  res.clearCookie('token')
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  await blacklistTokenModel.create({
    token: token,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  })
  res.status(200).json({ message: 'logout successfully' })
}
