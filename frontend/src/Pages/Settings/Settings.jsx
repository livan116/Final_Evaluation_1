import React, { useState } from "react";
import styles from "./Settings.module.css"; // Importing the CSS module

const Settings = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <h1 className={styles.title}>Settings</h1>
        <form className={styles.settingsForm}>
          <div className={styles.inputWrapper}>
            <i className={`fas fa-user ${styles.icon}`}></i>
            <input className={styles.input} type="text" placeholder="Name" />
          </div>

          <div className={styles.inputWrapper}>
            <i className={`fas fa-lock ${styles.icon}`}></i>
            <input
              className={styles.input}
              type={showEmail ? "text" : "password"}
              placeholder="Update Email"
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
            />
            <i
              className={`fas fa-eye ${styles.toggleIcon}`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            ></i>
          </div>

          <button className={styles.updateButton}>Update</button>
        </form>
      </div>
      <div className={styles.logout}>
        <button className={styles.logoutBtn}><i className="fa-solid fa-arrow-right-from-bracket"></i>Log out</button>
      </div>
    </div>
  );
};

export default Settings;
