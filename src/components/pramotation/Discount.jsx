import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import Button from "../../pages/admin/layout/Button";
import DiscountTable from "./DiscountTable";
import AddNewDiscount from "./AddNewDiscount";
import { errorAlert } from "../../pages/admin/layout/Alert";
import { useRef } from "react";

function Discount({ showFooter, setShowFooter, showTable, setShowTable }) {
  const addNewBtn = () => {
    setShowTable(false);
    setShowFooter(true);
  };
  let editMode = useRef(false);
  // let editData = "";
  const [editData, setEditData] = useState("");
  // const editDiscount = (data) => {

  // };
  useEffect(() => {
    console.log(editData);
    if (editData) {
      setShowTable(false);
      setShowFooter(true);
      editMode.current = true;
      console.log("editMode", editMode);
    }
  }, [editData]);
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
        <div>
          {showTable ? (
            <DiscountTable editData={editData} setEditData={setEditData} />
          ) : (
            <AddNewDiscount
              editData={editData}
              setEditData={setEditData}
              editMode={editMode}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Discount;
