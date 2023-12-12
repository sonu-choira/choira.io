import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

const formatValue = (value) => {
  if (value >= 100000) {
    // Convert to lakh
    return (value / 100000).toFixed(1) + "L";
  } else if (value >= 1000) {
    // Convert to thousand
    return (value / 1000).toFixed(1) + "K";
  } else {
    // Display as is
    return value.toString();
  }
};

export default function ChooseBudget({ onNext }) {
  const handleContinue = () => {
    // Perform any necessary actions in this component
    // ...

    // Call the callback to trigger navigation to the next component
    onNext();
  };
  const [minRange, setMinRange] = useState(1000);
  const [maxRange, setMaxRange] = useState(500000);

  const minRangeValueGap = 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let newMinRange = minRange;
    let newMaxRange = maxRange;

    if (name === "min") {
      newMinRange = parseInt(value);
    } else if (name === "max") {
      newMaxRange = parseInt(value);
    }

    // Ensure that minRange does not go beyond maxRange
    if (newMinRange > newMaxRange - minRangeValueGap) {
      newMinRange = newMaxRange - minRangeValueGap;
    }

    setMinRange(newMinRange);
    setMaxRange(newMaxRange);
  };

  return (
    <>
      <div className="project-div2">
        <div>
          <h2>Choose Budget</h2>
        </div>
        <div className="range-slider">
          <div className="double_range_slider_box">
            <div className="double_range_slider">
              <span
                className="range_track"
                id="range_track"
                style={{
                  left: `${((minRange - 1000) / 490000) * 100}%`,
                  right: `${(1 - (maxRange - 1000) / 490000) * 100}%`,
                }}
              ></span>

              <input
                type="range"
                name="min"
                min="1000"
                max="500000"
                value={minRange}
                step="1000"
                onChange={handleInputChange}
              />
              <input
                type="range"
                name="max"
                min="1000"
                max="500000"
                value={maxRange}
                step="1000"
                onChange={handleInputChange}
              />

              <div
                className="minvalue"
                style={{ left: `${((minRange - 1000) / 490000) * 100}%` }}
              >
                {`₹${formatValue(minRange)}`}
              </div>
              <div
                className="maxvalue"
                style={{ right: `${(1 - (maxRange - 1000) / 490000) * 100}%` }}
              >
                {`₹${formatValue(maxRange)}`}
              </div>
            </div>
          </div>
        </div>

        <div className="project-div2-btn">
          <button onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
