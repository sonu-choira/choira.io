import React, { useEffect, useState } from "react";
import style from "../../../admin/studios/studio.module.css";
import Button from "../Button";
import { logDOM } from "@testing-library/react";
import appAndmoreApi from "../../../../services/appAndmoreApi";
import userApi from "../../../../services/userApi";

function CheckboxFilter({
  data,
  cusstyle,
  disabledsearch,
  selectedData,
  setSelectedData,
  sendFilterDataToapi,
  setProducts,
  setTotalPage,
  bookingPageCount,
  closeAllFilter,
  userFiler,
  pageCount,
  setPageCount,
  userAllFilterData,
}) {
  useEffect(() => {
    console.log("selectedData", selectedData);
  }, [selectedData]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedData([name]); // Set only the clicked checkbox as selected
    } else {
      setSelectedData([]); // Clear the selectedData array
    }
  };

  const sendFilterDatatoapi = () => {
    if (selectedData.length > 0) {
      setProducts([]);
      appAndmoreApi
        .filterData(sendFilterDataToapi)
        .then((response) => {
          console.log("filter applied:", response);
          setProducts(response.studios);
          setTotalPage(response.paginate.totalPages);
        })
        .catch((error) => {
          console.error("Error filter studio:", error);
        });
      closeAllFilter();
    } else {
      closeAllFilter();
      setProducts([]);
      hitallstudioApi();
    }
  };

  const sendUserFilterData = () => {
    if (selectedData.length > 0) {
      setProducts([]);
      setPageCount(1);
      let status;
      if (selectedData == "active") {
        status = 1;
        userAllFilterData.status = status;
      } else {
        status = 0;
        userAllFilterData.status = status;
      }
      userApi
        .getAllUser(pageCount, userAllFilterData)
        .then((response) => {
          console.log("filter applied:", response);
          setProducts(response.users);
          setTotalPage(response.paginate.totalPages);
        })
        .catch((error) => {
          console.error("Error filter studio:", error);
        });
    }
  };

  const hitallstudioApi = () => {
    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
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
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else {
    }
  };

  const resetFilter = () => {
    if (selectedData.length > 0) {
      setSelectedData([]);
      setProducts([]);
      function areAllValuesEmpty(obj) {
        for (let key in obj) {
          if (obj[key] !== "") {
            return false;
          }
        }
        return true;
      }

      if (areAllValuesEmpty(sendFilterDataToapi)) {
        closeAllFilter();
        hitallstudioApi();
      } else {
        hitallstudioApi();
        closeAllFilter();
      }
    }
  };

  const resetUserFilter = () => {
    if (selectedData.length > 0) {
      setSelectedData([]);
      setProducts([]);
      setPageCount(1);

      // checking if filter has any data

      // const type =  ;
      userAllFilterData.status = undefined;

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
    }
    closeAllFilter();
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

  return (
    <>
      <div className={style.filteractionBox2} style={cusstyle} id="filterBox">
        {disabledsearch ? (
          ""
        ) : (
          <div>
            <input type="text" placeholder="Search here.." />
          </div>
        )}

        {/* Map through the cities array to generate checkboxes */}

        {data.map((item, index) => (
          <div key={index} className={style.fltercheckboxdiv}>
            <input
              type="checkbox"
              name={item}
              id={item}
              checked={selectedData.includes(item)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}

        <div
          style={{ justifyContent: "space-around" }}
          className={style.topborder}
        >
          <p
            onClick={!userFiler ? resetFilter : resetUserFilter}
            style={{ color: selectedData.length > 0 ? "#FFC701" : "" }}
          >
            reset
          </p>
          <Button
            name={"ok"}
            onClick={!userFiler ? sendFilterDatatoapi : sendUserFilterData}
          />
        </div>
      </div>
    </>
  );
}

export default CheckboxFilter;
