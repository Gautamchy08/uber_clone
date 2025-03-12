import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import UserContext from './context/UserContext'
import './index.css'
import Captaincontext from './context/CaptainContext'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Captaincontext>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </Captaincontext>
  </StrictMode>
)
