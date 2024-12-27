import React, { useState } from "react";
import style from "./FormDashboard.module.css";
import { set } from "mongoose";
const FormDashboard = () => {
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [bool3, setBool3] = useState(false);

  const [ind, setInd] = useState(null);
  const [name, setName] = useState();
  const [folderName, setFolderName] = useState([]);

  const handleFolderName = (e) => {
    setName(e.target.value);
  };

  const handleConfirm = (index) => {
    setInd(index);
    setBool3(!bool3);
  };

  const click = (e) => {
    e.preventDefault()
    if (ind !== null) {
      const updatedFolders = folderName.filter((_, i) => i !== ind);
      console.log(updatedFolders);
      setFolderName(updatedFolders);
      setInd(null);
    }
   setBool3(!bool3)
  };

  const handleCancel = () =>{
    setInd(null);
    setBool3(!bool3);
  }


  const handleDone = (e) => {
    e.preventDefault();
    setFolderName([...folderName, name]);
    setBool2(!bool2);
    setName("");
  };

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
            <button onClick={() => setBool(true)}>share</button>
          </div>
        </div>
      </div>
      <hr />
      <div className={style.container}>
        <div className={style.createBot}>
          <div className={style.createFolder}>
            <div className={style.createFolderBtn}>
              <button className={style.newBtn} onClick={() => setBool2(!bool2)}>
                <i className="fa-solid fa-folder-plus"></i>Create a folder
              </button>

              {folderName.map((item, index) => (
                <button className={style.fName} key={index}>
                  {item}
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleConfirm(index)
                    }
                  ></i>
                </button>
              ))}
            </div>

            <div className={style.createTypeBot}>
              <button className={style.createBotBtn}>
                <p className={style.plus}>+</p>
                <p className={style.plusText}>Create a typebot</p>
              </button>
            </div>
          </div>
        </div>
        {/* modal 1 */}
        {bool && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool(false);
            }}
          >
            <div className={style.modal}>
              <form
                className={style.shareForm}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={style.exitForm}>
                  <button
                    onClick={() => {
                      setBool(false);
                    }}
                  >
                    x
                  </button>
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
        {/* modal 2 */}
        {bool2 && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool2(false);
            }}
          >
            <div className={style.modalTwo}>
              <form
                className={style.createFolderForm}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="createFolderName">
                  <label htmlFor="">Create New Folder</label>
                </div>
                <input
                  type="text"
                  className={style.inputShare}
                  value={name}
                  onChange={handleFolderName}
                  placeholder="Enter folder name"
                />
                <div className={style.buttons}>
                  <button className={style.doneBtn} onClick={handleDone}>
                    Done
                  </button>
                  <div className={style.div}>|</div>
                  <button className={style.cancelBtn}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* modal 3 */}
        {bool3 && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool3(false);
            }}
          >
            <div className={style.modalTwo}>
              <form
                className={style.createFolderForm}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={style.createFolderName}>
                  <label htmlFor="">
                    Are you sure you want to delete this folder ?
                  </label>
                </div>
                <div className={style.buttons}>
                  <button className={style.doneBtn} onClick={click}>
                    Confirm
                  </button>
                  <div className={style.div}>|</div>
                  <button className={style.cancelBtn} onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDashboard;
