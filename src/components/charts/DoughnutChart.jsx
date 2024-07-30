import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Button from "../../pages/admin/layout/Button";
import style from "../../pages/admin/studios/studio.module.css";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import ChartNav from "./ChartNav";
import { FaChartPie } from "react-icons/fa";

const data = [
  { name: "Production", value: 52430, color: "#ffc658" },
  { name: "Studio", value: 35050, color: "#ff7300" },
  { name: "Mixing", value: 20411, color: "#ff0000" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const percentage = (
      (value / data.reduce((acc, item) => acc + item.value, 0)) *
      100
    ).toFixed(0);
    return (
      <div className={style.customTooltip}>
        <p>{`${name} : ₹${value.toLocaleString("en-IN")}`}</p>
        {/* <p>{`${percentage}% from ${name}`}</p> */}
      </div>
    );
  }
  return null;
};

const DoughnutChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const handleMouseEnter = (data, index) => {
    setHoveredSegment(index);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  const currentSegment = hoveredSegment !== null ? data[hoveredSegment] : null;
  const percentage = currentSegment
    ? ((currentSegment.value / total) * 100).toFixed(0)
    : ((data[1].value / total) * 100).toFixed(0);
  const segmentName = currentSegment ? currentSegment.name : "Studio";

  return (
    <div className={style.donutChart}>
      <ChartNav chartTitle={"Earning Breakdown"} chartLogo={<FaChartPie />} />
      <div
        style={{
          textAlign: "center",
          // border: "1px solid #FFAA00",
          position: "relative",
          width: "400px",
          height: "400px",
          margin: "auto",
        }}
        className={style.donutChartDiv}
      >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={160}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            style={{ zIndex: 100 }}
            content={<CustomTooltip />}
            wrapperStyle={{ zIndex: 1000 }}
          />
        </PieChart>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <h2>{`₹${total.toLocaleString("en-IN")}`}</h2>
          <p>{`${percentage}% from ${segmentName}`}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {data.map((item, index) => (
          <div key={index} style={{ margin: "0 20px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  backgroundColor: item.color,
                  marginRight: "5px",
                }}
              ></span>
              {item.name}
            </div>
            <div>{`₹${item.value.toLocaleString("en-IN")}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
