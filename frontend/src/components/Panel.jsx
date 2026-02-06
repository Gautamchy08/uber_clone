import React, { useEffect, useState } from 'react'

const Panel = ({
  children,
  closeBtn = true,
  title,
  isActive = false
  // onClose
}) => {
  const [panelActive, setPanelActive] = useState(isActive)
  useEffect(() => {
    setPanelActive(isActive)
  }, [isActive])
  console.log(panelActive, isActive)

  return panelActive ? (
    <div className='flex flex-col w-full h-1/2 fixed top-1/2 bg-white z-50 py-4 px-2'>
      {closeBtn ? (
        <button
          onClick={() => {
            setPanelActive(false)
          }}
          className='cursor-pointer mx-auto hover:bg-amber-50'
        >
          <i className='ri-arrow-down-wide-line text-3xl text-gray-400'></i>
        </button>
      ) : null}

      <h3 className='text-2xl font-semibold mb-5'>{title}</h3>
      <div className=''>{children}</div>
    </div>
  ) : null
}

export default Panel
