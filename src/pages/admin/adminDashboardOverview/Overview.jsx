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
import chartApi from "../../../services/chartApi";
import NumberCounter from "../layout/NumberCounter";
import { partnerAccess } from "../../../config/partnerAccess";
import PartnerTransChart from "../../../components/charts/PartnerTransChart";
// import chartApi from "../../../services/chartApi";

function Overview() {
  const { pathname } = useLocation();
  const [products, setProducts] = useState({});
  const [data, setdata] = useState([
    {
      title: "Users",
      count: 0,
      active: 0,
      image: t1,
    },
    {
      title: "Booking",
      count: 0,
      active: 0,
      image: t2,
    },
    {
      title: "Studio",
      count: 0,
      active: 0,
      image: t3,
    },
    {
      title: "Project",
      count: 0,
      active: 0,
      image: t4,
    },
  ]);

  const partnerData = [
    {
      title: "Booking",
      count: products?.bookingCount?.data[0]?.totalCount,
      active: products?.bookingCount?.data[0]?.activeCount,
      image: t2,
    },
    {
      title: "Transaction",
      count: products?.transactionCount?.data[0]?.totalAmount,
      active: 1589,
      image: t3,
    },
    // {
    //   title: "Project",
    //   count: 159,
    //   active: 38,
    //   image: t4,
    // },
  ];

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
    chartApi
      .getAllCharts()
      .then((res) => {
        console.log(res);
        console.log(res.transactionData);
        setProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("{{{{{{{{{{{{{{{{{", products);
    let adata = [
      {
        title: "Users",
        count: products.UserData?.data[0].totalCount || 0,
        active: products.UserData?.data[0].activeCount || 0,
        image: t1,
      },
      {
        title: "Booking",
        count: products.BookingData?.data[0].totalCount || 0,
        active: products.BookingData?.data[0].activeCount || 0,
        image: t2,
      },
      {
        title: "Studio",
        count: products.StudioData?.data[0].totalCount || 0,
        active: products.StudioData?.data[0].activeCount || 0,
        image: t3,
      },
      {
        title: "Project",
        count: 0,
        active: 0,
        image: t4,
      },
    ];
    setdata(adata);
  }, [products]);

  const [navAccess, setnavAccess] = useState(
    partnerAccess ? partnerAccess : ""
  );
  let header = navAccess ? partnerData : data;

  return (
    <>
      <div className={style.overviewPage1}>
        <div
          className={style.overviewPageHeader}
          style={{
            justifyContent: navAccess && "flex-start",
            gap: navAccess && "2%",
          }}
        >
          {header.map((item, index) => (
            <div key={index} className={style.overviewTicketDiv}>
              <div>
                <h3>{item.title}</h3>
                <h2>
                  <NumberCounter end={item.count} />
                </h2>
                <>
                  <small>
                    Active : <NumberCounter end={item.active} />
                  </small>
                </>
              </div>
              <div>
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          ))}
        </div>

        {navAccess ? (
          <PartnerTransChart products={products} />
        ) : (
          <>
            <ThreeWaveChart products={products} />
            <div className={style.overviewPage2}>
              <div>
                <DoughnutChart products={products} />
              </div>
              <div>
                <LineGraph />
              </div>
            </div>
            <div className={style.overviewPage3}>
              <div>
                <BarGraph products={products} />
              </div>
              <div>
                <AreaGraph products={products} />
              </div>
            </div>
            <br />
            <br />
            <div className={style.overviewPage4}>
              <div>
                <SimpleLineChart />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Overview;
