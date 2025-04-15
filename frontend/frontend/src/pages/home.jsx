import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/locationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloserRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setpickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [fare, setFare] = useState({})
  const [otp, setotp] = useState(null)
  const [activeField, setActiveField] = useState(null)
  const [ride, setRide] = useState(null)
  const navigate = useNavigate()

  const [useVehicleType, setUseVehicleType] = useState(null)
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id })
  }, [user])
  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })
  socket.on('ride-started', ride => {
    console.log('ride')
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  })

  const handlePickupChange = async e => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: e.target.value
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(response.data)
      if (response.status === 200) {
        setpickupSuggestions(response.data)
      }
    } catch (error) {
      console.error('Error fetching pickup suggestions:', error)
    }
  }

  const handleDestinationChange = async e => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: e.target.value
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      setDestinationSuggestions(response.data || [])
    } catch (error) {
      console.error('Error fetching destination suggestions:', error)
    }
  }

  const findFare = async (pickup, destination) => {
    try {
      if (!pickup || !destination) {
        console.error('Pickup and destination are required')
        return
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/getFare`,
        {
          pickup,
          destination
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (response.status === 200) {
        setFare(response.data.fare)
      }
    } catch (error) {
      console.error('Error fetching fare:', error)
    }
  }

  function findTrip () {
    setVehiclePanel(true)
    setPanelOpen(false)
  }

  async function createRide () {
    if (!pickup || !destination || !useVehicleType) {
      console.error('Pickup, destination, and vehicle type are required')
      return
    } else {
      console.log('data format is good')
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType: useVehicleType
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    console.log(response.data)
    if (response.status === 200) {
      setConfirmRidePanel(true)
      setVehiclePanel(false)
      setotp(response.data.otp)
    }
  }

  const submiteHandler = async e => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      })
      gsap.to(panelCloserRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloserRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(0%)'
        })
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
    },
    [vehiclePanel]
  )
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0%)'
        })
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(100%)'
        })
      }
    },
    [waitingForDriver]
  )
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0%)'
        })
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(100%)'
        })
      }
    },
    [vehicleFound]
  )

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(0%)'
        })
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
    },
    [confirmRidePanel]
  )

  return (
    <div className='relative h-screen overflow-hidden'>
      <LiveTracking />
      <div className='h-screen w-screen '>
        {/* image for temporary use */}
        <img
          className='h-full w-full object-cover'
          src='https://blog.imqa.io/content/images/2021/03/uber-sample.gif'
          alt=''
        />
      </div>
      <div className=' h-screen flex flex-col justify-end absolute top-0 w-full  '>
        <div className='h-[35%] bg-white p-5 relative '>
          <h5
            ref={panelCloserRef}
            onClick={e => {
              setPanelOpen(false)
            }}
            className='absolute right-6 top-6 text-2xl'
          >
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className='text-3xl font-semibold '>Find a Trip</h4>
          <form
            onSubmit={e => {
              submiteHandler(e)
            }}
          >
            <div className='line absolute h-12 w-1 top-[48%] left-10 bg-gray-800 rounded-full'></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setVehicleFound(false)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 '
              type='text'
              placeholder='Add a pickup location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setVehicleFound(false)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 '
              type='text'
              placeholder='Enter your destination'
            />
          </form>
          <button
            onClick={() => {
              findFare(pickup, destination)
              findTrip()
            }}
            className='w-full flex justify-center mt-3 font-semibold p-2 rounded-lg text-lg text-white bg-black'
          >
            Find a Ride
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            suggestions={
              activeField === 'pickup'
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className='fixed z-10 bottom-0 px-4 py-10 pt-14  w-full translate-y-full  bg-white  '
      >
        <VehiclePanel
          selectVehicle={setUseVehicleType}
          fare={fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setWaitingForDriver={setWaitingForDriver}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          useVehicleType={useVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          useVehicleType={useVehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} ride={ride} />
      </div>
    </div>
  )
}

export default home
