import React from "react";
import style from "./NavHead.module.css";
const NavHead = () => {
  return (
    <div className={style.navContainer}>
      <div className={style.formName}>
        <input type="text" placeholder="Enter Form Name" />
      </div>
      <div className={style.flowContainer}>
        <button className={style.flow}>Flow</button>
        <button className={style.response}>Response</button>
      </div>
      <div className={style.saveConatiner}>
        <label className={style.switch}>
          Light
          <input type="checkbox" />
          <span className={`${style.slider} ${style.round}`}></span>
          Dark
        </label>
        <div className={style.navbtns}>
        <button className={style.shareBtn}>share</button>
        <button className={style.saveBtn}>save</button>
        <button className={style.crossBtn}>X</button>
        </div>
      </div>
    </div>
  );
};

export default NavHead;
