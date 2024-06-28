import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../pages/admin/studios/studio.module.css";
import CustomInput from "../../pages/admin/layout/CustomInput";
import CustomTextArea from "../../pages/admin/layout/CustomTextArea";
import CustomSelect from "../../pages/admin/layout/CustomSelect";
import CustomRangePicker from "../../pages/admin/layout/CustomRangePicker";
import userApi from "../../services/userApi";
import SearchSelectInput from "../../pages/admin/layout/SearchAndSelectInput";
import { DiscountSchema } from "../../schemas";
import promotionApi from "../../services/promotionApi";
import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";

function AddNewDiscount({
  editData,
  setEditData,
  editMode,
  submitData,
  setSubmitData,
}) {
  const option = {
    "New User Discount": 0,
    "Discount Recurring": 1,
    "Event Based": 2,
    "Special Session": 3,
    "Specific User": 4,
  };

  const hitApi = (sendDataToApi) => {
    if (editMode.current) {
      promotionApi
        .updateDiscount(editData._id, sendDataToApi)
        .then((res) => {
          console.log(res);
          sucessAlret("Discount Updated Successfully");
        })
        .catch((err) => {
          console.log(err);
          errorAlert("Error in updating discount");
        });
    }
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
          discountStartDate: "",
          discountEndDate: "",
        },
    validationSchema: DiscountSchema,
    onSubmit: (values) => {
      console.log(values);
      let sendDataToApi = {};

      Object.keys(values).map((key) => {
        if (`${values[key]}`.length > 0) {
          sendDataToApi[key] = values[key];
        }
      });
      console.log("sendDataToApi", sendDataToApi);
      // hitApi(sendDataToApi);
      hitApi(sendDataToApi);

      // Handle form submission here
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = formik;

  const handleDateChange = (date, dateString) => {
    setFieldValue("discountStartDate", dateString[0]);
    setFieldValue("discountEndDate", dateString[1]);
    console.log(date, dateString);
  };

  useEffect(() => {
    if (editMode.current) {
      setValues(editData);
    }
  }, [editData, editMode, setValues]);

  useEffect(() => {
    if (submitData) {
      handleSubmit();
      setSubmitData(false);
    }
  }, [submitData, handleSubmit, setSubmitData]);

  const handleUserChange = (newValue) => {
    setFieldValue(
      "specialUsers",
      newValue.map((user) => user.value)
    );
    setFieldValue(
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

  return (
    <form className={style.addNewDiscountPage} onSubmit={handleSubmit}>
      <div>
        <CustomInput
          type="text"
          placeholder="Enter Discount Name"
          label="Discount Name"
          name="discountName"
          value={values.discountName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.discountName}
          touched={touched.discountName}
        />
        <CustomInput
          type="text"
          placeholder="Enter Discount Percentage"
          label="Discount Percentage"
          name="discountPercentage"
          value={values.discountPercentage}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.discountPercentage}
          touched={touched.discountPercentage}
        />
        <CustomInput
          type="text"
          placeholder="Enter Coupon Code"
          label="Coupon Code"
          name="couponCode"
          value={values.couponCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.couponCode}
          touched={touched.couponCode}
        />
        {parseInt(values.discountType) === 4 && (
          <div className={style.addNewStudioinputBox}>
            <label htmlFor="UserName">User Name</label>
            <SearchSelectInput
              placeholder="Select users"
              fetchOptions={fetchUserList}
              onChange={handleUserChange}
              name="specialUsers"
              mode="multiple"
              defaultValue={values.searchUser}
              style={{
                width: "100%",
              }}
            />
            {errors.specialUsers && touched.specialUsers && (
              <p className={style.error}>{errors.specialUsers}</p>
            )}
          </div>
        )}
        {parseInt(values.discountType) === 2 && (
          <CustomRangePicker
            label={"Discount Date"}
            id={"discountDate"}
            htmlFor={"discountDate"}
            name={"discountDate"}
            value={values.discountDate}
            onChange={handleDateChange}
          />
        )}
        {errors.discountStartDate && touched.discountStartDate && (
          <p className={style.error}>{errors.discountStartDate}</p>
        )}
        {errors.discountEndDate && touched.discountEndDate && (
          <p className={style.error}>{errors.discountEndDate}</p>
        )}
      </div>
      <div>
        <CustomSelect
          label={"Discount Type"}
          id={"discountType"}
          htmlFor={"discountType"}
          options={option}
          defaultOption={"Select Discount Type"}
          value={values.discountType}
          disabled={editMode.current}
          onChange={(e) => setFieldValue("discountType", e.target.value)}
          error={errors.discountType}
          touched={touched.discountType}
        />
        <CustomInput
          type="text"
          placeholder="Enter Max. Cap Amount"
          label="Max. Cap Amount"
          name="maxCapAmount"
          value={values.maxCapAmount}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.maxCapAmount}
          touched={touched.maxCapAmount}
        />
        <CustomTextArea
          type="text"
          placeholder="Enter Description"
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description}
          touched={touched.description}
        />
      </div>
    </form>
  );
}

export default AddNewDiscount;
