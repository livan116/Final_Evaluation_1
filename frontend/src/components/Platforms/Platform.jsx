import React from 'react'
import style from "./Platform.module.css";
import gmail from "./platform_imgs/email.png"
import cc from "./platform_imgs/CC.png"
import chain from "./platform_imgs/chain.png"
import cube from "./platform_imgs/cube.png"
import calendar from "./platform_imgs/calender.png"
import drive from "./platform_imgs/drive.png"
import mintra from "./platform_imgs/mintra.png"
import monkey from "./platform_imgs/monkey.png"
import notion from "./platform_imgs/notion.png"
import salesforce from "./platform_imgs/salesforce.png"
import shopify from "./platform_imgs/shopify.png"
import wix from "./platform_imgs/wix.png"
import wordpress from "./platform_imgs/wordpress.png"
import XL from "./platform_imgs/XL.png"
import zapier from "./platform_imgs/zapier.png"


const Platform = () => {
    console.log(gmail)
  return (
    <div className={style.platformContainer}>
        <div className={style.upper}>
        <div className={style.card}><img src={gmail} alt="gmail" /></div>
        <div className={style.card}><img src={monkey} alt="monkey" /></div>
        <div className={style.card}><img src={notion} alt="notion" /></div>
        <div className={style.card}><img src={wix} alt="wix" /></div>
        <div className={style.card}><img src={wordpress} alt="wordpress" /></div>
        <div className={style.card}><img src={calendar} alt="calendar" /></div>
        <div className={style.card}><img src={chain} alt="chain" /></div>
        <div className={style.card}><img src={drive} alt="drive" /></div>
        </div>
        <div className={style.lower}>
        <div className={style.card}><img src={mintra} alt="mintra" /></div>
        <div className={style.card}><img src={shopify} alt="shopify" /></div>
        <div className={style.card}><img src={cube} alt="cube" /></div>
        <div className={style.card}><img src={XL} alt="XL" /></div>
        <div className={style.card}><img src={zapier} alt="zapier" /></div>
        <div className={style.card}><img src={cc} alt="cc" /></div>
        <div className={style.card}><img src={salesforce} alt="salesforce" /></div>
        </div>
        <div className={style.platformText}>
            <h1>Integrate with any platform</h1>
            <p>Typebot offers several native integrations blocks as well as instructions on
            how to embed typebot on particular platforms</p>
        </div>
    </div>
  )
}

export default Platform