import React, { useState } from "react";
import style from "../../../../pages/admin/studios/studio.module.css";
import { DatePicker } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import appAndmoreApi from "../../../../services/appAndmoreApi";

function DateAndSearchFilter({ setProducts, setTotalPage, bookingPageCount }) {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendDataToApi();
    }
  };

  const sendDataToApi = () => {
    // Here you can send the data to your API
    console.log("Sending data to API:", searchQuery);
    let searchText = searchQuery.trim();
    // Replace the above line with your actual API call
    // let limit = 10;

    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c3";
      appAndmoreApi
        .filterServiceData(idToUse, searchText)
        .then((response) => {
          console.log("filter applied:", response);
          setProducts(response.services.results);
          setTotalPage(response.paginate.totalPages);
        })
        .catch((error) => {
          console.error("Error filter studio:", error);
        });
    } else if (bookingPageCount === "c1") {
      appAndmoreApi
        .filterData(undefined, undefined, searchText)
        .then((response) => {
          console.log("filter applied:", response);
          setProducts(response.studios);
          setTotalPage(response.paginate.totalPages);
        })
        .catch((error) => {
          console.error("Error filter studio:", error);
        });
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className={style.searchDiv}>
        <div>
          <DatePicker onChange={onChange} className={style.antCustomcss} />
        </div>
        <div>
          <BiSearchAlt /> <br />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </>
  );
}

export default DateAndSearchFilter;
