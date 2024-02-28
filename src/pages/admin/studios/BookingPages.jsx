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
import bookingPageApi from "../../../services/bookingPageApi";

function BookingPages() {
  const [bookingPageCount, setBookingPageCount] = useState("c1");
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    console.log("bookingPageCount-----", bookingPageCount);
    setProducts([]);

    if (bookingPageCount === "c2" || bookingPageCount === "c4") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c2";

      bookingPageApi
        .musicProduction("100", idToUse, 1)
        .then((response) => {
          console.log("====================> response C2", response);
          if (response.status) {
            setProducts(response.services.results);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else if (bookingPageCount === "c1") {
      const limit = 64;
      const active = 1;
      // const type = bookingPageCount;
      bookingPageApi
        .getBookings(limit, active)
        .then((response) => {
          console.log("====================> response C1", response);
          if (response.status) setProducts(response.studios.results);
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    }
  }, [bookingPageCount]);
  return (
    <>
      <div className={style.allStudioDetailsPage}>
        <BookingActionBar
          bookingPageCount={bookingPageCount}
          setBookingPageCount={setBookingPageCount}
        />
        {bookingPageCount === "c1" ? (
          <StudioBookingDetail products={products} setProducts={setProducts} />
        ) : // <AllStudioDetail />
        bookingPageCount === "c2" ? (
          <MusicProduction products={products} setProducts={setProducts} />
        ) : bookingPageCount === "c3" ? (
          <Artist />
        ) : (
          <MixMaster products={products} setProducts={setProducts} />
        )}
      </div>
    </>
  );
}

export default BookingPages;
