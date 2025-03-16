import React from 'react'

const locationSearchPanel = props => {
  // sample array of location
  const locations = [
    "24B, Near Kapoor's cafe Bhopal, Sheriyans Coding School",
    "21B, Near Kapoor's cafe Bhopal, Sheriyans Coding School",
    "24C, Near Kapoor's cafe Bhopal, Sheriyans Coding School",
    "24A, Near Kapoor's cafe Bhopal, Sheriyans Coding School"
  ]

  return (
    <div>
      {/* Sample data */}
      {locations.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }}
          className='flex items-center gap-4 border-2 p-3 border-white rounded-xl active:border-black m-2 bg-gray-100 my-4'
        >
          <h2 className='bg-white rounded-full h-6 w-8 m-1 flex items-center justify-center'>
            <i className='ri-map-pin-fill'></i>
          </h2>
          <h4 className='m-1 font-medium text-black'>{elem}</h4>
        </div>
      ))}
    </div>
  )
}

export default locationSearchPanel
