const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const BlacklistTokenModel = require('../models/blacklist.model')

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errrors: errors.array() })
  }

  const { fullname, email, password } = req.body
  const hashedPassword = await userModel.hashPassword(password)

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
  })

  const token = user.generateAuthToken()
  res.status(200).json({ token, user })
}

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const user = await userModel.findOne({ email }).select('+password')
  if (!user) {
    return res.status(401).json({ message: 'invalid email or password' })
  }

  const isValid = await user.comparePassword(password)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const token = user.generateAuthToken()

  res.cookie('token', token)
  res.status(200).json({ token, user })
}

module.exports.getUsers = async (req, res, next) => {
  res.status(200).json(req.user)
}
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token')
  const token = req.cookies.token || req.headers.authorization.split(' ')[1]
  await BlacklistTokenModel.create({
    token: token,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Set expiration to 24 hours
  })

  res.status(200).json({ message: 'Logout successful' })
}
