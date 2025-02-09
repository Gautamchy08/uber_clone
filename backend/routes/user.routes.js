const express = require('express')

const router = express.Router()

const { body } = require('express-validator')

const userController = require('../controller/user.controller')

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('first should be atleast 3 length require'),
    body('password').isLength({ min: 6 }).withMessage('must contain 6 length')
  ],
  userController.registerUser
)

module.exports = router
