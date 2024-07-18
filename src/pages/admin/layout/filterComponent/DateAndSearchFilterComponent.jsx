import React, { useEffect, useState } from "react";
import { TbFilterCancel } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Button from "../Button";
import style from "../../../../pages/admin/studios/studio.module.css";

const { RangePicker } = DatePicker;

function DateAndSearchFilterComponent({
  setTotalPage,
  filterNav,
  setfilterNav,
  sendFilterDataToapi,
  setProducts,
  userFiler,
  userFilterText,
  setUserFilterText,
  userAllFilterData,
  csstyle,
  dateDisable,
  searchDisable,
  handleFilterData,
  handleUserFilterData,
  handleClearFilter,
  handleDateFilter,
}) {
  const rangePresets = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
    { label: "Last 6 Month", value: [dayjs().add(-180, "d"), dayjs()] },
    { label: "Last year", value: [dayjs().add(-365, "d"), dayjs()] },
  ];

  const onChange = (date, dateString) => {
    sendFilterDataToapi.creationTimeStamp = dateString;
    handleFilterData(sendFilterDataToapi);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      sendFilterDataToapi.startDate = dateStrings[0];
      sendFilterDataToapi.endDate = dateStrings[1];
      handleDateFilter(sendFilterDataToapi);
    } else {
      userAllFilterData.startDate = undefined;
      userAllFilterData.endDate = undefined;
      handleDateFilter(userAllFilterData);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      sendFilterDataToapi.searchText = searchQuery;
      handleFilterData(sendFilterDataToapi);
    }
  }, [searchQuery, sendFilterDataToapi, handleFilterData]);

  const handleChange = (event) => {
    if (userFiler) {
      setUserFilterText(event.target.value);
    } else {
      setSearchQuery(event.target.value);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (userFiler) {
        handleUserFilterData(userAllFilterData);
      } else {
        handleFilterData(sendFilterDataToapi);
      }
    }
  };

  const filterData = sendFilterDataToapi ? { ...sendFilterDataToapi } : {};
  const filterData2 = userAllFilterData ? { ...userAllFilterData } : {};

  ["sortBy", "page", "serviceType"].forEach((key) => delete filterData[key]);

  const hasFilter =
    Object.values(filterData).some(
      (value) => value !== "" && value !== undefined
    ) ||
    Object.values(filterData2).some(
      (value) => value !== "" && value !== undefined
    );

  return (
    <div className={style.searchDiv} style={csstyle}>
      <div>
        {userFiler ? (
          <RangePicker
            presets={rangePresets}
            onChange={onRangeChange}
            className={style.antCustomcss}
            disabled={dateDisable}
          />
        ) : (
          <DatePicker
            onChange={onChange}
            style={{ width: "100%", height: "100%" }}
            disabled={dateDisable}
          />
        )}
      </div>
      <div>
        <BiSearchAlt /> <br />
        <input
          type="text"
          placeholder="Search"
          value={userFiler ? userFilterText : searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={searchDisable}
          className={searchDisable && style.disabled}
        />
      </div>
      {hasFilter && (
        <div className={style.clearFilter}>
          <Button
            name={"Clear"}
            icon={<TbFilterCancel />}
            onClick={handleClearFilter}
          />
        </div>
      )}
    </div>
  );
}

export default DateAndSearchFilterComponent;
