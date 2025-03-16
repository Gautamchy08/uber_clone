import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/locationSearchPanel'
const home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloserRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
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
        {' '}
        <h5
          onClick={() => {
            setVehiclePanel(false)
          }}
          className='p-3 text-center w-[93%] absolute top-0  '
        >
          <i className='ri-arrow-down-wide-line text-3xl text-gray-400'></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div className='  w-full flex items-center justify-between p-1 mb-2  active:border-2 bg-gray-100  active:border-black  active:rounded-xl'>
          <img
            className='h-13'
            src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png'
            alt=''
          />
          <div className='  w-1/2'>
            <h4 className='font-bold text-m '>
              UberGo
              <span>
                <i className='ri-user-fill'></i>4
              </span>
            </h4>
            <h5 className='font-medium text-m '>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600 '>
              Affordable, compact rides
            </p>
          </div>
          <h2 className='text-xl font-semibold'>$193.20</h2>
        </div>
        <div className='  w-full flex items-center justify-between p-1 mb-2  active:border-2  bg-gray-100 active:border-black active:rounded-xl'>
          <img
            className='h-13'
            src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'
            alt=''
          />
          <div className='  w-1/2'>
            <h4 className='font-bold text-m '>
              MotoGo
              <span>
                <i className='ri-user-fill'></i>1
              </span>
            </h4>
            <h5 className='font-medium text-m '>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600 '>Moto Rides</p>
          </div>
          <h2 className='text-xl font-semibold'>$65.00</h2>
        </div>
        <div className='  w-full flex items-center justify-between p-1 mb-2 active:border-2 bg-gray-100 active:border-black active:rounded-xl'>
          <img
            className='h-13'
            src='https://tse4.mm.bing.net/th?id=OIP.gERohywpalGF3NjolmHt5wHaE7&pid=Api&P=0&h=180'
            alt=''
          />
          <div className='  w-1/2'>
            <h4 className='font-bold text-m '>
              UberAuto
              <span>
                <i className='ri-user-fill'></i>3
              </span>
            </h4>
            <h5 className='font-medium text-m '>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600 '>Auto rides</p>
          </div>
          <h2 className='text-xl font-semibold'>$118.68</h2>
        </div>
      </div>
    </div>
  )
}

export default home
