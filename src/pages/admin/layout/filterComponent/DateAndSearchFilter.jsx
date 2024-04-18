import React, { useEffect, useState } from "react";
import style from "../../../../pages/admin/studios/studio.module.css";
import { DatePicker } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import appAndmoreApi from "../../../../services/appAndmoreApi";

function DateAndSearchFilter({
  setProducts,
  setTotalPage,
  bookingPageCount,
  filterNav,
  setfilterNav,
  // searchQuery,
  // setSearchQuery,
  sendFilterDataToapi,
}) {
  console.log(sendFilterDataToapi, "details ke andr mila");
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(typeof sendFilterDataToapi);
    // let updatedfilterdata =

    sendFilterDataToapi.searchText = searchQuery;

    console.log(sendFilterDataToapi);
  }, [searchQuery]);

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
      sendFilterDataToapi.serviceType = idToUse;
      sendFilterDataToapi.serviceName = searchText;
      appAndmoreApi
        .filterServiceData(sendFilterDataToapi)
        .then((response) => {
          console.log("filter applied:", response);
          setProducts(response.services.results);
          setTotalPage(response.paginate.totalPages);
          setfilterNav(true);
        })
        .catch((error) => {
          console.error("Error filter studio:", error);
        });
    } else if (bookingPageCount === "c1") {
      sendFilterDataToapi.page = 1;

      appAndmoreApi
        .filterData(sendFilterDataToapi)
        .then((response) => {
          console.log("filter applied:", response);
          setProducts(response.studios);
          setTotalPage(response.paginate.totalPages);
          setfilterNav(true);
        })
        .catch((error) => {
          console.error("Error filter studio:", error);
        });
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value.trim());
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
