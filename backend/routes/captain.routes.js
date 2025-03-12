const express = require('express')
const captainController = require('../controller/captain.controller')
const { body } = require('express-validator')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage(' behenchodd first should be atleast 3 length require'),
    body('password').isLength({ min: 6 }).withMessage('must contain 6 length'),
    body('vehicle.colour')
      .isLength({ min: 3 })
      .withMessage('colour should be atleast 3 length require'),
    body('vehicle.plate')
      .isLength({ min: 3 })
      .withMessage('plate should be atleast 3 length require'),
    // body('vehicle.model')
    //   .isLength({ min: 3 })
    //   .withMessage('model should be atleast 3 length require'),
    body('vehicle.capacity')
      .isLength({ min: 1 })
      .withMessage('capacity should be atleast 1'),
    body('vehicle.vehicleType')
      .isLength({ min: 3 })
      .withMessage('vehicleType should be atleast 3 length require')
  ],
  captainController.registerCaptain
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('must contain 6 length')
  ],
  captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getProfile)

router.post(
  '/logout',
  authMiddleware.authCaptain,
  captainController.logoutCaptain
)

module.exports = router
