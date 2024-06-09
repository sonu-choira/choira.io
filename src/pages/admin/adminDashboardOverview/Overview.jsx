import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
// import "../studios/studios.css";
import style from "../studios/studio.module.css";
import t1 from "../../../assets/img/adminOverview/t1.png";
import t2 from "../../../assets/img/adminOverview/t2.png";
import t3 from "../../../assets/img/adminOverview/t3.png";
import t4 from "../../../assets/img/adminOverview/t4.png";
import MyChart from "../../../components/charts/MyChart";
function Overview() {
  const data = [
    {
      title: "Users",
      count: 1259,
      active: 238,
      image: t1,
    },
    {
      title: "Booking",
      count: 1069,
      active: 5558,
      image: t2,
    },
    {
      title: "Studio",
      count: 1589,
      active: 1589,
      image: t3,
    },
    {
      title: "Project",
      count: 159,
      active: 38,
      image: t4,
    },
  ];
  return (
    <>
      <div className={style.overviewPage1}>
        <div className={style.overviewPageHeader}>
          {data.map((item, index) => (
            <div key={index} className={style.overviewTicketDiv}>
              <div>
                <h3>{item.title}</h3>
                <h2>{item.count}</h2>
                <u>
                  <small>Active : {item.active}</small>
                </u>
              </div>
              <div>
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          ))}
        </div>

        <MyChart />
        {/* <div className={style.overviewPage2}></div> */}
      </div>
    </>
  );
}

export default Overview;
