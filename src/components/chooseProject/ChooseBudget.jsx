import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

export default function ChooseBudget() {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(20);

  const minRangeValueGap = 6;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "min") {
      setMinRange(parseInt(value));
    } else if (name === "max") {
      setMaxRange(parseInt(value));
    }

    // Additional logic for handling min and max values, updating state, and UI
    // ...

    if (maxRange - minRange < minRangeValueGap) {
      if (name === "min") {
        setMinRange(maxRange - minRangeValueGap);
      } else if (name === "max") {
        setMaxRange(minRange + minRangeValueGap);
      }
    }
  };

  return (
    <>
      <div className="project-div2">
        <div>
          <h2>Choose Type</h2>
        </div>
        <div className="choose-type-div">
          <div className="double_range_slider_box">
            <div className="double_range_slider">
              <span
                className="range_track"
                id="range_track"
                style={{
                  left: `${(minRange / 100) * 100}%`,
                  right: `${(1 - maxRange / 100) * 100}%`,
                }}
              ></span>

              <input
                type="range"
                name="min"
                min="0"
                max="100"
                value={minRange}
                step="1"
                onChange={handleInputChange}
              />
              <input
                type="range"
                name="max"
                min="0"
                max="100"
                value={maxRange}
                step="1"
                onChange={handleInputChange}
              />

              <div
                className="minvalue"
                style={{ left: `${(minRange / 100) * 100}%` }}
              >
                {minRange}
              </div>
              <div
                className="maxvalue"
                style={{ right: `${(1 - maxRange / 100) * 100}%` }}
              >
                {maxRange}
              </div>
            </div>
          </div>
        </div>

        <div className="project-div2-btn">
          <button>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
