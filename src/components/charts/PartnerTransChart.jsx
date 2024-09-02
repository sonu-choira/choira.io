import React, { useEffect, useState } from "react";
import Button from "../../pages/admin/layout/Button";

import style from "../../pages/admin/studios/studio.module.css";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import ChartNav from "./ChartNav";
import chartApi from "../../services/chartApi";
import { errorAlert } from "../../pages/admin/layout/Alert";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p className="label">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
          >{`${entry.name}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const PartnerTransChart = ({ products }) => {
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const [filterData, setFilterData] = useState("");
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (filterData) {
      setShowBtnLoader(true);
      chartApi.getAllCharts(filterData, "BookingCountAndHours").then((res) => {
        setShowBtnLoader(false);
        setChartData(res?.BookingsData?.data || []);
      });
    } else {
      setShowBtnLoader(false);

      setChartData(products?.BookingsData?.data || []);
    }
  }, [filterData, products]);
  return (
    <div className={style.transactionChart}>
      <ChartNav
        chartTitle={"Transaction "}
        setFilterData={setFilterData}
        showBtnLoader={showBtnLoader}
      />

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorBookingHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFCC00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFCC00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBookingCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="BookingHours" // Change Name here
            stroke="#FFCC00"
            fillOpacity={1}
            fill="url(#colorBookingHours)"
          />
          <Area
            type="monotone"
            dataKey="BookingCount" // Change Name here
            stroke="#00FFFF"
            fillOpacity={1}
            fill="url(#colorBookingCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PartnerTransChart;
