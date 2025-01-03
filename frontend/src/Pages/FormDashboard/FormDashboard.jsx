import React, { useEffect, useState } from "react";
import style from "./FormDashboard.module.css";
import { toast } from "react-hot-toast";
import { useTheme } from "../../Context/ThemeContext";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FormDashboard = () => {
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [bool3, setBool3] = useState(false);
  const [bool4, setBool4] = useState(false);

  const [ind, setInd] = useState(null);
    const [username,setUsername] = useState("");
  const [forms, setForms] = useState([]);
  const [name, setName] = useState();
  const [fId,setFolderId] = useState(null);
  const [formid,setFormid] = useState(null);
  const [folderName, setFolderName] = useState([]);

 
  let {folderId,formId} = useParams()
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();


  const handleFolderName = (e) => {
    setName(e.target.value);
  };

  const handleConfirm = (index) => {
    // localStorage.setItem("folderId", index);
    setFolderId(index);
    setInd(index);
    setBool3(!bool3);
  };

  const handleFormConfirm = (index) => {
    // localStorage.setItem("formId", index);
    setFormid(index);
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
        `http://localhost:5000/api/folders/folder/${fId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Remove deleted folder from the list
      setFolderName(folderName.filter((folder) => folder._id !== fId));
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
    console.log("Folders:", response.data.output); // Log the fetched folders
    setFolderName(response.data.output); // Update the state with fetched folders
  } catch (error) {
    console.error("Error fetching folders:", error);
  }
};

useEffect(() => {
  fetchFolders(); // Fetch folders when component mounts
  fetchUser();
}, []);

const fetchUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/getUser",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    const user = response.data.user;
    setUsername(user.name);
  }
  catch (error) {
    console.error("Failed to fetch user data", error);
  }
}


  // console.log(fetchFolders())

  //get fomrs

  const handlegetForms = async (id) => {
    setFolderId(id);
    console.log(folderId);
    // localStorage.setItem("folderId", id);
    // console.log(localStorage.getItem("folderId"));
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

    console.log("delete form");
    try {
      await axios.delete(
        `http://localhost:5000/api/forms/form/${formid}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Remove deleted form from the list
      setForms(forms.filter((form) => form._id !== formid));
      setBool4(!bool4)
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleFormId = (formId) => {
    // localStorage.setItem("formId", id);
    navigate(`/workspace/${fId}/${formId}`);
  };

  const handleFormCreate = async () => {
    console.log(folderId)
    // localStorage.setItem("folderId", folderId);
    navigate(`/workspace/${fId}/${formId}`)
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("folderId");
    localStorage.removeItem("formId");
    navigate("/login");
    toast.success("Logout successful", {
      position: "top-right",
    });
  };

  const handleSetting = (e) => {
    const option = e.target.value;
    if (option === "settings") {
      navigate(`/${option}`);
    } else {
      logout();
    }
  };

  return (
    <div className={style.FormDashboard}>
      <div className={style.navbar}>
        <div className={style.nav}>
          <div className={style.workName}>
            <select name="workspaceName" id="workspaceName" onChange={handleSetting}>
              <option value="">{username}'s worksapce</option>
              <option value="settings">settings</option>
              <option value="logout" className={style.logout}>
                Logout
              </option>
            </select>
          </div>
          <div className={style.navend}>
            <label className={style.switch}>
              Light
              <input type="checkbox" onChange={toggleTheme} checked={theme == "dark"}/>
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

                    onClick={(e) =>{ handleFormConfirm(item._id)
                      e.stopPropagation()}}
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
                  <button className={style.cancelBtn} onClick={()=>setBool2(!bool2)}>Cancel</button>
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
