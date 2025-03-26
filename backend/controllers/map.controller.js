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

module.exports.getAutocompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { input } = req.query
    const suggestions = await mapService.getAutocompleteSuggestions(input)
    res.status(200).json(suggestions)
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    res.status(404).json({ error: 'Suggestions not found' })
  }
}
