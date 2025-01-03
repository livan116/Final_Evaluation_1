import React, { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "./Settings.module.css"; // Importing the CSS module

const Settings = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [settingData, setSettingData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();


  useEffect(() => {
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
      setSettingData({
        name: user.name,
        email: user.email,
        oldPassword: "",
        newPassword: "",
      });
    }
    catch (error) {
      console.error("Failed to fetch user data", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingData({ ...settingData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    if (settingData.name) updatedFields.name = settingData.name;
    if (settingData.email) updatedFields.email = settingData.email;
    if (settingData.oldPassword && settingData.newPassword) {
      if (settingData.oldPassword === settingData.newPassword) {
        toast.error("New password cannot be the same as the old password", {
          position: "top-right",
        });
        return;
      }
      updatedFields.oldPassword = settingData.oldPassword;
      updatedFields.newPassword = settingData.newPassword;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/updateUser",
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(updatedFields)
      console.log(response.data);
      toast.success("Profile updated successfully!", {
        position: "top-right",
      });

      // If email is updated, logout user
      if (updatedFields.email) {
        handlelogout();
      }
    }
    catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile", {
        position: "top-right",
      });
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successful", {
      position: "top-right",
    });
  };
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <h1 className={styles.title}>Settings</h1>
        <form className={styles.settingsForm} onSubmit={handleUpdate}>
          <div className={styles.inputWrapper}>
            <i className={`fas fa-user ${styles.icon}`}></i>
            <input className={styles.input} type="text" placeholder="Name" name="name" value={settingData.name}  onChange={handleChange}/>
          </div>

          <div className={styles.inputWrapper}>
            <i className={`fas fa-lock ${styles.icon}`}></i>
            <input
              className={styles.input}
              type={showEmail ? "text" : "password"}
              placeholder="Update Email"
              name="email" value={settingData.email}  onChange={handleChange}
            />
            <i
              className={`fas fa-eye ${styles.toggleIcon}`}
              onClick={() => setShowEmail(!showEmail)}
            ></i>
          </div>

          <div className={styles.inputWrapper}>
            <i className={`fas fa-lock ${styles.icon}`}></i>
            <input
              className={styles.input}
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              name="oldPassword" value={settingData.oldPassword}  onChange={handleChange}
            />
            <i
              className={`fas fa-eye ${styles.toggleIcon}`}
              onClick={() => setShowOldPassword(!showOldPassword)}
            ></i>
          </div>

          <div className={styles.inputWrapper}>
            <i className={`fas fa-lock ${styles.icon}`}></i>
            <input
              className={styles.input}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword" value={settingData.newPassword}  onChange={handleChange}
            />
            <i
              className={`fas fa-eye ${styles.toggleIcon}`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            ></i>
          </div>

          <button className={styles.updateButton} type="submit">Update</button>
        </form>
      </div>
      <div className={styles.logout}>
        <button className={styles.logoutBtn}><i className="fa-solid fa-arrow-right-from-bracket"></i>Log out</button>
      </div>
    </div>
  );
};

export default Settings;
