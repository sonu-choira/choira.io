import React from "react";
import style from "../../../admin/studios/studio.module.css";
import Button from "../Button";

function PriceFilter() {
  return (
    <>
      <div className={style.filteractionBox}>
        <div>Price Range</div>
        <div className={style.topborder}>
          <p>start Price</p>
          <input type="text" placeholder="₹" />
        </div>
        <div>
          <p>End Price</p>
          <input type="text" placeholder="₹" />
        </div>
        <div className={style.topborder}>
          <p>reset </p>
          <Button name={"ok"} />
        </div>
      </div>
    </>
  );
}

export default PriceFilter;
