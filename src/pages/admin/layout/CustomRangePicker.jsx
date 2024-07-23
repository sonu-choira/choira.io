import React from "react";
import style from "../studios/studio.module.css";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function CustomRangePicker({ name, value, onChange, id, htmlFor, label }) {
  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  console.log(value);

  if(value){

  }
  return (
    <div className={style.customInput}>
      <label htmlFor={htmlFor}>{label}</label>
      <RangePicker defaultValue={value} onChange={onChange} id={id} />
    </div>
  );
}

export default CustomRangePicker;
