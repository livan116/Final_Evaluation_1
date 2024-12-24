import React from 'react'
import style from "./LandingPage.module.css"
import Navbar from '../Navbar/Navbar'
import BodyPage from '../BodyPage/BodyPage'

const LandingPage = () => {
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Navbar/>
      </div>
      <div className={style.body}>
      <BodyPage/>
      </div>
    </div>
  )
}

export default LandingPage