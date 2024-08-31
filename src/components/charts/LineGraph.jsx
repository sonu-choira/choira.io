import React, { useEffect, useState } from "react";
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
import chartApi from "../../services/chartApi";
import { errorAlert } from "../../pages/admin/layout/Alert";

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

const LineGraph = ({ products }) => {
  const [chartData, setChartData] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [showBtnLoader, setShowBtnLoader] = useState(true);

  useEffect(() => {
    if (filterData) {
      setShowBtnLoader(true);
      chartApi
        .getAllCharts(filterData, "studioOnboard")
        .then((res) => {
          setChartData(res?.studioOnboardData?.data || []);
          setShowBtnLoader(false);
        })
        .catch((err) => {
          setShowBtnLoader(false);
          errorAlert(err);
        });
    } else {
      setChartData(products?.studioOnboardData?.data || []);
      setShowBtnLoader(products?.studioOnboardData?.data ? false : true);
    }
  }, [filterData, products]);

  return (
    <div className={style.donutChart}>
      <ChartNav
        chartTitle={"Studio Onboarding"}
        chartLogo={<FaHandshake />}
        setFilterData={setFilterData}
        showBtnLoader={showBtnLoader}
      />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
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
};

export default LineGraph;
