import React, { useState } from "react";
import style from "./FormDashboard.module.css";
const FormDashboard = () => {
  const [bool, setBool] = useState(false);
  return (
    <div className={style.FormDashboard}>
      <div className={style.navbar}>
        <div className={style.nav}>
          <div className={style.workName}>
            <select name="workspaceName" id="workspaceName">
              <option value="">Livan Kumar worksapce</option>
              <option value="settings">settings</option>
              <option value="logout" className={style.logout}>
                Logout
              </option>
            </select>
          </div>
          <div className={style.navend}>
            <label className={style.switch}>
              Light
              <input type="checkbox" />
              <span className={`${style.slider} ${style.round}`}></span>
              Dark
            </label>
            <button onClick={()=>setBool(true)}>share</button>

          </div>
        </div>
      </div>
      <hr />

      <div className={style.container}>
        <div className={style.createBot}>
          <div className={style.createFolder}>
            <div className={style.createFolderBtn}>
              <button>
                <i className="fa-solid fa-folder-plus"></i>Create a folder
              </button>
            </div>

            <div className={style.createTypeBot}>
              <button className={style.createBotBtn}>
                <p className={style.plus}>+</p>
                <p className={style.plusText}>Create a typebot</p>
              </button>
            </div>
          </div>
        </div>

        {bool && (
          <div className={style.shareModal} onClick={()=>{setBool(false)}}>
            <div className={style.modal } >
              <form className={style.shareForm} onClick={(e)=>e.stopPropagation()}>
                <div className={style.exitForm}>
                  <button onClick={()=>{setBool(false)}}>x</button>
                </div>
                <div className={style.email}>
                  <span className={style.shareText}>Invite by Email</span>
                  <div className={style.editText}>
                    <select name="editandview" id="">
                      <option value="edit">edit</option>
                      <option value="view">view</option>
                    </select>
                  </div>
                </div>
                <input
                  className={style.inputShare}
                  type="email"
                  required
                  placeholder="Enter email id"
                />
                <button type="submit" className={style.sendBtn}>
                  Send Invite
                </button>
                <label htmlFor="">
                  <div className={style.shareText}>Invite by Email</div>
                </label>
                <button type="submit" className={style.sendBtn}>
                  Send Invite
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDashboard;
