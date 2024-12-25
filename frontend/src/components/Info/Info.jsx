import React from 'react'
import style from "./Info.module.css"
import first from "../../assets/firstpart.png"
import second from "../../assets/secondpart.png"

const Info = () => {
  return (
    <div className={style.containerInfo}>
        <div className={style.firstInfo}>
            <img src={first} alt="" />
            <div className={style.firstPart}>
                <h1>Easy building
                experience</h1>
                <p>All you have to do is drag and
drop blocks to create your app.
Even if you have custom needs,
you can always add custom
code.</p>
            </div>
        </div>
        <div className={style.secondInfo}>
        
        <div className={style.firstPart}>
            <h1>Embed it in a click</h1>
            <p>Embedding your typebot in
your applications is a walk in
the park. Typebot gives you
several step-by-step platform-
specific instructions. Your
typebot will always feel "native".</p>
        </div>
        <img src={second} alt="" />
        </div>
    </div>
  )
}

export default Info