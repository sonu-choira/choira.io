import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartNav from "./ChartNav";
import style from "../../pages/admin/studios/studio.module.css";
import { MdAutoGraph } from "react-icons/md";

const data = [
  { name: "Sep", Earning: 60, Discount: 20 },
  { name: "Oct", Earning: 85, Discount: 15 },
  { name: "Nov", Earning: 50, Discount: 10 },
  { name: "Dec", Earning: 45, Discount: 12 },
  { name: "Jan", Earning: 55, Discount: 14 },
  { name: "Feb", Earning: 68, Discount: 20 },
  { name: "Mar", Earning: 40, Discount: 18 },
  { name: "Apr", Earning: 75, Discount: 12 },
  { name: "May", Earning: 90, Discount: 16 },
  { name: "Jun", Earning: 55, Discount: 18 },
  { name: "Jul", Earning: 35, Discount: 22 },
  { name: "Aug", Earning: 60, Discount: 18 },
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={style.customTooltip}
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
          >{`${entry.name}: ₹${entry.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};
const SimpleLineChart = () => (
  <div className={style.donutChart}>
    <ChartNav chartTitle={"Revenue"} chartLogo={<MdAutoGraph />} />
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Earning"
          stroke="#8884D8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Discount" stroke="#82CA9D" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
export default SimpleLineChart;
