import React, { useEffect, useState } from "react";
import { MdAddAPhoto, MdOutlineSettings } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";

import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";
import WebDashboard2 from "../../pages/produce/WebDashBoard2";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import timeSlotApi from "../../services/timeSlotApi";
import { event, send } from "react-ga";
import StudioFooter from "../adminStudio/StudioFooter";
import teamsApi from "../../services/teamsApi";

import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";
import { useFormik } from "formik";
import CustomInput from "../../pages/admin/layout/CustomInput";
import { studioPartner } from "../../schemas";
import * as Yup from "yup";
import dynamicNav from "../../utils/dynamicNav";

function AddNewStudioPartners({ setSelectTab }) {
  const [allStudio, setAllStudio] = useState([]);
  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const [showAllSlots, setshowAllSlots] = useState(false);
  const navigate = useNavigate();

  // console.log(data.state.productData);
  let editData = data?.state?.productData;
  console.log(data);
  let isEditMode = data?.state?.isEditMode;
  let showMode = data?.state?.showMode;
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const hitapi = (partnerData) => {
    let data = { ...partnerData };
    delete data.ownerImage;
    delete data.password;
    delete data.studioCity;
    Object.keys(data).forEach((key) => {
      console.log(data[key]);

      if (data[key] === "") {
        errorAlert("fill data");
        return;
      }
    });
    if (isEditMode) {
      setShowButtonLoader(true);
      teamsApi
        .updateStudioPartner(partnerData._id, partnerData)
        .then((response) => {
          console.log("response=======>", response);
          if (response.status) {
            sucessAlret(
              response.message || "Studio Partner Updated Successfully"
            );
            navigate(-1);
            setShowButtonLoader(false);
            // navigate("/studio/studio-partners");
          }
        })
        .catch((error) => {
          errorAlert(error || "Something went wrong");
          setShowButtonLoader(false);
        });
    } else {
      setShowButtonLoader(true);
      teamsApi
        .addStudioPartner(partnerData)
        .then((res) => {
          if (res.status) {
            sucessAlret("Studio Partner Successfully Added");
            navigate(-1);
            setShowButtonLoader(false);
          } else {
            errorAlert(res.message);
            setShowButtonLoader(false);
          }
          console.log(res);
        })
        .catch((err) => {
          errorAlert("something went wrong");
          setShowButtonLoader(false);
          console.log(err);
        });
    }
  };

  const formik = useFormik({
    initialValues:
      isEditMode || showMode
        ? editData
        : {
            firstName: "",
            lastName: "",
            email: "",
            studioId: "",
            phone: "",
            dob: "",
          },

    validationSchema: studioPartner,
    onSubmit: (values) => {
      hitapi(values);
      console.log(values);
      // navigate("/adminDashboard/Teams/StudioPartners");
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  useEffect(() => {
    teamsApi
      .getStudioPartner()
      .then((res) => {
        console.log(res.studios);
        setAllStudio(res.studios);
      })
      .catch((err) => console.log(err));
  }, []);

  const backOnclick = () => {
    navigate(`/${dynamicNav}/Teams/StudioPartners`);
  };
  useEffect(() => {
    console.log("..........", values);
  }, [values]);
  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2
          navCount={navCount}
          tabCount={tabCount}
          setTabCount={setTabCount}
        />
        <form className={style.studioMainScreen} onSubmit={handleSubmit}>
          <div className={style.addNewStudioTitle}>
            {isEditMode
              ? "Edit Studio Partner"
              : showMode
              ? "Studio Partner Details"
              : "Add Studio Partner"}
          </div>

          <form className={style.addNewStudioPage}>
            <div style={{ height: "80%" }}>
              <div>
                <CustomInput
                  type="text"
                  id="firstName"
                  placeholder="Enter Full Name"
                  label="User First Name"
                  htmlFor="firstName"
                  onChange={handleChange}
                  name="firstName"
                  value={values.firstName}
                  error={errors.firstName}
                  touched={touched.firstName}
                  onBlur={handleBlur}
                  disabled={showMode}
                />
                <CustomInput
                  type="email"
                  id="Email"
                  placeholder="Enter Email id"
                  label="Email"
                  htmlFor="Email"
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  onBlur={handleBlur}
                  disabled={showMode}
                />
                <div className={style.addNewStudioinputBox}>
                  <label>Studio</label>
                  <select
                    onChange={handleChange}
                    name="studioId"
                    value={values.studioId}
                    onBlur={handleBlur}
                    disabled={showMode}
                  >
                    <option value="" disabled>
                      Select Studio
                    </option>
                    {(isEditMode || showMode) && (
                      <option value={editData.studioId}>
                        {editData.studioName}
                      </option>
                    )}
                    {allStudio?.map((studio) => (
                      <option key={studio._id} value={studio._id}>
                        {studio.fullName}
                      </option>
                    ))}
                  </select>
                  {touched.studioId && errors.studioId && (
                    <div className={style.error}>{errors.studioId}</div>
                  )}
                </div>
              </div>
              <div>
                <CustomInput
                  type="text"
                  id="lastName"
                  placeholder="Enter Last Name"
                  label="Last Name"
                  htmlFor="lastName"
                  name="lastName"
                  onChange={handleChange}
                  error={errors.lastName}
                  touched={touched.lastName}
                  value={values.lastName}
                  onBlur={handleBlur}
                  disabled={showMode}
                />
                <CustomInput
                  type="number"
                  id="mobile"
                  placeholder="Mobile Number"
                  label="Enter mobile number"
                  htmlFor="mobile"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  touched={touched.phone}
                  onBlur={handleBlur}
                  disabled={showMode}
                />
                <CustomInput
                  type="date"
                  id="date
                  "
                  placeholder="Mobile Number"
                  label="Enter Date of Birth "
                  htmlFor="date"
                  value={values.dob}
                  name="dob"
                  onChange={handleChange}
                  error={errors.dob}
                  touched={touched.dob}
                  onBlur={handleBlur}
                  disabled={showMode}
                />
              </div>
            </div>
          </form>
          <StudioFooter
            backOnclick={backOnclick}
            // saveOnclick={handleSubmit}
            saveType="submit"
            saveDisabled={showMode}
            showBtnLoader={showButtonLoader}
            loaderText={"saving..."}
          />
        </form>
      </div>
    </>
  );
}

export default AddNewStudioPartners;
