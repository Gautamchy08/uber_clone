import React from 'react'

const VehiclePanel = ({
  selectVehicle,
  setConfirmRidePanel,
  fare,
  setVehiclePanel,
  setVehicleFound
}) => {
  return (
    <div>
      <h5
        onClick={() => {
          setVehiclePanel(false)
        }}
        className='p-3 text-center w-[93%] absolute top-0  '
      >
        <i className='ri-arrow-down-wide-line text-3xl text-gray-400'></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
      <div
        onClick={() => {
          selectVehicle('car')
          setConfirmRidePanel(true)
          setVehicleFound(true)
        }}
        className='  w-full flex items-center justify-between p-1 mb-2  active:border-2 bg-gray-100  active:border-black  active:rounded-xl'
      >
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
        <h2 className='text-xl font-semibold'> ₹{fare.car}</h2>
      </div>
      <div
        onClick={() => {
          selectVehicle('motorcycle')
          setConfirmRidePanel(true)
          setVehicleFound(true)
        }}
        className='  w-full flex items-center justify-between p-1 mb-2  active:border-2  bg-gray-100 active:border-black active:rounded-xl'
      >
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
        <h2 className='text-xl font-semibold'>₹{fare.motorcycle}</h2>
      </div>
      <div
        onClick={() => {
          selectVehicle('auto')
          setConfirmRidePanel(true)
          setVehicleFound(true)
        }}
        className='  w-full flex items-center justify-between p-1 mb-2 active:border-2 bg-gray-100 active:border-black active:rounded-xl'
      >
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
        <h2 className='text-xl font-semibold'>₹{fare.auto}</h2>
      </div>
    </div>
  )
}

export default VehiclePanel
