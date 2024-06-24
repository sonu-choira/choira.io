import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaRegBell } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import WebDashboard2 from "../../pages/produce/WebDashBoard2";
import StudioFooter from "../adminStudio/StudioFooter";
import timeSlotApi from "../../services/timeSlotApi";
import style from "../../pages/admin/studios/studio.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../pages/admin/layout/CustomInput";
import { armSchema } from "../../schemas"; // Adjust the path

function AddNewArm({ setSelectTab }) {
  const timeSlotApiData = useRef({
    userName: "",
    mobile: "",
    email: "",
    permission: [],
    password: "",
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      userName: "",
      mobile: "",
      email: "",
      permission: [],
      password: "",
    },
    validationSchema: armSchema,
    onSubmit: (values) => {
      console.log(values);
      alert("form submitted");
    },
  });

  console.log(values);

  const [selectedData, setSelectedData] = useState([]);
  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const [allStudio, setAllStudio] = useState([]);
  const [showAllSlots, setshowAllSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStudioid, setselectedStudioid] = useState("");
  const [selectRooms, setselectRooms] = useState([]);
  const [allTimeSlots, setallTimeSlots] = useState({});
  const navigate = useNavigate();

  const checkboxdata = [
    "Dashboard",
    "Team",
    "User",
    "App & more",
    "Bookings",
    "Transactions",
    "Promotions",
    "Notifications",
  ];

  useEffect(() => {
    timeSlotApi
      .getonlyStudio()
      .then((res) => setAllStudio(res.studios))
      .catch((err) => console.log(err));
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFieldValue(
      "permission",
      checked
        ? [...values.permission, name]
        : values.permission.filter((item) => item !== name)
    );
  };

  useEffect(() => {
    timeSlotApiData.current.permission = values.permission;
  }, [values.permission]);

  const backOnclick = () => {
    navigate("/adminDashboard/Teams/StudioPatners");
  };

  const handelStudioid = (e) => {
    let id = e.target.value;
    setselectedStudioid(id);
    timeSlotApiData.current.studioId = id;
    let selectedStudio = allStudio.find((studio) => studio._id === id);
    setselectRooms(selectedStudio ? selectedStudio.roomsDetails : []);
  };

  const hitapi = () => {
    timeSlotApi
      .getAllSolts(timeSlotApiData.current)
      .then((res) => {
        setshowAllSlots(true);
        setallTimeSlots(res);
      })
      .catch((err) => console.log(err));
  };

  const sendTimeSlotDataToApi = (event) => {
    event.preventDefault();
    for (let key of Object.keys(timeSlotApiData.current)) {
      if (timeSlotApiData.current[key] === "") {
        alert(`Please fill ${key} fields`);
        return;
      }
    }
    hitapi();
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
          <div className={style.addNewStudioTitle}>Add New ARM</div>

          <div className={style.addNewStudioPage}>
            <div style={{ height: "85%" }}>
              <div>
                <CustomInput
                  htmlFor="UserName"
                  id="UserName"
                  name="userName"
                  placeholder="Enter Fullname Name"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={"User Full Name"}
                  error={errors.userName}
                  touched={touched.userName}
                />
                <CustomInput
                  type="email"
                  id="Email"
                  name="email"
                  placeholder="Enter Email id"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  htmlFor="Email"
                  label={"Email"}
                  error={errors.email}
                  touched={touched.email}
                />
                <label htmlFor="" className={style.label}>
                  Permission
                </label>
                <div className={style.permissionCheckboxDiv}>
                  {checkboxdata.map((item, index) => (
                    <div
                      key={index}
                      className={style.permissionMainCheckboxDiv}
                    >
                      <input
                        type="checkbox"
                        name={item}
                        id={item}
                        value={values.item}
                        checked={values.permission.includes(item)}
                        onChange={handleCheckboxChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </div>
                {errors.permission && touched.permission ? (
                  <p className={style.error}>{errors.permission}</p>
                ) : null}
              </div>
              <div>
                <CustomInput
                  type="text"
                  id="Mobilenumber"
                  name="mobile"
                  placeholder="Enter Mobile number"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={"Mobile Number"}
                  error={errors.mobile}
                  touched={touched.mobile}
                />
                <CustomInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  htmlFor="password"
                  label={" Password"}
                  error={errors.password}
                  touched={touched.password}
                />
              </div>
            </div>
          </div>
          <StudioFooter backOnclick={backOnclick} saveType={"submit"} />
        </form>
      </div>
    </>
  );
}

export default AddNewArm;
