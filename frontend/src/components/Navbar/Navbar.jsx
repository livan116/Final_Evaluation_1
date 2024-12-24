import React from 'react'
import style from "./Navbar.module.css"
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <div className={style.nav}>
        <div className={style.logoHead}>
        <img src={logo} alt="" />
        <h3>FormBot</h3>
         </div>
         <div className={style.signin}>
            <button className={style.signinBtn}>Sign in</button>
            <button className={style.formBotBtn}>Create a FormBot</button>
         </div>
    </div>
  )
}

export default Navbar