import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./ChatBot.module.css";
import bot from "../../assets/profile-bot.png";
import send from "../../assets/send.png";
import axios from "axios";

const ChatbotForm = () => {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]); // Store chat history
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [currentValue, setCurrentValue] = useState(""); // To store current input value

  const { linkId } = useParams();
  const apiUrl = import.meta.env.VITE_API_URI;

  useEffect(() => {
    let didCancel = false;
  
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/forms/share/${linkId}`
        );
        if (!didCancel && response.data.success) {
          setForm(response.data.form);
        } else if (!didCancel) {
          alert("Form not found");
        }
      } catch (error) {
        if (!didCancel) {
          console.error("Error fetching form data:", error);
        }
      }
    };
  
    fetchFormData();
  
    return () => {
      didCancel = true; // Cancel the API call on unmount
    };
  }, [linkId]);
  
  // Function to handle bubble field progression
  const handleBubbleResponse = () => {
    const currentField = form.fields[currentFieldIndex];
    const newResponse = {
      label: currentField.label,
      value: currentField.value, // Changed from 'answer' to 'value' to match controller expectations
      type: "bubble", // Mark it as a bubble
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    // Check if it's the last field and mark as completed
    if (currentFieldIndex === form.fields.length - 1) {
      setFormCompleted(true);
      submitForm(updatedResponses); // Save responses to the backend
    } else {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  };

  // Function to handle input field submission
  const handleInputSubmit = async (value) => {
    if (!value.trim()) {
      alert("Please enter a valid response");
      return;
    }

    const currentField = form.fields[currentFieldIndex];
    const newResponse = {
      label: currentField.label,
      value: value, // Changed from 'answer' to 'value' to match controller expectations
      type: "input", // Mark it as an input
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses); // Update responses state

    // Check if it's the last field and mark as completed
    if (currentFieldIndex === form.fields.length - 1) {
      setFormCompleted(true); // Form completed
      await submitForm(updatedResponses); // Pass the updated responses array
    } else {
      setCurrentFieldIndex(currentFieldIndex + 1); // Move to the next field
    }
  };

  // Submit form data to backend
  const submitForm = async (finalResponses) => {
    try {
      // Format responses to match backend expectations
      const formattedResponses = finalResponses.map(response => ({
        label: response.label,
        value: response.value // Controller expects 'value' not 'answer'
      }));

      const response = await axios.post(
        `${apiUrl}/api/forms/save-response`,
        {
          formId: form._id,
          responses: formattedResponses
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        console.log("Form responses submitted successfully");
      } else {
        console.error("Error submitting form responses:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form responses:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  useEffect(() => {
    if (form && form.fields.length > 0) {
      const currentField = form.fields[currentFieldIndex];

      // If it's a bubble field, proceed to the next one automatically after a short delay
      if (currentField.type === "bubble") {
        setTimeout(() => {
          handleBubbleResponse();
        }, 1000); // Delay before moving to the next bubble field
      }
    }
  }, [currentFieldIndex, form]);

  if (!form) {
    return <div>Loading form...</div>;
  }

  const currentField = form.fields[currentFieldIndex];

  return (
    <div className={style.container}>
      <div className={style.chatContainer}>
        <h2>{form.name}</h2>
        <div className={style.chatBox}>
          {/* Render all previous responses as a chat */}
          {responses.map((response, index) => (
            <div className={style.Chat} key={index} style={{ marginBottom: "10px" }}>
              {response.type === "bubble" ? (
                <div className={style.bubbleDiv}>
                  <img src={bot} alt="bot" className={style.botImg} />
                  <button className={style.bubbleStyle}>{response.value}</button>
                </div>
              ) : (
                <div className={style.inputDiv}>
                  <button className={style.inputStyle}>{response.value}</button>
                </div>
              )}
            </div>
          ))}

          {/* Render the current field based on its type */}
          {!formCompleted && currentField && currentField.type === "bubble" ? (
            <div className={style.bubbleDiv}>
              <img src={bot} alt="bot" className={style.botImg} />
              <button className={style.bubbleStyle}>{currentField.label}: {currentField.value}</button>
            </div>
          ) : null}
        </div>

        {/* Input field for user response */}
        {!formCompleted && currentField && currentField.type === "input" && (
          <div className={style.inputSend}>
            <input
              type={currentField.inputType || "text"}
              placeholder={`Enter your ${currentField.label.toLowerCase()}`}
              style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentValue.trim()) {
                  handleInputSubmit(currentValue);
                  setCurrentValue(""); // Clear input field after submission
                }
              }}
            />
            <button
              onClick={() => {
                if (currentValue.trim()) {
                  handleInputSubmit(currentValue);
                  setCurrentValue(""); // Clear input field after submission
                }
              }}
            >
              <img src={send} alt="send" />
            </button>
          </div>
        )}

        {formCompleted && (
          <div style={{ marginTop: "20px" }}>
            <h3>Thank you for filling out the form!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotForm;