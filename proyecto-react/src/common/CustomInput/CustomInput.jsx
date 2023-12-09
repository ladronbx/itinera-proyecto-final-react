import React from 'react';
import './CustomInput.css';

export const CustomInput = ({ inputStyle, type, name, placeholder, functionProp, functionBlur }) => {
  return (
    <input
      className={`custom-input ${inputStyle}`}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) => functionProp(e)}
      onBlur={(e) => functionBlur(e)}
    />
  );
};