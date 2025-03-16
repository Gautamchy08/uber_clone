import React from 'react'
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
  const [waitingForDriver, setWaitingForDriverRef] = useState(false)

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
          transform: 'translateY(0)'
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
          transform: 'translateY(0)'
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
          transform: 'translateY(0)'
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
          transform: 'translateY(0)'
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
      <img
        className='w-16 absolute left-5 top-5'
        src='https://tse1.mm.bing.net/th?id=OIP.bMP4BkSq_x3Df2eNblN7xwHaCk&pid=Api&P=0&h=180'
        alt=''
      />
      <div className='h-screen w-screen '>
        {/* image for temporary use */}
        <img
          className='h-full w-full object-cover'
          src='https://blog.imqa.io/content/images/2021/03/uber-sample.gif'
          alt=''
        />
      </div>
      <div className=' h-screen flex flex-col justify-end absolute top-0 w-full  '>
        <div className='h-[30%] bg-white p-5 relative '>
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
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={e => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 '
              type='text'
              placeholder='Add a pickup location'
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={e => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 '
              type='text'
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className='h-[70%] rounded-2xl bg-white '>
          <LocationSearchPanel
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className='fixed z-10 bottom-0 px-4 py-10 pt-14  w-full translate-y-full  bg-white  '
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <WaitingForDriver setWaitingForDriverRef={setWaitingForDriverRef} />
      </div>
    </div>
  )
}

export default home
