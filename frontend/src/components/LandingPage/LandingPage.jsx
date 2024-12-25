import React from 'react'
import style from "./LandingPage.module.css"
import Navbar from '../Navbar/Navbar'
import BodyPage from '../BodyPage/BodyPage'
import Info from '../Info/Info'
import Platform from '../Platforms/Platform'
import ChatBot from '../ChatBot/ChatBot'

const LandingPage = () => {
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Navbar/>
      </div>
      <div className={style.body}>
      <BodyPage/>
      </div>
      <div className={style.info}>
        <Info/>
      </div>
      <div className={style.platforms}>
        <Platform/>
      </div>
      <div className={style.chatBot}>
        <ChatBot/>
      </div>
    </div>
  )
}

export default LandingPage