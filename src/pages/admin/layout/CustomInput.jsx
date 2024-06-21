import React from "react";
import style from "../studios/studio.module.css";

function CustomInput({
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
    <div className={style.customInput}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
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

export default CustomInput;
