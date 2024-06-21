import React, { useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import Button from "../../pages/admin/layout/Button";
import DiscountTable from "./DiscountTable";
import AddNewDiscount from "./AddNewDiscount";

function Discount({ showFooter, setShowFooter, showTable, setShowTable }) {
  const addNewBtn = () => {
    setShowTable(false);
    setShowFooter(true);
  };
  return (
    <>
      <div className={style.DiscountPage}>
        <div>
          Discounts:
          {showTable && (
            <Button
              name={"Add New"}
              style={{ height: "80%" }}
              onClick={addNewBtn}
            />
          )}
        </div>
        <div>{showTable ? <DiscountTable /> : <AddNewDiscount />}</div>
      </div>
    </>
  );
}

export default Discount;
