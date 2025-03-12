import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
const captainLogout = () => {
  Navigate = useNavigate()
  const token = localStorage.getItem('token')
  axios
    .get(`${import.meta.env.VITE_BASE_URL}` / captain / logout, {
      header: {
        Authorization: `bearer ${token}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        localStorage.removeItem('token')
        Navigate('/login')
      }
    })
  return <div></div>
}

export default captainLogout
