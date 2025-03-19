import React from "react";
import { useNavigate } from "react-router-dom";
import Responses from "../../components/Responses/Response";
import style from "./ResponsePage.module.css";

const ResponsePage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <button className={style.backButton} onClick={handleBack}>
          &larr; Back to Forms
        </button>
      </div>
      <Responses />
    </div>
  );
};

export default ResponsePage;