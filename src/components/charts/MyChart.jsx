import React from "react";
import Button from "../../pages/admin/layout/Button";

import style from "../../pages/admin/studios/studio.module.css";
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

const data = [
  { name: "SEP", app: 80, production: 60 },
  { name: "OCT", app: 90, production: 70 },
  { name: "NOV", app: 110, production: 80 },
  { name: "DEC", app: 130, production: 90 },
  { name: "JAN", app: 150, production: 100 },
  { name: "FEB", app: 120, production: 140 },
  { name: "MAR", app: 130, production: 130 },
  { name: "APR", app: 140, production: 120 },
  { name: "MAY", app: 150, production: 110 },
  { name: "JUN", app: 140, production: 100 },
  { name: "JUL", app: 130, production: 110 },
  { name: "AUG", app: 120, production: 120 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="value">{`₹${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const MyChart = ({ appColor = "#FFAA00", productionColor = "#00FF00" }) => {
  return (
    <div className={style.transactionChart}>
      <div className={style.chartNav}>
        <div></div>
        <div>
          <Button name={"export "} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={appColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={appColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={productionColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={productionColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="app"
            stroke={appColor}
            fillOpacity={1}
            fill="url(#colorApp)"
          />
          <Area
            type="monotone"
            dataKey="production"
            stroke={productionColor}
            fillOpacity={1}
            fill="url(#colorProduction)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
