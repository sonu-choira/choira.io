import React from "react";
import style from "../studios/studio.module.css";

function CustomSelect({
  name,
  value,
  onChange,
  id,
  htmlFor,
  label,
  options,
  defaultOption,
  error,
  touched,

  disabled,
}) {
  return (
    <div className={style.customInput}>
      <label htmlFor={htmlFor}>{label}</label>

      <select
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
        className={disabled ? style.disabled : ""}
      >
        <option value="" disabled selected>
          {defaultOption}
        </option>
        {Array.isArray(options)
          ? options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : Object.keys(options).map((key) => (
              <option value={options[key]}>{key}</option>
            ))}
      </select>
      {error && touched ? <p className={style.error}>{error}</p> : null}
    </div>
  );
}

export default CustomSelect;
