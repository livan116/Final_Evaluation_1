import React from 'react'
import style from './workSpace.module.css'
import NavHead from '../NavHead/NavHead'
const WorkSpace = () => {
  return (
    <div className={style.workspaceContainer}>
    <div className={style.navbar}><NavHead/></div>
    <hr />
    </div>
  )
}

export default WorkSpace