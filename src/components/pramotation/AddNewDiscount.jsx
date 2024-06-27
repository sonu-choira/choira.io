import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../pages/admin/studios/studio.module.css";
import CustomInput from "../../pages/admin/layout/CustomInput";
import CustomTextArea from "../../pages/admin/layout/CustomTextArea";
import CustomSelect from "../../pages/admin/layout/CustomSelect";
import CustomMultipleSelect from "../../pages/admin/layout/CustomMultipleSelect";
import CustomRangePicker from "../../pages/admin/layout/CustomRangePicker";
import userApi from "../../services/userApi";
import SearchSelectInput from "../../pages/admin/layout/SearchAndSelectInput";
import { DiscountSchema } from "../../schemas";

function AddNewDiscount({ editData, setEditData, editMode, submitData }) {
  const option = {
    "New User Discount": 0,
    "Discount Recurring": 1,
    "Event Based": 2,
    "Special Session": 3,
    "Specific User": 4,
  };

  const formik = useFormik({
    initialValues: editMode.current
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
          description: "",
        },
    validationSchema: DiscountSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });
  useEffect(() => {
    console.log(formik.values, "values");
  }, [formik.values]);
  const handleUserChange = (newValue) => {
    formik.setFieldValue(
      "specialUsers",
      newValue.map((user) => user.value)
    );
    formik.setFieldValue(
      "searchUser",
      newValue.map((user) => user.label)
    );
  };

  async function fetchUserList(username) {
    let dataToSend = {
      searchUser: username,
    };
    try {
      const response = await userApi.getAllUser(1, dataToSend);
      return response.users.map((user) => ({
        label: `${user.fullName} `,
        value: user._id,
      }));
    } catch (error) {
      console.error("Error fetching user list:", error);
      return [];
    }
  }
  useEffect(() => {
    if (submitData) {
      formik.handleSubmit();
    }
  }, [submitData]);

  useEffect(() => {
    if (editMode.current) {
      formik.setValues(editData);
    }
  }, [editMode, submitData]);

  return (
    <form className={style.addNewDiscountPage} onSubmit={formik.handleSubmit}>
      <div>
        <CustomInput
          type="text"
          placeholder="Enter Discount Name"
          label="Discount Name"
          name="discountName"
          value={formik.values.discountName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.discountName}
          touched={formik.touched.discountName}
        />
        <CustomInput
          type="text"
          placeholder="Enter Discount Percentage"
          label="Discount Percentage"
          name="discountPercentage"
          value={formik.values.discountPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.discountPercentage}
          touched={formik.touched.discountPercentage}
        />
        <CustomInput
          type="text"
          placeholder="Enter Coupon Code"
          label="Coupon Code"
          name="couponCode"
          value={formik.values.couponCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.couponCode}
          touched={formik.touched.couponCode}
        />
        {parseInt(formik.values.discountType) === 4 && (
          <div className={style.addNewStudioinputBox}>
            <label htmlFor="UserName">User Name</label>
            <SearchSelectInput
              placeholder="Select users"
              fetchOptions={fetchUserList}
              onChange={handleUserChange}
              mode="multiple"
              defaultValue={formik.values.searchUser}
              style={{
                width: "100%",
              }}
            />
            {formik.errors.specialUsers && formik.touched.specialUsers && (
              <p className={style.error}>{formik.errors.specialUsers}</p>
            )}
          </div>
        )}
        {parseInt(formik.values.discountType) === 2 && (
          <CustomRangePicker
            label={"Discount Date"}
            id={"discountDate"}
            htmlFor={"discountDate"}
            value={formik.values.discountDate}
            onChange={(date) => formik.setFieldValue("discountDate", date)}
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
          value={formik.values.discountType}
          disabled={editMode.current}
          readonly={true}
          onChange={(e) => formik.setFieldValue("discountType", e.target.value)}
          error={formik.errors.discountType}
          touched={formik.touched.discountType}
        />
        <CustomInput
          type="text"
          placeholder="Enter Max. Cap Amount"
          label="Max. Cap Amount"
          name="maxCapAmount"
          value={formik.values.maxCapAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.maxCapAmount}
          touched={formik.touched.maxCapAmount}
        />
        <CustomTextArea
          type="text"
          placeholder="Enter Description"
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description}
          touched={formik.touched.description}
        />
      </div>
    </form>
  );
}

export default AddNewDiscount;
