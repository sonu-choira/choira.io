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
        {options?.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
