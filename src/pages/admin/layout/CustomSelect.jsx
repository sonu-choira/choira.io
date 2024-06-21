import React from "react";
import style from "../studios/studio.module.css";

function CustomSelect({
  type,
  placeholder,
  name,
  value,
  onChange,
  id,
  htmlFor,
  label,
  options,
  data,
}) {
  return (
    <div className={style.customInput}>
      <label htmlFor={htmlFor}>Max Guests</label>

      <select id={id}>
        <option>Select Maximum Guest allowed</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  );
}

export default CustomSelect;
