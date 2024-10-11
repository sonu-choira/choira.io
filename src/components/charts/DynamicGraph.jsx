import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
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
import ChartNav from "./ChartNav";
import { errorAlert } from "../../pages/admin/layout/Alert";

// Custom Tooltip to show price with ₹ symbol
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
          <p key={`item-${index}`} style={{ color: entry.color }}>{`${
            entry.name
          }: ₹${entry.value.toLocaleString()}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

// DEMO DATA
const demoData = [
  {
    name: "JAN",
    room1: 30000,
    room2: 40000,
    room3: 35000,
  },
  {
    name: "FEB",
    room1: 32000,
    room2: 42000,
    room3: 34000,
  },
  {
    name: "MAR",
    room1: 33000,
    room2: 41000,
    room3: 36000,
  },
  {
    name: "APR",
    room1: 35000,
    room2: 43000,
    room3: 37000,
  },
  {
    name: "MAY",
    room1: 36000,
    room2: 44000,
    room3: 38000,
  },
  {
    name: "JUN",
    room1: 37000,
    room2: 45000,
    room3: 39000,
  },
  {
    name: "JUL",
    room1: 38000,
    room2: 46000,
    room3: 40000,
  },
  {
    name: "AUG",
    room1: 39000,
    room2: 47000,
    room3: 41000,
  },
  {
    name: "SEP",
    room1: 40000,
    room2: 48000,
    room3: 42000,
  },
  {
    name: "OCT",
    room1: 41000,
    room2: 49000,
    room3: 43000,
  },
  {
    name: "NOV",
    room1: 42000,
    room2: 50000,
    room3: 44000,
  },
  {
    name: "DEC",
    room1: 43000,
    room2: 51000,
    room3: 45000,
  },
];

// Rooms data with dynamic colors and dataKey for each room
const rooms = [
  { dataKey: "room1", color: "#FFAA00" }, // Room 1
  { dataKey: "room2", color: "#00FF00" }, // Room 2
  { dataKey: "room3", color: "#8884d8" }, // Room 3
];

const DynamicRoomChart = () => {
  const [chartData, setChartData] = useState(demoData); // Using demoData
  const [filterData, setFilterData] = useState("");
  const [showBtnLoader, setShowBtnLoader] = useState(false);

  useEffect(() => {
    if (filterData) {
      setShowBtnLoader(true);
      // Replace the following with your actual API call if needed
      setTimeout(() => {
        setChartData(demoData); // Simulate API data
        setShowBtnLoader(false);
      }, 1000);
    }
  }, [filterData]);

  // Sort months in the correct order
  const monthOrder = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const sortedData = chartData.sort(
    (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
  );

  return (
    <div className={style.transactionChart}>
      <ChartNav
        chartTitle={"Room Price Comparison"}
        setFilterData={setFilterData}
        showBtnLoader={showBtnLoader}
      />

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={sortedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Dynamically render rooms based on the rooms array */}
          {rooms.map((room, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={room.dataKey} // DataKey should match the room's data field (e.g., "room1", "room2")
              stroke={room.color} // Color dynamically from frontend
              fillOpacity={1}
              fill={`url(#color${room.dataKey})`}
            />
          ))}

          {/* Define gradients for each room dynamically */}
          {rooms.map((room, index) => (
            <defs key={`gradient-${index}`}>
              <linearGradient
                id={`color${room.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={room.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={room.color} stopOpacity={0} />
              </linearGradient>
            </defs>
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicRoomChart;
