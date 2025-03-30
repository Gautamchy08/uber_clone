const mapService = require('../services/map.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { address } = req.query
    const coordinates = await mapService.getAdressCoordinate(address)
    res.status(200).json(coordinates)
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    res.status(404).json({ error: 'Coordinates not found' })
  }
}

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { origin, destination } = req.query
    const distanceTime = await mapService.getDistanceAndTime(
      origin,
      destination
    )
    res.status(200).json(distanceTime)
  } catch (error) {
    console.error('Error fetching distance and time:', error)
    res.status(404).json({ error: 'Distance and time not found' })
  }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { input } = req.query

    const suggestions = await mapService.getAutoCompleteSuggestions(input)

    res.status(200).json(suggestions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
