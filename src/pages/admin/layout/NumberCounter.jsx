import React, { useEffect, useState } from "react";

const NumberCounter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Duration of the animation in milliseconds
    const incrementTime = 20; // Time between each increment
    const totalIncrements = duration / incrementTime;
    const incrementValue = end / totalIncrements;

    const counter = setInterval(() => {
      start += incrementValue;
      setCount(Math.ceil(start));
      if (start >= end) {
        clearInterval(counter);
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [end]);

  return <span className="number-counter">{count}</span>;
};

export default NumberCounter;
