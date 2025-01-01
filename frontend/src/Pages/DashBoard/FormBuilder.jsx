import React, { useState } from 'react';
import styles from './FormBuilder.module.css';

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);

  const bubbles = [
    { label: 'Text', type: 'text', icon: '📝' },
    { label: 'Image', type: 'image', icon: '🖼️' },
    { label: 'Video', type: 'video', icon: '🎥' },
    { label: 'GIF', type: 'gif', icon: '🎞️' },
  ];

  const inputs = [
    { label: 'Text', type: 'input_text', icon: '🔤' },
    { label: 'Number', type: 'input_number', icon: '🔢' },
    { label: 'Email', type: 'input_email', icon: '📧' },
    { label: 'Phone', type: 'input_phone', icon: '📞' },
    { label: 'Date', type: 'input_date', icon: '📅' },
    { label: 'Rating', type: 'input_rating', icon: '⭐' },
    { label: 'Button', type: 'input_button', icon: '✅' },
  ];

  const addField = (field) => {
    setFormFields([...formFields, { ...field, value: '' }]);
  };

  const handleInputChange = (index, value) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = value;
    setFormFields(updatedFields);
  };

  return (
    <div className={styles.builderContainer}>
    <header className={styles.header}>
        <h1 className={styles.title}>Form Builder</h1>
        <div className={styles.actions}>
          <button className={styles.button}>
            Share
          </button>
          <button className={`${styles.button} ${styles.primary}`}>
            Save
          </button>
        </div>
      </header>
      <div className={styles.sidebar}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Bubbles</h3>
          {bubbles.map((bubble, index) => (
            <button
              key={index}
              className={`${styles.fieldButton} ${styles.bubbleButton}`}
              onClick={() => addField(bubble)}
            >
              <span className={styles.icon}>{bubble.icon}</span> {bubble.label}
            </button>
          ))}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Inputs</h3>
          {inputs.map((input, index) => (
            <button
              key={index}
              className={styles.fieldButton}
              onClick={() => addField(input)}
            >
              <span className={styles.icon}>{input.icon}</span> {input.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formArea}>
        {formFields.map((field, index) => (
          <div key={index} className={styles.formField}>
            <span className={styles.icon}>{field.icon}</span> {field.label}
            <input
              type={field.type.includes('input') ? 'text' : 'url'} // Text input for fields, URL input for images, video, etc.
              className={styles.fieldInput}
              value={field.value}
              placeholder={`Enter ${field.label} here`}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <button
              className={styles.deleteButton}
              onClick={() => {
                const newFields = [...formFields];
                newFields.splice(index, 1);
                setFormFields(newFields);
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;
