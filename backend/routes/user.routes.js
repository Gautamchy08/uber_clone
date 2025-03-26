const express = require('express')

const router = express.Router()

const { body } = require('express-validator')

const userController = require('../controllers/user.controller')

const authMiddleware = require('../middleware/auth.middleware')

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

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({ min: 6 }).withMessage('must contain 6 length')
  ],
  userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUsers)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router
router.post('/home', authMiddleware.authUser, userController.getUsers)
