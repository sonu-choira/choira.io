import React, { useEffect } from "react";
import style from "../../../admin/studios/studio.module.css";
import Button from "../Button";

function PriceFilter({ closeAllFilter }) {
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
  return (
    <>
      <div className={style.filteractionBox} id="filterBox">
        <div>Price Range</div>
        <div className={style.topborder}>
          <p>start Price</p>
          <input type="text" placeholder="₹" />
        </div>
        <div>
          <p>End Price</p>
          <input type="text" placeholder="₹" />
        </div>
        <div className={style.topborder}>
          <p>reset </p>
          <Button name={"ok"} />
        </div>
      </div>
    </>
  );
}

export default PriceFilter;
