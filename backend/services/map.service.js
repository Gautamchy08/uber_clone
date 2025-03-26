const axios = require('axios')

module.exports.getAdressCoordinate = async address => {
  const apiKey = process.env.GOOGLE_MAPS_API
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`
  if (!apiKey) {
    throw new Error('API key is missing')
  }

  try {
    const response = await axios.get(url)
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location
      return {
        lat: location.lat,
        lng: location.lng
      }
    } else throw new Error('Unable to fetch coordinates')
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required')
  }
  const apiKey = process.env.GOOGLE_MAPS_API
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`
  if (!apiKey) {
    throw new Error('API key is missing')
  }

  try {
    const response = await axios.get(url)
    if (response.data.status === 'OK') {
      if (
        response.data.rows.length === 0 ||
        response.data.rows[0].elements[0] === 'ZERO_RESULTS'
      ) {
        throw new Error('No elements found in the response')
      }
      const element = response.data.rows[0].elements[0]
      return {
        distance: element.distance.text,
        duration: element.duration.text
      }
    } else throw new Error('Unable to fetch distance and time')
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports.getAutocompleteSuggestions = async input => {
  if (!input) {
    throw new Error('query is required')
  }
  const apiKey = process.env.GOOGLE_MAPS_API
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`
  if (!apiKey) {
    throw new Error('API key is missing')
  }
  try {
    const response = await axios.get(url)
    if (response.data.status === 'OK') {
      return response.data.predictions
    } else throw new Error('Unable to fetch autocomplete suggestions')
  } catch (error) {
    console.error(error)
    throw error
  }
}
