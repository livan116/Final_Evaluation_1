import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import "./App.css"
import { Toaster } from 'react-hot-toast'
import FormDashboard from './Pages/FormDashboard/FormDashboard'

const App = () => {
  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<LandingPage/>}/>
          <Route path='/register' element ={<Register/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/form-dashboard' element ={<FormDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App