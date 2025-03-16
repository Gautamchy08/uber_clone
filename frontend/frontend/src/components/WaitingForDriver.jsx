import React from 'react'

const WaitingForDriver = () => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false)
        }}
        className='p-3 text-center w-[93%] absolute top-0  '
      >
        <i className='ri-arrow-down-wide-line text-3xl text-gray-400'></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img
          className='h-12'
          src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'
          alt=''
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>Prince Samman</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>BR-01-2843</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'> </h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center '>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=' text-lg ri-map-pin-fill'></i>
            <div>
              <h3 className='text-lg font-medium'> 562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
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
      </div>
    </div>
  )
}

export default WaitingForDriver
