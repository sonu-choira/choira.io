import React from "react";
import Button from "../../pages/admin/layout/Button";

import style from "../../pages/admin/studios/studio.module.css";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";

function ChartNav({ chartLogo, chartTitle }) {
  return (
    <>
      <div className={style.chartNav}>
        <div>
          <div className={style.chartlogo}>
            {chartLogo ? chartLogo : <BsGraphUpArrow />}
          </div>
          <h3>{chartTitle ? chartTitle : "Chart"}</h3>
        </div>
        <div>
          <Button
            icon={<MdOutlineFileDownload />}
            name={"Export "}
            style={{
              height: "40%",
              border: "2px solid #FFAA00",
              backgroundColor: "white",
              gap: "2%",
            }}
          />

          <select className={style.chartSelect}>
            <option value={"year"}>Year</option>
            <option value={"month"}>month</option>
            <option value={"week"}>week</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default ChartNav;
