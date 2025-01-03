import React, { useState, useEffect } from "react";
import axios from "axios";

import style from "./workSpace.module.css";
import { useNavigate } from "react-router-dom";
import NavHead from "../NavHead/NavHead";
import { useTheme } from "../../Context/ThemeContext";
import Responses from "../Responses/Responses";
import { useParams } from "react-router-dom";
const WorkSpace = () => {
  const [fields, setFields] = useState([]);
  const [formResponse, setFormResponse] = useState([]);
  const [formName, setFormName] = useState("");
  const [fId,setformId] = useState(null);

  const [workBool,setWorkBool] = useState(true);
  const {folderId,formId} = useParams();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  // Fetch form data when the component mounts
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        if (formId) {
          const response = await axios.get(
            `http://localhost:5000/api/forms/form/${formId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("Form data:", response.data.form);
          if (response.data.success) {
            const form = response.data.form;
            setFormName(form.name); // Set form name
            setFields(form.fields); // Set the form fields (bubbles and inputs)
            setFormResponse([response.data.form])
          }
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, [formId]); // Only fetch data once when formId changes or component mounts

  

 // Get formId from localStorage or from URL parameters
  const saveForm = async () => {
    console.log("Folder ID:", formId);
    if (!formId) {
      updateForm(); // Update the form if formId is present
    } else {
      try {
        // const selectedFolderId = localStorage.getItem("folderId"); // Retrieve the folder ID from localStorage
        // console.log("Folder ID:", folderId);
        const response = await axios.post(
          `http://localhost:5000/api/folders/create-form-bot`, // PUT request to update the form by formId
          {
            folderId:folderId,
            formBotName: formName, // Form name
            fields: fields, // Updated fields (contains both bubbles and inputs)
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        // localStorage.setItem("formId", response.data.formBot._id);
        console.log("Form saved:", response.data.formBot._id);
        setformId(response.data.formBot._id);
        console.log("Form saved:", response.data.formBot._id);
        if (response.data.success) {
          alert("Form saved successfully!");
        }
      } catch (error) {
        console.error("Error updating form:", error);
      }
    }
  };

  // Handle saving the updated form data
  const updateForm = async () => {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/forms/form/${formId}`, // PUT request to update the form by formId
            {
                folderId: folderId, // folder where formbot should be update
                name : formName, // Form name
                fields: fields, // Updated fields (contains both bubbles and inputs)
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );

        if (response.data.success) {
            alert("Form updated successfully!");
        }
    }
    catch (error) {
        console.error("Error updating form:", error);
        alert("Error updating form");
    }
};

  const handleChange = (e) => {
    const name = e.target.value;
    setFormName(name);
    console.log(name);
  }

  // Handle adding a bubble
  const addBubble = (type) => {
    const newField = {
      label: `${type} Bubble`,
      type: "bubble",
      sequence: fields.length + 1,
      prefilled: true, // Bubble will have prefilled data
      value: "", // Editable for the form creator
    };
    setFields([...fields, newField]);
  };

  // Handle adding an input field
  const addInput = (inputType) => {
    const newField = {
      label: `${inputType.charAt(0).toUpperCase() + inputType.slice(1)} Input`,
      type: "input",
      inputType: inputType,
      sequence: fields.length + 1,
      value: "", // Editable input field for user
    };
    setFields([...fields, newField]);
  };

  // Handle updating field value for both bubble and input fields
  const handleFieldChange = (index, newValue) => {
    const updatedFields = [...fields];
    updatedFields[index].value = newValue; // Update the value in state
    setFields(updatedFields);
  };
  

  // Handle generating a shareable link
  const shareForm = async () => {
    console.log("hello");
    console.log(fId);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/forms/share/${formId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Form link:", response.data.linkId);
      // localStorage.setItem("formId",formId);
      localStorage.setItem("linkId", response.data.linkId);
      const link = `http://localhost:5173/formbot/${response.data.linkId}`;
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard: ' + link);

      alert("Form link generated!");
    } catch (error) {
      console.error("Error sharing form:", error);
    }
  };

  const deleteField = (index) => {
    const updatedFields = fields.filter(
      (_, fieldIndex) => fieldIndex !== index
    );
    setFields(updatedFields);
  };

  return (
    <div className={style.workspaceContainer}>
      <div className={style.navContainer}>
      <div className={style.formName}>
        <input type="text" placeholder="Enter Form Name" value={formName} onChange={handleChange}/>
      </div>
      <div className={style.flowContainer}>
        <button className={style.flow} onClick={()=>setWorkBool(true)}>Flow</button>
        <button className={style.response} onClick={()=>setWorkBool(false)}>Response</button>
      </div>
      <div className={style.saveConatiner}>
        <label className={style.switch}>
          Light
          <input type="checkbox" onChange={toggleTheme} checked={theme == "dark"}/>
          <span className={`${style.slider} ${style.round}`}></span>
          Dark
        </label>
        <div className={style.navbtns}>
        <button className={style.shareBtn} onClick={shareForm}>share</button>
        <button className={style.saveBtn} onClick={saveForm}>save</button>
        <button className={style.crossBtn} onClick={()=>navigate('/form-dashboard')}>X</button>
        </div>
      </div>
    </div>
      <hr />

      {/* Left Sidebar for Bubbles and Input Fields */}
      {workBool ? (<div className={style.workspaceSection}>
      <div className={style.sidebar}>
        <div className={style.bubbles}>
          <h3>Bubbles</h3>
          <div className={style.bubbleButtons}>
            <button onClick={() => addBubble("Text")}>Text Bubble</button>
            <button onClick={() => addBubble("Image")}>Image Bubble</button>
            <button onClick={() => addBubble("Video")}>Video Bubble</button>
            <button onClick={() => addBubble("GIF")}>GIF Bubble</button>
          </div>
        </div>

        <div className={style.inputFields}>
          <h3>Input Fields</h3>
          <div className={style.inputButtons}>
            <button onClick={() => addInput("text")}>Text Input</button>
            <button onClick={() => addInput("email")}>Email Input</button>
            <button onClick={() => addInput("number")}>Number Input</button>
            <button onClick={() => addInput("date")}>Date Input</button>
            <button onClick={() => addInput("date")}>Date Input</button>
            <button onClick={() => addInput("date")}>Date Input</button>
            <button onClick={() => addInput("date")}>Date Input</button>
          </div>
        </div>
      </div>

      {/* Form Workspace where bubbles and input fields are displayed */}
      <div className={style.formWorkspace}>
        <div className={style.startForm}>
        <i className="fa-solid fa-flag"></i>
          <label>start</label>
        </div>
        {fields.map((field, index) => (
          <div key={index} className={style.formField}>
          <div className={style.deleteField}> <i
                    className="fa-solid fa-trash-can"
                    onClick={() => deleteField(index)}
                  ></i></div>
            <label>{field.label}</label>
            {field.type === "input" ? (
              <input
                type={field.inputType}
                placeholder={`Enter ${field.inputType}`}
                value={field.value}
                onChange={(e) => handleFieldChange(index, e.target.value)}
              />
            ) : (
              <input
                type="text"
                placeholder="Enter bubble data"
                value={field.value}
                onChange={(e) => handleFieldChange(index, e.target.value)}
              />
            )}
            {/* Add Delete Button */}
           
          </div>
        ))}
      </div>
      </div>):(<Responses forms={formResponse}/>)}
    </div>
  );

  // return (
  //
  // )
};

export default WorkSpace;
