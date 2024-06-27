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

function AddNewStudioPartners({ setSelectTab }) {
  const [allStudio, setAllStudio] = useState([]);
  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const [showAllSlots, setshowAllSlots] = useState(false);
  const navigate = useNavigate();
  const hitapi = (partnerData) => {
    teamsApi
      .addStudioPartner(partnerData)
      .then((res) => {
        if (res.status) {
          sucessAlret("Studio Partner Successfully Added");
        } else {
          errorAlert(res.message);
        }
        console.log(res);
      })
      .catch((err) => {
        errorAlert("something went wrong");
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      studioId: "",
      password: "",
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
    navigate("/adminDashboard/Teams/StudioPartners");
  };

  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2
          navCount={navCount}
          tabCount={tabCount}
          setTabCount={setTabCount}
        />
        <form className={style.studioMainScreen} onSubmit={handleSubmit}>
          <div className={style.studioHeader}>
            <div>
              <input type="text" placeholder="search" />
            </div>
            <div>
              <IoSearch />
            </div>
            <div>
              <div className={style.notifyIcon}>
                <GoDotFill />
              </div>
              <FaRegBell />
            </div>
            <div>
              <MdOutlineSettings />
            </div>
          </div>
          <div className={style.addNewStudioTitle}>Add Studio Partner</div>

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
                  error={errors.firstName}
                  touched={touched.firstName}
                  onBlur={handleBlur}
                />
                <CustomInput
                  type="email"
                  id="Email"
                  placeholder="Enter Email id"
                  label="Email"
                  htmlFor="Email"
                  onChange={handleChange}
                  name="email"
                  error={errors.email}
                  touched={touched.email}
                  onBlur={handleBlur}
                />
                <div className={style.addNewStudioinputBox}>
                  <label>Studio</label>
                  <select
                    onChange={handleChange}
                    name="studioId"
                    value={values.studioId}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>
                      Select Studio
                    </option>
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
                  onBlur={handleBlur}
                />
                <CustomInput
                  type="text"
                  id="password"
                  placeholder="Enter Password"
                  label="Enter Password"
                  htmlFor="password"
                  name="password"
                  onChange={handleChange}
                  error={errors.password}
                  touched={touched.password}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </form>
          <StudioFooter
            backOnclick={backOnclick}
            // saveOnclick={handleSubmit}
            saveType="submit"
          />
        </form>
      </div>
    </>
  );
}

export default AddNewStudioPartners;
