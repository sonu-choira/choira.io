import React from "react";
import style from "../../../admin/studios/studio.module.css";
import Button from "../Button";

function CheckboxFilter({ data, cusstyle }) {
  // Array of city names

  return (
    <>
      <div className={style.filteractionBox2} style={cusstyle}>
        <div>
          <input type="text" placeholder="Search for Region" />
        </div>
        {/* Map through the cities array to generate checkboxes */}
        {data.map((data, index) => (
          <div key={index} className={style.fltercheckboxdiv}>
            <input type="checkbox" name={data} id={data} />
            <label htmlFor={data}>{data}</label>
          </div>
        ))}
        <div
          style={{ justifyContent: "space-around" }}
          className={style.topborder}
        >
          <p>reset </p>
          <Button name={"ok"} />
        </div>
      </div>
    </>
  );
}

export default CheckboxFilter;
