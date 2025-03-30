import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import UserContext from './context/UserContext'
import './index.css'
import Captaincontext from './context/CaptainContext'
import SocketProvider from './context/SocketContext'
createRoot(document.getElementById('root')).render(
  <Captaincontext>
    <UserContext>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </UserContext>
  </Captaincontext>
)
