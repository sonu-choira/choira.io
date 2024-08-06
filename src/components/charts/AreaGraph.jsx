import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import style from "../../pages/admin/studios/studio.module.css";
import ChartNav from "./ChartNav";
import { FaCalendarCheck } from "react-icons/fa6";
import chartApi from "../../services/chartApi";

const data = [
  { name: "Sep", BookingHours: 40, BookingCount: 20 },
  { name: "Oct", BookingHours: 30, BookingCount: 15 },
  { name: "Nov", BookingHours: 50, BookingCount: 25 },
  { name: "Dec", BookingHours: 70, BookingCount: 35 },
  { name: "Jan", BookingHours: 90, BookingCount: 45 },
  { name: "Feb", BookingHours: 55, BookingCount: 27 },
  { name: "Mar", BookingHours: 75, BookingCount: 38 },
  { name: "Apr", BookingHours: 60, BookingCount: 30 },
  { name: "May", BookingHours: 80, BookingCount: 40 },
  { name: "Jun", BookingHours: 100, BookingCount: 50 },
  { name: "Jul", BookingHours: 85, BookingCount: 43 },
  { name: "Aug", BookingHours: 95, BookingCount: 47 },
];

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

const AreaGraph = ({ products }) => {
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const [filterData, setFilterData] = useState("");
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (filterData) {
      setShowBtnLoader(true);
      chartApi.getAllCharts(filterData, "BookingCountAndHours").then((res) => {
        setShowBtnLoader(false);
        setChartData(res?.BookingCountAndHours?.data || []);
      });
    } else {
      setShowBtnLoader(false);

      setChartData(products?.BookingCountAndHours?.data || []);
    }
  }, [filterData, products]);
  return (
    <div className={style.donutChart}>
      <ChartNav
        chartTitle={"Bookings"}
        chartLogo={<FaCalendarCheck />}
        setFilterData={setFilterData}
        showBtnLoader={showBtnLoader}
      />

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="colorBookingHours"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="colorBookingCount"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF00FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="BookingHours"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorBookingHours)"
            />
            <Area
              type="monotone"
              dataKey="BookingCount"
              stroke="#FF00FF"
              fillOpacity={1}
              fill="url(#colorBookingCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default AreaGraph;
