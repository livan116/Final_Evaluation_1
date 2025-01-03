import React from 'react'
import style from "./Navbar.module.css"
import logo from "../../assets/logo.png"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className={style.nav}>
        <div className={style.logoHead}>
        <img src={logo} alt="" />
        <h3>FormBot</h3>
         </div>
         <div className={style.signin}>
            <button className={style.signinBtn} onClick={()=>navigate('/register')}>Sign in</button>
            <button className={style.formBotBtn}>Create a FormBot</button>
         </div>
    </div>
  )
}

export default Navbar