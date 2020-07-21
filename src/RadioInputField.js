import React from 'react';

function RadioInputField({ checked, id, groupName, labelText, onChange }) {
  return (
    <>
      <input
        checked={checked}
        id={id}
        name={groupName}
        onChange={onChange}
        type="radio"
      />
      <label htmlFor={id}>{labelText}</label>
    </>
  )
} 

export default RadioInputField;