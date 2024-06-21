import React from "react";
import style from "../studios/studio.module.css";

function CustomTextArea({
  type,
  placeholder,
  name,
  value,
  onChange,
  id,
  htmlFor,
  label,
}) {
  return (
    <div className={style.addNewStudioinputBox2}>
      <label htmlFor={htmlFor}>{label}</label>
      <textarea
        type={type || "text"}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
}

export default CustomTextArea;
