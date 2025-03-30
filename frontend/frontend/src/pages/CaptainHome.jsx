import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import { useRef } from 'react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null)
  const { captain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)
  const [ride, setRide] = useState(null)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    // return () => clearInterval(locationInterval)
  }, [])

  socket.on('new-ride', data => {
    console.log(data)
    setRide(data)
    setRidePopupPanel(true)
  })
  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: 'translateY(0)'
        })
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
    },
    [ridePopupPanel]
  )
  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: 'translateY(0)'
        })
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
    },
    [confirmRidePopUpPanel]
  )

  async function confirmRide () {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(response.data)
      setRidePopupPanel(false)
      setConfirmRidePopUpPanel(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='h-screen'>
      <div className='h-3/5'>
        <LiveTracking />
      </div>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <LiveTracking />
        <Link
          to='/home'
          className='h-10 w-10 bg-gray-300 flex items-center justify-center rounded-full'
        >
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3'
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopUpPanelRef}
        className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
