import React, { useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import CustomInput from "../../pages/admin/layout/CustomInput";
import CustomTextArea from "../../pages/admin/layout/CustomTextArea";
import CustomSelect from "../../pages/admin/layout/CustomSelect";
import CustomMultipleSelect from "../../pages/admin/layout/CustomMultipleSelect";
import CustomRangePicker from "../../pages/admin/layout/CustomRangePicker";

function AddNewDiscount() {
  let option = [
    "New User Discount",
    "Discount Recurring",
    "Event Based",
    "Special Session",
    "Specific User",
  ];
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div className={style.addNewDiscountPage}>
      <div>
        <CustomInput
          type="text"
          placeholder="Enter Discount Name"
          label="Discount Name"
        />
        <CustomInput
          type="text"
          placeholder="Enter Discount Percentage"
          label="Discount Percentage"
        />
        <CustomInput
          type="text"
          placeholder="EnterCoupon Code"
          label="Coupon Code"
        />
        {selectedDiscount === "Specific User" && (
          <CustomMultipleSelect
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            label={"Special Users"}
            id={"specialUsers"}
            htmlFor={"specialUsers"}
            placeholder={"Select Special Users"}
          />
        )}
        {selectedDiscount === "Event Based" && (
          <CustomRangePicker
            label={"Discount Date"}
            id={"DiscountDate"}
            htmlFor={"DiscountDate"}
          />
        )}
      </div>
      <div>
        <CustomSelect
          label={"Discount Type"}
          id={"discountType"}
          htmlFor={"discountType"}
          options={option}
          defaultOption={"Select Discount Type"}
          onChange={(e) => setSelectedDiscount(e.target.value)}
          value={selectedDiscount}
        />
        <CustomInput
          type="text"
          placeholder="Enter Max. Cap Amount"
          label="Max. Cap Amount"
          id={"cap"}
          htmlFor={"cap"}
        />

        <CustomTextArea
          type="text"
          placeholder="Enter Description"
          label="Description"
          id={"description"}
          htmlFor={"description"}
        />
      </div>
    </div>
  );
}

export default AddNewDiscount;
