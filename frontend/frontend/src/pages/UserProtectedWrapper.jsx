import react from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
    }
  }, [token])

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setUser(response.data.user)
        setIsLoading(false)
      }
    })
    .catch(error => {
      console.log(error)
      localStorage.removeItem('token')
      navigate('/login')
    })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
export default UserProtectedWrapper
