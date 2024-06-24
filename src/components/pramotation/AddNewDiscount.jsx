import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import CustomInput from "../../pages/admin/layout/CustomInput";
import CustomTextArea from "../../pages/admin/layout/CustomTextArea";
import CustomSelect from "../../pages/admin/layout/CustomSelect";
import CustomMultipleSelect from "../../pages/admin/layout/CustomMultipleSelect";
import CustomRangePicker from "../../pages/admin/layout/CustomRangePicker";
import userApi from "../../services/userApi";
import SearchSelectInput from "../../pages/admin/layout/SearchAndSelectInput";

function AddNewDiscount({
  editData,
  setEditData,
  editMode,
  // setShowFooter,
  // setShowTable,
}) {
  let option = [
    "New User Discount",
    "Discount Recurring",
    "Event Based",
    "Special Session",
    "Specific User",
  ];
  console.log(editData);
  console.log(editMode.current);
  if (editMode) {
    // alert("edit mode");
  }
  const [discountData, setDiscountData] = useState(
    editMode.current
      ? editData
      : {
          discountName: "",
          discountPercentage: "",
          couponCode: "",
          discountType: "",
          discountDate: "",
          specialUsers: [],
          searchUser: "",
          maxCapAmount: "",
          details: "",
        }
  );
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    console.log("discountData", discountData);
  }, [discountData]);

  const handleUserChange = (newValue) => {
    // Handle user selection change here
    setDiscountData((prevData) => ({
      ...prevData,
      userId: newValue.map((user) => user.value),
      tempUserName: newValue.map((user) => user.label),
    }));
    console.log(
      "Selected user:",
      newValue.map((user) => user.value)
    );
  };

  async function fetchUserList(username) {
    let dataToSend = {
      searchUser: username,
    };
    try {
      const response = await userApi.getAllUser(1, dataToSend);
      console.log("response.data.users", response.users);
      return response.users.map((user) => ({
        label: `${user.fullName} `,
        value: user._id,
      }));
    } catch (error) {
      console.error("Error fetching user list:", error);
      return []; // return empty array in case of error
    }
  }

  return (
    <div className={style.addNewDiscountPage}>
      <div>
        <CustomInput
          type="text"
          placeholder="Enter Discount Name"
          label="Discount Name"
          value={discountData?.discountName}
          onChange={(e) =>
            setDiscountData({ ...discountData, discountName: e.target.value })
          }
        />
        <CustomInput
          type="text"
          placeholder="Enter Discount Percentage"
          label="Discount Percentage"
          value={discountData?.discountPercentage}
          onChange={(e) =>
            setDiscountData({
              ...discountData,
              discountPercentage: e.target.value,
            })
          }
        />
        <CustomInput
          type="text"
          placeholder="EnterCoupon Code"
          label="Coupon Code"
          value={discountData?.couponCode}
          onChange={(e) =>
            setDiscountData({ ...discountData, couponCode: e.target.value })
          }
        />
        {discountData.discountType === "Specific User" && (
          <div className={style.addNewStudioinputBox}>
            <label htmlFor="UserName">User Name</label>
            <SearchSelectInput
              placeholder="Select users"
              fetchOptions={fetchUserList}
              onChange={handleUserChange}
              mode="multiple"
              defaultValue={discountData?.tempUserName?.map((user) => user)}
              style={{
                width: "100%",
              }}
            />
          </div>
        )}
        {discountData.discountType === "Event Based" && (
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
          // onChange={(e) => setSelectedDiscount(e.target.value)}
          // value={discountData.discountType}
          value={discountData?.discountType}
          disabled={editMode?.current}
          // readonly={editMode?.current}
          readonly={true}
          onChange={(e) =>
            setDiscountData({ ...discountData, discountType: e.target.value })
          }
        />
        <CustomInput
          type="text"
          placeholder="Enter Max. Cap Amount"
          label="Max. Cap Amount"
          id={"cap"}
          htmlFor={"cap"}
          value={discountData?.maxCapAmount}
          onChange={(e) =>
            setDiscountData({ ...discountData, maxCapAmount: e.target.value })
          }
        />

        <CustomTextArea
          type="text"
          placeholder="Enter Description"
          label="Description"
          id={"description"}
          htmlFor={"description"}
          value={discountData?.details}
          onChange={(e) =>
            setDiscountData({ ...discountData, details: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default AddNewDiscount;
