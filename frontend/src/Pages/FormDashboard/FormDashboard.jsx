import React, { useEffect, useState } from "react";
import style from "./FormDashboard.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const FormDashboard = () => {
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [bool3, setBool3] = useState(false);
  const [bool4, setBool4] = useState(false);

  const [ind, setInd] = useState(null);
  const [forms, setForms] = useState([]);
  const [name, setName] = useState();
  const [folderName, setFolderName] = useState([]);

  const folderId = localStorage.getItem("folderId");
  const formId = localStorage.getItem("formId");
  const navigate = useNavigate();

  console.log(folderId);

  const handleFolderName = (e) => {
    setName(e.target.value);
  };

  const handleConfirm = (index) => {
    localStorage.setItem("folderId", index);
    setInd(index);
    setBool3(!bool3);
  };

  const handleFormConfirm = (index) => {
    localStorage.setItem("formId", index);
    setInd(index);
    setBool4(!bool4);
  };

  // useEffect(() => {
  //   fetchFolders();
  // }, []);

  const click = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/folders/folder/${folderId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Remove deleted folder from the list
      setFolderName(folderName.filter((folder) => folder._id !== folderId));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
    setInd(null);
    setBool3(!bool3);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setInd(null);
    setBool3(!bool3);
  };
  const handleFormCancel = (e) => {
    e.preventDefault();
    setInd(null);
    setBool4(!bool4);
  };

  const handleDone = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (!name) return;
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/folders/create-folder",
        { name: name },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
  
      setFolderName([...folderName, response.data]); // Update the folder list
      fetchFolders();
      setName(""); // Clear the input field
      setBool2(false); // Close the modal after submission
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };
  

  console.log("folderName", folderName);

  const fetchFolders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/folders/folders/:id",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setFolderName(response.data.output); // Update the state with fetched folders
  } catch (error) {
    console.error("Error fetching folders:", error);
  }
};

useEffect(() => {
  fetchFolders(); // Fetch folders when component mounts
}, []);


  // console.log(fetchFolders())

  //get fomrs

  const handlegetForms = async (id) => {
    console.log(id);
    localStorage.setItem("folderId", id);
    console.log(localStorage.getItem("folderId"));
    try {
      const response = await axios.get(
        `http://localhost:5000/api/forms/${id}/forms`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setForms(response.data.forms);
      console.log(forms);
      if (response.data.forms.length > 0) {
        localStorage.setItem("formId", response.data.forms[0]._id);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  // handle delete form

  const handleDeleteForm = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/forms/form/${formId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Remove deleted form from the list
      setForms(forms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleFormId = (id) => {
    localStorage.setItem("formId", id);
    navigate(`/workspace`);
  };

  const handleFormCreate = async () => {
    localStorage.setItem("folderId", folderId);
    navigate("/workspace")
  }

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
                <button
                  className={style.fName}
                  key={index}
                  onClick={() => handlegetForms(item._id)}
                >
                  {item.name}
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleConfirm(item._id)}
                  ></i>
                </button>
              ))}
            </div>

            <div className={style.createTypeBot}>
              <button className={style.createBotBtn} onClick={handleFormCreate}>
                <p className={style.plus}>+</p>
                <p className={style.plusText}>Create a typebot</p>
              </button>
              {forms.map((item, index) => (
                <button className={style.formNameBtn} key={index} onClick={()=>handleFormId(item._id)}>
                  {item.name}
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleFormConfirm(item._id)}
                  ></i>
                </button>
              ))}
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
                  <div className={style.shareText}>Invite by Link</div>
                </label>
                <button type="submit" className={style.sendBtn}>
                  Copy Link
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
            <div className={style.modalTwo} onClick={(e) => e.stopPropagation()}>
              <form
                className={style.createFolderForm}
                onSubmit={handleDone}
              
              >
                <div className="createFolderName">
                  <label htmlFor="">Create New Folder</label>
                </div>
                <input
                  type="text"
                  className={style.inputShare}
                  value={name}
                  required
                  onChange={handleFolderName}
                  placeholder="Enter folder name"
                />
                <div className={style.buttons}>
                  <button className={style.doneBtn} type="submit">
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
                  <button className={style.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* bool 4 */}
        {bool4 && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool4(false);
            }}
          >
            <div className={style.modalTwo}>
              <form
                className={style.createFolderForm}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={style.createFolderName}>
                  <label htmlFor="">
                    Are you sure you want to delete this form ?
                  </label>
                </div>
                <div className={style.buttons}>
                  <button className={style.doneBtn} onClick={handleDeleteForm}>
                    Confirm
                  </button>
                  <div className={style.div}>|</div>
                  <button className={style.cancelBtn} onClick={handleFormCancel}>
                    Cancel
                  </button>
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
