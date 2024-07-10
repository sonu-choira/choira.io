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
  error,
  touched,
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
      {error && touched ? <p className={style.error}>{error}</p> : null}
    </div>
  );
}

export default CustomTextArea;
