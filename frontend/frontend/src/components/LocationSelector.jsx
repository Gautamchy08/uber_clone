import { useState } from 'react'

const LocationSelector = ({ nextPanel, setActivePanel }) => {
  const [form, setForm] = useState({
    pickup: '',
    destination: ''
  })
  const submiteHandler = async e => {
    e.preventDefault()
    const { pickup, destination } = form
    console.log(form)
    setActivePanel(nextPanel)
    // findFare(pickup, destination)
    // findTrip()
  }
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
    <div>
      <form
        onSubmit={e => {
          submiteHandler(e)
        }}
      >
        <div className='line absolute h-12 w-1 top-[48%] left-10 bg-gray-800 rounded-full'></div>
        <input
          onClick={() => {
            // setPanelOpen(true)
            // setVehicleFound(false)
            // setActiveField('pickup')
          }}
          value={form.pickup}
          onChange={handleChange}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 '
          type='text'
          placeholder='Add a pickup location'
        />
        <input
          onClick={() => {
            // setPanelOpen(true)
            // setVehicleFound(false)
            // setActiveField('destination')
          }}
          value={form.destination}
          onChange={handleChange}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 '
          type='text'
          placeholder='Enter your destination'
        />
        <button
          type='submit'
          className='w-full flex justify-center mt-3 font-semibold p-2 rounded-lg text-lg text-white bg-black'
        >
          Find a Ride
        </button>
      </form>
    </div>
  )
}

export default LocationSelector
