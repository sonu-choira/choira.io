import React, { useEffect, useState } from "react";
import style from "../../../admin/studios/studio.module.css";
import Button from "../Button";
import { logDOM } from "@testing-library/react";
import appAndmoreApi from "../../../../services/appAndmoreApi";

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
}) {
  // Array of city names
  // const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    console.log("selectedData", selectedData);
  }, [selectedData]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedData([...selectedData, name]);
    } else {
      setSelectedData(selectedData.filter((item) => item !== name));
    }
  };

  const sendFilterDatatoapi = () => {
    if (selectedData.length > 0) {
      let city = sendFilterDataToapi.city;
      let limit = sendFilterDataToapi.limit;
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
        // alert("Keys are not empty.");
        hitallstudioApi();
        closeAllFilter();
      }
    }

    // Check if all values are empty
  };

  return (
    <>
      <div className={style.filteractionBox2} style={cusstyle}>
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
            onClick={resetFilter}
            style={{ color: selectedData.length > 0 ? "#FFC701" : "" }}
          >
            {" "}
            reset{" "}
          </p>
          <Button name={"ok"} onClick={sendFilterDatatoapi} />
        </div>
      </div>
    </>
  );
}

export default CheckboxFilter;
