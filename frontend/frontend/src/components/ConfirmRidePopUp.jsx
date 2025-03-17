import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const ConfirmRidePopUp = props => {
  const [otp, setOtp] = useState('')
  const submitHandler = e => {
    e.preventDefault()
  }
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopUpPanel(false)
        }}
        className='p-1 text-center w-[93%]  absolute top-0  '
      >
        <i className='ri-arrow-down-wide-line text-3xl text-gray-600  '></i>
      </h5>
      <h3 className='text-2xl font-semibold  mt-8 mb-5'>
        Confirm this ride to Start!
      </h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-3'>
        <div className='flex items-center gap-3'>
          <img
            className='h-10 w-10 rounded-full object-cover'
            src='https://tse3.mm.bing.net/th?id=OIP.59hYtOrco0EZe3thkO8j1AHaE7&pid=Api&P=0&h=180'
            alt=''
          />
          <h2 className='text-lg font-medium '>Ankita</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center  '>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=' text-lg  ri-map-pin-fill'></i>
            <div>
              <h3 className='text-lg font-medium'> 562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg  ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>
                {' '}
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className='ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹193</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form
            onSubmit={() => {
              submitHandler(e)
            }}
          >
            <input
              value={otp}
              onChange={() => {
                setOtp(e.target.value)
              }}
              className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter OTP'
            />
            <Link
              to='/captain-riding'
              className='w-full flex justify-center mt-2 font-semibold p-2 rounded-lg text-lg text-white bg-green-600'
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false)
              }}
              className='w-full mt-2 mb-2  font-bold p-2 rounded-lg text-lg bg-red-700 text-white '
            >
              Cancel Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
