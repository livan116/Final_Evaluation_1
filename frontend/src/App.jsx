import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import "./App.css"
import { Toaster } from 'react-hot-toast'
import FormDashboard from './Pages/FormDashboard/FormDashboard'
import Settings from './Pages/Settings/Settings'
import WorkSpace from './Pages/WorkSpace/WorkSpace'
// import FormBuilder from "./Pages/DashBoard/FormBuilder"
import ChatbotPage from './Pages/ChatBot/ChatbotPage'

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
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/workspace/:folderId/:formId' element={<WorkSpace/>}/>
          <Route path='/formbot/:linkId' element={<ChatbotPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App