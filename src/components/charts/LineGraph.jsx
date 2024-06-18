import React from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { FaHandshake } from "react-icons/fa";

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

const data = [
  { name: "Sep", Current: 10, Previous: 20 },
  { name: "Oct", Current: 15, Previous: 25 },
  { name: "Nov", Current: 20, Previous: 30 },
  { name: "Dec", Current: 25, Previous: 35 },
  { name: "Jan", Current: 30, Previous: 40 },
  { name: "Feb", Current: 37, Previous: 37 },
  { name: "Mar", Current: 25, Previous: 35 },
  { name: "Apr", Current: 20, Previous: 30 },
  { name: "May", Current: 15, Previous: 25 },
  { name: "Jun", Current: 10, Previous: 20 },
  { name: "Jul", Current: 15, Previous: 25 },
  { name: "Aug", Current: 20, Previous: 30 },
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
        <p className="label">{`Month: ${label}`}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
          >{`${entry.name} : ${entry.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const LineGraph = () => (
  <div className={style.donutChart}>
    <ChartNav chartTitle={"Studio Onboarding"} chartLogo={<FaHandshake />} />
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="Current"
          stroke="#0088FE"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Previous" stroke="#FF0000" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default LineGraph;
