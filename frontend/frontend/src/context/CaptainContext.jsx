import { createContext, useContext, useState } from 'react'

export const CaptainDataContext = createContext()

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    },
    vehicle: {
      colour: '',
      plate: '',
      capacity: '',
      vehicleType: ''
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateCaptain = captainData => {
    setCaptain(captainData)
  }

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain
  }

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
