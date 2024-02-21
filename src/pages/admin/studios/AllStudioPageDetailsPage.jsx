import React, { useEffect, useMemo, useState } from "react";
// import { Alert } from "antd";
import axios from "axios";
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
import ASMusicProduction from "../../../components/adminStudio/allStudio/ASMusicProduction";
import ASMixandMaster from "../../../components/adminStudio/allStudio/ASMixandMaster";
import AllStudioDetail2 from "../../../components/adminStudio/allStudio/AllStudioDetail2";
import WebDashboard2 from "../../produce/WebDashBoard2";
// import Cookies from "js-cookie";

function AllStudioPageDetailsPage() {
  const [bookingPageCount, setBookingPageCount] = useState("c1");
  const [products, setProducts] = useState([]);
  // const [token, setToken] = useState();
  // const [token, setToken] = useState();

  // useEffect(() => {
  //   const checkCookie = Cookies.get("userToken");
  //   setToken(checkCookie);

  //   console.log(token);
  // }, []);

  const navigate = useNavigate();
  const gotoSignin = () => {
    navigate("/signin");
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("bookingPageCount-----", bookingPageCount);

    if (bookingPageCount === "c2" || bookingPageCount === "c4") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c2";

      axios
        .get("https://test.api.choira.io/api/services", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer debugTest",
            "Content-Type": "application/json",
          },
          params: {
            limit: 10,
            active: 1,
            serviceType: idToUse, // Use the corrected id variable
          },
        })
        .then((response) => {
          console.log(response);
          const data = response;
          if (data && data.data.services.results) {
            setProducts(data.data.services.results);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else if (bookingPageCount === "c1") {
      console.log(`got your token id ------------------- ${token}`);
      axios
        .get(
          "https://test.api.choira.io/api/studios-all?limit=61",

          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer debugTest`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          const data = response;
          if (data && data.data.studios.results) {
            setProducts(data.data.studios.results);
          }
        });
    }
  }, [bookingPageCount]);
  const pagetype = "apps";

  return (
    <>
      <div className={style.allStudioDetailsPage}>
        <BookingActionBar
          page
          bookingPageCount={bookingPageCount}
          setBookingPageCount={setBookingPageCount}
        />
        {bookingPageCount == "c1" ? (
          <AllStudioDetail2 products={products} setProducts={setProducts} />
        ) : // <AllStudioDetail />
        bookingPageCount == "c2" ? (
          <ASMusicProduction products={products} setProducts={setProducts} />
        ) : bookingPageCount == "c3" ? (
          <Artist />
        ) : (
          <ASMixandMaster products={products} setProducts={setProducts} />
        )}
      </div>
    </>
  );
}

export default AllStudioPageDetailsPage;
