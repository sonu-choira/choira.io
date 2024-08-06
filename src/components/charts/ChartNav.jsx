import React, { useState } from "react";
import Button from "../../pages/admin/layout/Button";

import style from "../../pages/admin/studios/studio.module.css";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import { min } from "moment";

function ChartNav({
  chartLogo,
  chartTitle,
  showBtnLoader,
  setFilterData = () => {},
}) {
  const [data, setdata] = useState("");

  const handelSelect = (event) => {
    setFilterData(event.target.value);
    setdata(event.target.value);
    // data = event.target.value;
  };


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


          {showBtnLoader ? (
            <Button
              name={"sonu"}
              style={{
                height: "40%",
                minWidth: "fit-content",
              }}
              showBtnLoader={showBtnLoader}
            />
          ) : (
            <select
              className={style.chartSelect}
              onChange={(event) => handelSelect(event)}
              value={data}
            >
              <option value={"year"}>Year</option>
              <option value={"month"}>month</option>
              <option value={"week"}>week</option>
            </select>
          )}

        </div>
      </div>
    </>
  );
}

export default ChartNav;
