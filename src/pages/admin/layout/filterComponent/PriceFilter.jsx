import React, { useEffect } from "react";
import style from "../../../admin/studios/studio.module.css";
import Button from "../Button";
import appAndmoreApi from "../../../../services/appAndmoreApi";

function PriceFilter({
  closeAllFilter,
  setPriceFilter,
  priceFilter,
  sendFilterDataToapi,
  setProducts,
  setTotalPage,
  bookingPageCount,
}) {
  useEffect(() => {
    // Function to handle click events outside of the filter box
    const handleClickOutside = (event) => {
      const filterBox = document.getElementById("filterBox"); // Assuming the filter box has an ID "filterBox"
      if (filterBox && !filterBox.contains(event.target)) {
        closeAllFilter(); // Call closeAllFilter function if clicked outside the filter box
      }
    };

    // Attach event listener to document body to handle click events
    document.body.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [closeAllFilter]);

  const handlePriceChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "startPrice") {
      setPriceFilter({
        ...priceFilter,
        minPrice: e.target.value,
      });
    } else if ((e.target.name = "endPrice")) {
      setPriceFilter({
        ...priceFilter,
        maxPrice: e.target.value,
      });
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

  const sendFilterDatatoapi = () => {
    if (priceFilter.minPrice || priceFilter.maxPrice != "") {
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

  const resetFilter = () => {
    if (priceFilter.minPrice || priceFilter.maxPrice != "") {
      setPriceFilter({
        minPrice: "",
        maxPrice: "",
      });
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
      <div className={style.filteractionBox} id="filterBox">
        <div>Price Range</div>
        <div className={style.topborder}>
          <p>start Price</p>
          <input
            type="text"
            name="startPrice"
            placeholder="₹"
            onChange={(event) => {
              handlePriceChange(event);
            }}
            value={priceFilter?.minPrice}
          />
        </div>
        <div>
          <p>End Price</p>
          <input
            type="text"
            name="endPrice"
            placeholder="₹"
            onChange={(event) => {
              handlePriceChange(event);
            }}
            value={priceFilter?.maxPrice}
          />
        </div>
        <div
          style={{ justifyContent: "space-around" }}
          className={style.topborder}
        >
          <p
            onClick={resetFilter}
            style={{
              color:
                priceFilter.minPrice || priceFilter.maxPrice != ""
                  ? "#FFC701"
                  : "",
            }}
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

export default PriceFilter;
