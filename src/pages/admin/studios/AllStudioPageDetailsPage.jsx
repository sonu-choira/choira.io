import React, { useEffect, useMemo, useState } from "react";
// import { Alert } from "antd";
import axios from "axios";
// import Cookies from "js-cookie";

// import "../studios/studios.css";
import { IoSearch } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import style from "../studios/studio.module.css";

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

// components
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
import ASMusicProduction from "../../../components/adminStudio/appsAndMore/ASMusicProduction";
import ASMixandMaster from "../../../components/adminStudio/appsAndMore/ASMixandMaster";
import AllStudioDetail2 from "../../../components/adminStudio/appsAndMore/AllStudioDetail2";
import WebDashboard2 from "../../produce/WebDashBoard2";

// services
import Appapi from "../../../services/appAndmoreApi";

function AllStudioPageDetailsPage() {
  const [bookingPageCount, setBookingPageCount] = useState("c1");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const gotoSignin = () => {
    navigate("/signin");
  };

  useEffect(() => {
    console.log("bookingPageCount-----", bookingPageCount);

    if (bookingPageCount === "c2" || bookingPageCount === "c4") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c2";

      Appapi.getServices("100", idToUse, 1)
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
      Appapi.getStudios(limit, active)
        .then((response) => {
          console.log("====================> response C1", response);
          if (response.status) setProducts(response.studios.results);
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    }
  }, [bookingPageCount]);
  const pagetype = "apps";

  return (
    <>
      <div className={style.allStudioDetailsPage}>
        <BookingActionBar
          pagetype={pagetype}
          bookingPageCount={bookingPageCount}
          setBookingPageCount={setBookingPageCount}
        />
        {bookingPageCount === "c1" ? (
          <AllStudioDetail2 products={products} setProducts={setProducts} />
        ) : // <AllStudioDetail />
        bookingPageCount === "c2" ? (
          <ASMusicProduction products={products} setProducts={setProducts} />
        ) : bookingPageCount === "c3" ? (
          <Artist />
        ) : (
          <ASMixandMaster products={products} setProducts={setProducts} />
        )}
      </div>
    </>
  );
}

export default AllStudioPageDetailsPage;
