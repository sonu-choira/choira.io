import React from "react";
import style from "../../pages/admin/studios/studio.module.css";
import CustomInput from "../../pages/admin/layout/CustomInput";
import CustomTextArea from "../../pages/admin/layout/CustomTextArea";
import CustomSelect from "../../pages/admin/layout/CustomSelect";

function AddNewDiscount() {
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
      </div>
      <div>
        <CustomSelect />
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
