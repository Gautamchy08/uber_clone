import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const captainLogout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      header: {
        Authorization: `bearer ${token}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    })
  return <div></div>
}

export default captainLogout
