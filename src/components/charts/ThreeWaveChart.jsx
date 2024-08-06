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

// const data = [
//   { name: "SEP", studio: 40, production: 80, mixmaster: 60 },
//   { name: "OCT", studio: 50, production: 90, mixmaster: 70 },
//   { name: "NOV", studio: 60, production: 100, mixmaster: 80 },
//   { name: "DEC", studio: 70, production: 110, mixmaster: 90 },
//   { name: "JAN", studio: 80, production: 120, mixmaster: 100 },
//   { name: "FEB", studio: 90, production: 130, mixmaster: 110 },
//   { name: "MAR", studio: 100, production: 120, mixmaster: 100 },
//   { name: "APR", studio: 110, production: 110, mixmaster: 90 },
//   { name: "MAY", studio: 120, production: 100, mixmaster: 80 },
//   { name: "JUN", studio: 110, production: 90, mixmaster: 70 },
//   { name: "JUL", studio: 100, production: 80, mixmaster: 60 },
//   { name: "AUG", studio: 90, production: 70, mixmaster: 50 },
// ];

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

const ThreeWaveChart = ({
  studioColor = "#FFAA00",
  productionColor = "#00FF00",
  mixmasterColor = "#8884d8",
  products,
}) => {

  const [chartData, setChartData] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [showBtnLoader, setShowBtnLoader] = useState(true);

  useEffect(() => {
    if (filterData) {
      setShowBtnLoader(true);
      chartApi
        .getAllCharts(filterData, "transaction")
        .then((res) => {
          setChartData(res?.transactionData?.data || []);
          setShowBtnLoader(false);
        })
        .catch((err) => {
          setShowBtnLoader(false);
          errorAlert(err);
        });
    } else {
      setChartData(products?.transactionData?.data || []);
      setShowBtnLoader(products?.transactionData?.data ? false : true);
    }
  }, [filterData, products]);

  console.log(products, "products?.transactionData?.data");
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

  const sortedData = chartData.sort((a, b) => {

    return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
  });
  return (
    <div className={style.transactionChart}>
      <ChartNav
        chartTitle={"Transaction "}
        setFilterData={setFilterData}
        showBtnLoader={showBtnLoader}
      />

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={sortedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorStudio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={studioColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={studioColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={productionColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={productionColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMixMaster" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={mixmasterColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={mixmasterColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="studio"
            stroke={studioColor}
            fillOpacity={1}
            fill="url(#colorStudio)"
          />
          <Area
            type="monotone"
            dataKey="production"
            stroke={productionColor}
            fillOpacity={1}
            fill="url(#colorProduction)"
          />
          <Area
            type="monotone"
            dataKey="mixmaster"
            stroke={mixmasterColor}
            fillOpacity={1}
            fill="url(#colorMixMaster)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreeWaveChart;
