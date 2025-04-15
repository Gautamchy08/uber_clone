import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = props => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const submitHandler = async e => {
    e.preventDefault()
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false)
      props.setRidePopupPanel(false)
      navigate('/captain-riding', { state: { ride: props.ride } })
    }
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
          <h2 className='text-lg font-medium '>
            {props.ride?.user.fullname.firstname +
              ' ' +
              props.ride?.user.fullname.lastname}
          </h2>
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
                {props.ride?.pickup}{' '}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg  ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className='ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={e => setOtp(e.target.value)}
              type='text'
              className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
              placeholder='Enter OTP'
            />

            <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
              }}
              className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
