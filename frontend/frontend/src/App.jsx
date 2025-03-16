import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import Home from './pages/home.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-Login' element={<CaptainLogin />} />
        <Route path='/captain-Signup' element={<CaptainSignup />} />
        <Route
          path='/home'
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path='/user/logout'
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path='/captain/logout'
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path='/captain-Home'
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </div>
  )
}

export default App
