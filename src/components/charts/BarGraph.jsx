import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import style from "../../pages/admin/studios/studio.module.css";
import ChartNav from "./ChartNav";
import { VscGraph } from "react-icons/vsc";
import chartApi from "../../services/chartApi";

const data = [
  { name: "Ket Studio", bookings: 85 },
  { name: "Joshua Inc.", bookings: 80 },
  { name: "Space Cat Studio", bookings: 75 },
  { name: "Swarsamwad Studio", bookings: 70 },
  { name: "Rockstar Inc.", bookings: 65 },
  { name: "C7 Studio", bookings: 60 },
  { name: "Acoustique Production", bookings: 55 },
  { name: "Seven Heaven Studio", bookings: 50 },
  { name: "Hill Top Studio", bookings: 45 },
  { name: "Arvind Recording Studio", bookings: 40 },
];

const BarGraph = ({ products }) => {
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const [filterData, setFilterData] = useState("");
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (filterData) {
      setShowBtnLoader(true);
      chartApi.getAllCharts(filterData, "NoOfBookings").then((res) => {
        setShowBtnLoader(false);
        setChartData(res?.NoOfBookings?.data || []);
      });
    } else {
      setShowBtnLoader(false);

      setChartData(products?.NoOfBookings?.data || []);
    }
  }, [filterData, products]);

  return (
    <div className={style.donutChart}>
      <ChartNav
        chartTitle={"Studio Bookings"}
        chartLogo={<VscGraph />}
        setFilterData={setFilterData}
        showBtnLoader={showBtnLoader}
      />
      <div style={{ width: "100%", height: 400 }}>
        {/* <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    ></div> */}
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#FFAA00" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarGraph;
