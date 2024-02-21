import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
// import "../studios/studios.css";
import style from "../studios/studio.module.css";
import { IoSearch } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { FaRegBell } from "react-icons/fa6";
import { MdCalendarMonth, MdOutlineSettings } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { LuFilePlus } from "react-icons/lu";
import Pagination from "./Pagination";
// import data from "../studios/mock-data.json";
import Button from "../layout/Button";
import { FaTableCellsLarge } from "react-icons/fa6";
import Switch from "../layout/Switch";
import OnboardStudio from "../../../components/adminStudio/OnboardStudio";
import AllStudioDetail from "../../../components/adminStudio/AllStudioDetail";
import StudioFooter from "../../../components/adminStudio/StudioFooter";
import upload from "../../../assets/img/upload.png";
import AddNewStudio from "../../../components/adminStudio/AddNewStudio";
import AddNewRoom from "../../../components/adminStudio/AddNewRoom";
import StudioBookingDetail from "../../../components/adminStudio/booking/StudioBookingDetail";
import MusicProduction from "../../../components/adminStudio/booking/MusicProduction";
import MixMaster from "../../../components/adminStudio/booking/MixMaster";
import Artist from "../../../components/adminStudio/booking/Artist";
import BookingActionBar from "../../../components/adminStudio/booking/BookingActionBar";
import { useNavigate } from "react-router-dom";
import WebDashboard2 from "../../produce/WebDashBoard2";

function BookingPages() {
  const [bookingPageCount, setBookingPageCount] = useState("c2");
  const navigate = useNavigate();
  const gotoSignin = () => {
    navigate("/signin");
  };
  // const storedIsSignin = localStorage.getItem("isSignin");
  // const storedAlert = localStorage.getItem("alertShown");
  // useEffect(() => {
  //   if (storedIsSignin) {
  //     if (storedAlert) {
  //     } else {
  //       alert("Welcome Admin 😊");
  //       localStorage.setItem("alertShown", "true");
  //     }
  //   } else {
  //     gotoSignin();
  //   }
  // }, []);
  return (
    <>
      <div className={style.allStudioDetailsPage}>
        <BookingActionBar
          bookingPageCount={bookingPageCount}
          setBookingPageCount={setBookingPageCount}
        />
        {bookingPageCount == "c1" ? (
          <StudioBookingDetail />
        ) : // <AllStudioDetail />
        bookingPageCount == "c2" ? (
          <MusicProduction />
        ) : bookingPageCount == "c3" ? (
          <MixMaster />
        ) : (
          <Artist />
        )}
      </div>
    </>
  );
}

export default BookingPages;
