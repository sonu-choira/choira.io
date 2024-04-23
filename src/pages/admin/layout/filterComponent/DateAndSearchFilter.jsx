import React, { useEffect, useState } from "react";
import style from "../../../../pages/admin/studios/studio.module.css";
import { DatePicker } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import appAndmoreApi from "../../../../services/appAndmoreApi";
import Button from "../Button";
import { width } from "@mui/system";
import { TbFilterCancel } from "react-icons/tb";

function DateAndSearchFilter({
  setProducts,
  setTotalPage,
  bookingPageCount,
  filterNav,
  setfilterNav,
  // searchQuery,
  // setSearchQuery,
  sendFilterDataToapi,
  setSelectedCity,
  setSelectedRoom,
  setSelectedStatus,
  setPriceFilter,
  setShortby,
}) {
  // console.log(sendFilterDataToapi, "details ke andr mila");
  const onChange = (date, dateString) => {
    console.log(dateString);

    sendFilterDataToapi.creationTimeStamp = dateString;
    if (sendFilterDataToapi.creationTimeStamp !== "") {
      sendDataToApi();
    } else {
      hitallstudioApi();
    }
  };
  // useEffect(() => {
  //   console.log(selectedDate, "selectedDate milaaaa");
  //   if (selectedDate !== "") {
  //     sendDataToApi();
  //   }
  // }, [selectedDate]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // console.log(typeof sendFilterDataToapi);
    // let updatedfilterdata =

    sendFilterDataToapi.searchText = searchQuery;

    // console.log(sendFilterDataToapi);
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

  const hitallstudioApi = () => {
    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c3";

      appAndmoreApi
        .getServices("10", idToUse, 1)
        .then((response) => {
          console.log(
            `====================> response ${bookingPageCount}`,
            response
          );
          if (response.status) {
            setProducts(response.services.results);
            console.log("lkasdnflkjsdnf", response.status);
            setTotalPage(response.paginate.totalPages);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else if (bookingPageCount === "c1") {
      const limit = 64;
      const active = 1;
      // const type = bookingPageCount;
      appAndmoreApi
        .getStudios(limit, active)
        .then((response) => {
          console.log(
            `====================> response ${bookingPageCount}`,
            response
          );
          console.log("response.data.studios", response.studios);
          if (response.studios) {
            setProducts(response.studios);
            setTotalPage(response.paginate.totalPages);

            // setPageCount(response.paginate.page);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    }
  };
  let filterData = { ...sendFilterDataToapi };
  delete filterData.sortBy;
  delete filterData.page;
  let hasFilter = false;
  for (const key in filterData) {
    if (filterData[key]) {
      hasFilter = true;
      break;
    }
  }
  const clearAllFilter = () => {
    const keys = Object.keys(sendFilterDataToapi);

    keys.forEach((key) => {
      sendFilterDataToapi[key] = "";
    });
    console.log(sendFilterDataToapi);
    try {
      setSelectedCity([]);
      setShortby("creationTimeStamp:asc");
      setSelectedRoom([]);
      setSelectedStatus([]);
      setSearchQuery("");
      setPriceFilter({
        minPrice: "",
        maxPrice: "",
      });
    } catch (e) {
      console.log(e);
    }
    console.log(sendFilterDataToapi, "sendFilterDataToapi");
  };
  // console.log(sendFilterDataToapi);
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
        {hasFilter ? (
          <div className={style.clearFilter}>
            <Button
              name={"Clear"}
              icon={<TbFilterCancel />}
              onClick={clearAllFilter}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DateAndSearchFilter;
