import React from 'react'
import { Link } from 'react-router-dom'
const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center | bg-[url(https://images.unsplash.com/photo-1530652101053-8c0db4fbb5de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-8  h-screen w-full flex justify-between flex-col '>
        <img
          className='w-14 ml-9'
          src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
        />
        <div className='bg-white py-4 pb-7 px-4'>
          <h2 className='text-3xl font-bold'>Get started with Uber</h2>
          <Link
            to='/login'
            className='w-full flex  items-center justify-center bg-black text-white py-3 rounded mt-5'
          >
            {' '}
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
