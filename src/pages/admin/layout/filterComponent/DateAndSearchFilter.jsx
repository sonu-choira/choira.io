import React, { useEffect, useState } from "react";
import { TbFilterCancel } from "react-icons/tb";
import { width } from "@mui/system";
import { BiSearchAlt } from "react-icons/bi";
import appAndmoreApi from "../../../../services/appAndmoreApi";
import Button from "../Button";
import style from "../../../../pages/admin/studios/studio.module.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import userApi from "../../../../services/userApi";
const { RangePicker } = DatePicker;

function DateAndSearchFilter({
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
  setProducts,
  pageCount,
  setPageCount,
  userFiler,
  userFilterText,
  setUserFilterText,
  userAllFilterData,
}) {
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 3 Month",
      value: [dayjs().add(-3, "m"), dayjs()],
    },
    {
      label: "Last 6 Month",
      value: [dayjs().add(-6, "m"), dayjs()],
    },
    {
      label: "Last year",
      value: [dayjs().add(-1, "y"), dayjs()],
    },
  ];
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

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      if (userFiler) {
        userAllFilterData.startDate = dateStrings[0];
        userAllFilterData.endDate = dateStrings[1];
        sendUserFilterDataToApi();
      }
    } else {
      if (userFiler) {
        userAllFilterData.startDate = undefined;
        userAllFilterData.endDate = undefined;
        sendUserFilterDataToApi();
      }
      console.log("Clear");
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
    if (searchQuery) {
      sendFilterDataToapi.searchText = searchQuery;
    }

    // console.log(sendFilterDataToapi);
  }, [searchQuery]);

  const sendDataToApi = () => {
    // Here you can send the data to your API
    console.log("Sending data to API:", searchQuery);
    let searchText = searchQuery?.trim();
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
    if (userFiler) {
      setUserFilterText(event.target.value.trim());
    } else {
      setSearchQuery(event.target.value.trim());
    }
  };

  const sendUserFilterDataToApi = () => {
    setProducts([]);
    setPageCount(1);
    userAllFilterData.searchUser = userFilterText?.trim();

    userApi
      .getAllUser(pageCount, userAllFilterData)
      .then((response) => {
        console.log(`====================> response `, response);
        console.log("response.data.users", response.users);
        if (response.users) {
          setProducts(response.users);
          setTotalPage(response.paginate.totalPages);

          // setPageCount(response.paginate.page);
        }
      })
      .catch((error) => {
        console.error("Error fetching studios:", error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (userFiler) {
        sendUserFilterDataToApi();
      } else {
        sendDataToApi();
      }
    }
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
    } else {
    }
  };
  let filterData = { ...sendFilterDataToapi };
  delete filterData.sortBy;
  delete filterData.page;
  delete filterData.serviceType;
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
      if (bookingPageCount == "c1") {
        // setSelectedCity([]);
        // setShortby("creationTimeStamp:asc");
        // setSelectedRoom([]);
        // setSelectedStatus([]);
        // setSearchQuery("");
        // setPriceFilter({
        //   minPrice: "",
        //   maxPrice: "",
        // });
        // hitallstudioApi();
        window.location.reload();
      } else {
        // setSearchQuery("");
        // hitallstudioApi();
        window.location.reload();
      }
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
          {/* <DatePicker onChange={onChange} /> */}
          <RangePicker
            presets={rangePresets}
            onChange={onRangeChange}
            className={style.antCustomcss}
          />
        </div>
        <div>
          <BiSearchAlt /> <br />
          <input
            type="text"
            placeholder="Search"
            value={!userFiler ? searchQuery : userFilterText}
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
