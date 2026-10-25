import {React,useState} from 'react'
import Signup from './pages/Signup.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import OtpVerify from "./pages/OtpVerify.jsx"

const App = () => {
  return (
    <>
    <Routes>

    <Route path= "/" element={<Signup/>}></Route>
    <Route path= "/login" element={<Login/>}></Route>
    <Route path="/OtpVerify" element={<OtpVerify/>}></Route>
    <Route path= "/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </>
  )
}

export default App
