import React, { useEffect } from "react";
import PropTypes from "prop-types";
import style from "../../../admin/studios/studio.module.css";
import Button from "../Button";

const CheckBoxFilterComponent = ({
  data,
  cusstyle,
  disabledsearch,
  selectedData,
  setSelectedData,
  onFilterApply,
  onResetFilter,
  closeAllFilter,
  sendFilterDataToapi,
}) => {
  useEffect(() => {
    console.log("selectedData", selectedData);
  }, [selectedData]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedData(checked ? name : "");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const filterBox = document.getElementById("filterBox");
      if (filterBox && !filterBox.contains(event.target)) {
        closeAllFilter();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [closeAllFilter]);

  const handleCheckboxClick = (event) => {
    // Stop the click event from propagating to the document body
    event.stopPropagation();
  };

  return (
    <div className={style.filteractionBox2} style={cusstyle} id="filterBox">
      {!disabledsearch && (
        <div>
          <input type="text" placeholder="Search here.." />
        </div>
      )}
      {Array.isArray(data)
        ? data.map((item, index) => (
            <div
              key={index}
              className={style.fltercheckboxdiv}
              onClick={handleCheckboxClick}
            >
              <input
                type="checkbox"
                name={item}
                id={item}
                checked={selectedData.includes(item)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))
        : Object.keys(data).map((key, index) => (
            <div
              key={key}
              className={style.fltercheckboxdiv}
              onClick={handleCheckboxClick}
            >
              <input
                type="checkbox"
                name={data[key]}
                id={key}
                checked={selectedData.includes(data[key])}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={key}>{key}</label>
            </div>
          ))}
      {/* {data.map((item, index) => (
        <div
          key={index}
          className={style.fltercheckboxdiv}
          onClick={handleCheckboxClick}
        >
          <input
            type="checkbox"
            name={item}
            id={item}
            checked={selectedData.includes(item)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))} */}
      <div
        style={{ justifyContent: "space-around" }}
        className={style.topborder}
      >
        <p
          onClick={onResetFilter}
          style={{ color: selectedData.length > 0 ? "#FFC701" : "" }}
        >
          reset
        </p>
        <Button
          name={"ok"}
          onClick={() => onFilterApply(sendFilterDataToapi)}
        />
      </div>
    </div>
  );
};

// CheckBoxFilterComponent.propTypes = {
//   data: PropTypes.array.isRequired,
//   cusstyle: PropTypes.object,
//   disabledsearch: PropTypes.bool,
//   selectedData: PropTypes.array.isRequired,
//   setSelectedData: PropTypes.func.isRequired,
//   onFilterApply: PropTypes.func.isRequired,
//   onResetFilter: PropTypes.func.isRequired,
//   closeAllFilter: PropTypes.func.isRequired,
// };

export default CheckBoxFilterComponent;
