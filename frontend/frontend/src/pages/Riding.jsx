import React from 'react'
import { Link } from 'react-router-dom'
const Riding = () => {
  return (
    <div className='h-screen'>
      <Link
        to='/home'
        className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'
      >
        <i className=' font-semibold text-lg ri-home-4-line'></i>
      </Link>
      <div className='h-1/2'>
        <img
          className='h-full w-full object-cover'
          src='https://blog.imqa.io/content/images/2021/03/uber-sample.gif'
          alt=''
        />
      </div>
      <div className='h-1/2 p-4'>
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
        <button className='w-full flex justify-center mt-2 font-semibold p-2 rounded-lg text-lg text-white bg-green-600'>
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding
