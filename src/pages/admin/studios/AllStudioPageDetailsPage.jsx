import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
import axios from "axios";
// import "../studios/studios.css";
import style from "../studios/studio.module.css";
import WebDashboard from "../../produce/WebDashboard";
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
import ASMusicProduction from "../../../components/adminStudio/allStudio/ASMusicProduction";
import ASMixandMaster from "../../../components/adminStudio/allStudio/ASMixandMaster";
import AllStudioDetail2 from "../../../components/adminStudio/allStudio/AllStudioDetail2";

function AllStudioPageDetailsPage() {
  const [bookingPageCount, setBookingPageCount] = useState("c4");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const gotoSignin = () => {
    navigate("/signin");
  };

  useEffect(() => {
    console.log("bookingPageCount-----", bookingPageCount);
    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      axios
        .get("https://test.api.choira.io/api/services", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer debugTest",
          },
          params: {
            limit: 10,
            active: 1,
            catId: "c3",
          },
        })
        .then((response) => {
          console.log(response);
          const data = response.data;
          if (data && data.studios.results) {
            setProducts(data.studios.results);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [bookingPageCount]);

  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard />
        <div className={style.studioMainScreen}>
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
          <div className={style.allStudioDetailsPage}>
            <BookingActionBar
              bookingPageCount={bookingPageCount}
              setBookingPageCount={setBookingPageCount}
            />
            {bookingPageCount == "c1" ? (
              <AllStudioDetail2 />
            ) : // <AllStudioDetail />
            bookingPageCount == "c2" ? (
              <ASMusicProduction />
            ) : bookingPageCount == "c3" ? (
              <Artist />
            ) : (
              <ASMixandMaster />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllStudioPageDetailsPage;
