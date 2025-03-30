import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import { useRef } from 'react'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'
const CaptainRiding = props => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: 'translateY(0)'
        })
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
    },
    [finishRidePanel]
  )
  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img
          className='w-16'
          src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
          alt=''
        />
        <Link
          to='/home'
          className='h-10 w-10 bg-gray-300 flex items-center justify-center rounded-full'
        >
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <LiveTracking />
      </div>
      <div
        className='h-1/5 p-6 bg-yellow-700 flex justify-between items-center '
        onClick={() => setFinishRidePanel(true)}
      >
        <h5
          onClick={() => {}}
          className='  mt-2 text-center w-[95%] absolute top-4/5  '
        >
          <i className='ri-arrow-down-wide-line text-3xl text-black '></i>
        </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className='bg-green-600 text-white font-semibold p-3 px-5 rounded-lg'>
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className='fixed h-screen w-full z-10 bottom-0 translate-y-full bg-white px-3'
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
