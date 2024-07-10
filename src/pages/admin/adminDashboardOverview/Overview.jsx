import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
// import "../studios/studios.css";
import style from "../studios/studio.module.css";
import t1 from "../../../assets/img/adminOverview/t1.png";
import t2 from "../../../assets/img/adminOverview/t2.png";
import t3 from "../../../assets/img/adminOverview/t3.png";
import t4 from "../../../assets/img/adminOverview/t4.png";
import DoughnutChart from "../../../components/charts/DoughnutChart";
import LineGraph from "../../../components/charts/LineGraph";
import BarGraph from "../../../components/charts/BarGraph";
import AreaGraph from "../../../components/charts/AreaGraph";
import SimpleLineChart from "../../../components/charts/SimpleLineChart";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import ThreeWaveChart from "../../../components/charts/ThreeWaveChart";

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

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("Overview")) {
      Swal.fire({
        title: "<strong>Under Development </strong>",
        icon: "info",
        html: `
         This Page is Under Development.
         The Data Of this Page is not Real.
        `,
        // showCloseButton: true,
        // showCancelButton: true,
        focusConfirm: false,

        confirmButtonAriaLabel: "Ok",
      });
    }
  }, []);
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

        <ThreeWaveChart />
        <div className={style.overviewPage2}>
          <div>
            <DoughnutChart />
          </div>
          <div>
            <LineGraph />
          </div>
        </div>
        <div className={style.overviewPage3}>
          <div>
            <BarGraph />
          </div>
          <div>
            <AreaGraph />
          </div>
        </div>
        <br />
        <br />
        <div className={style.overviewPage4}>
          <div>
            <SimpleLineChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
