import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ type, onDelete }) => {
  return (
    <div className={styles.inputField}>
      <span className={styles.fieldType}>{type}</span>
      <button className={styles.deleteButton} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default InputField;
