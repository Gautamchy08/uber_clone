const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator')
const mapController = require('../controllers/map.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get(
  '/get-coordinates',
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
)

router.get(
  '/get-distance-time',
  query('origin').isString().isLength({ min: 3 }),
  query('destination').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceTime
)

router.get(
  '/get-suggestions',
  query('input').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
)

module.exports = router
