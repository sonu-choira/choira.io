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
  onBlur,
  error,
  touched,
  disabled,
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
        onBlur={onBlur}
        className={disabled ? style.disabled : ""}
      />
      {error && touched ? <p className={style.error}>{error}</p> : null}
    </div>
  );
}

export default CustomInput;
