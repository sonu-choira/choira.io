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
import { useNavigate, useParams } from "react-router-dom";
import ASMusicProduction from "../../../components/adminStudio/appsAndMore/ASMusicProduction";
import ASMixandMaster from "../../../components/adminStudio/appsAndMore/ASMixandMaster";
import AllStudioDetail2 from "../../../components/adminStudio/appsAndMore/AllStudioDetail2";
import WebDashboard2 from "../../produce/WebDashBoard2";
import { useLocation } from "react-router-dom";

// services
import Appapi from "../../../services/appAndmoreApi";
import appAndmoreApi from "../../../services/appAndmoreApi";

let sendFilterDataToapi = {
  minPricePerHour: "",
  maxPricePerHour: "",
  city: "",
  totalRooms: "",
  active: "",
  searchText: "",
  creationTimeStamp: "",
  sortBy: "",
};

function AllStudioPageDetailsPage() {
  const [bookingPageCount, setBookingPageCount] = useState("c0");
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  let loaderText = "Downloading ...";

  // let { page: paramData } = useParams();
  // console.log("paramData", paramData);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("/Apps&More/studio")) {
      setBookingPageCount("c1");
    } else if (pathname.includes("/Apps&More/musicproduction")) {
      setBookingPageCount("c2");
    } else if (pathname.includes("/Apps&More/mixmaster")) {
      setBookingPageCount("c3");
    }
  }, [pathname, bookingPageCount]);

  const navigate = useNavigate();
  const gotoSignin = () => {
    navigate("/signin");
  };

  let hasFilter = false;

  useEffect(() => {
    console.log("sendFilterDataToapi", sendFilterDataToapi);
  }, [sendFilterDataToapi]);

  let downloadAllData = () => {
    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c3";
      let tempData = { ...sendFilterDataToapi };

      delete tempData.serviceType;
      tempData.type = idToUse;
      setShowBtnLoader(true);
      appAndmoreApi
        .downloadServiceData(tempData)
        .then((response) => {
          console.log("data download", response);
          setShowBtnLoader(false);
        })
        .catch((error) => {
          console.error("Error download studio:", error);
          setShowBtnLoader(false);
        });
    } else {
      let tempData = { ...sendFilterDataToapi };
      delete tempData.sortBy;
      delete tempData.page;
      setShowBtnLoader(true);

      appAndmoreApi
        .downloadData(tempData)
        .then((response) => {
          setShowBtnLoader(false);

          console.log("data download:", response);
        })
        .catch((error) => {
          setShowBtnLoader(false);

          console.error("Error filter studio:", error);
        });
    }
  };

  useEffect(() => {
    console.log("bookingPageCount-----", bookingPageCount);
    setProducts([]);
    // checking if filter has any data
    for (const key in sendFilterDataToapi) {
      if (sendFilterDataToapi[key]) {
        hasFilter = true;
        break;
      }
    }

    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c3";

      if (hasFilter) {
        console.log("sendFilterDataToapi", sendFilterDataToapi);
        // alert("filter");
        sendFilterDataToapi.page = pageCount;
        sendFilterDataToapi.serviceType = idToUse;
        appAndmoreApi
          .filterServiceData(sendFilterDataToapi)
          .then((response) => {
            console.log("filter applied:", response);
            setProducts(response.services.results);
            setTotalPage(response.paginate.totalPages);
            setfilterNav(true);
          })
          .catch((error) => {
            console.error("Error filter studio:", error);
          });
      } else {
        const idToUse = bookingPageCount === "c2" ? "c2" : "c3";
        // alert("main");

        Appapi.getServices("10", idToUse, 1, pageCount)
          .then((response) => {
            console.log(
              `====================> response ${bookingPageCount}`,
              response
            );
            if (response.status) {
              setProducts(response.services.results);
              console.log("lkasdnflkjsdnf", response.status);
              setTotalPage(response.paginate.totalPages);
            }
          })
          .catch((error) => {
            console.error("Error fetching studios:", error);
          });
      }
    } else if (bookingPageCount === "c1") {
      const limit = 64;
      const active = 1;
      // const type = bookingPageCount;
      if (hasFilter) {
        delete sendFilterDataToapi.serviceType;
        sendFilterDataToapi.page = pageCount;
        appAndmoreApi
          .filterData(sendFilterDataToapi)
          .then((response) => {
            console.log("filter applied:", response);
            setProducts(response.studios);
            setTotalPage(response.paginate.totalPages);
          })
          .catch((error) => {
            console.error("Error filter studio:", error);
          });
      } else {
        Appapi.getStudios(limit, active, pageCount)
          .then((response) => {
            console.log(
              `====================> response ${bookingPageCount}`,
              response
            );
            console.log("response.data.studios", response.studios);
            if (response.studios) {
              setProducts(response.studios);
              setTotalPage(response.paginate.totalPages);

              // setPageCount(response.paginate.page);
            }
          })
          .catch((error) => {
            console.error("Error fetching studios:", error);
          });
      }
    }
  }, [bookingPageCount, pageCount]);
  const pagetype = "apps";

  return (
    <>
      <div
        className={style.allStudioDetailsPage}
        // style={{ border: "2px solid red" }}
      >
        <BookingActionBar
          pagetype={pagetype}
          bookingPageCount={bookingPageCount}
          setBookingPageCount={setBookingPageCount}
          downloadAllData={downloadAllData}
          loaderText={loaderText}
          showBtnLoader={showBtnLoader}
        />
        {bookingPageCount === "c1" ? (
          <AllStudioDetail2
            sendFilterDataToapi={sendFilterDataToapi}
            products={products}
            setProducts={setProducts}
            totalPage={totalPage}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            bookingPageCount={bookingPageCount}
            filterNav={filterNav}
            setfilterNav={setfilterNav}
          />
        ) : // <AllStudioDetail />
        bookingPageCount === "c2" ? (
          <ASMusicProduction
            products={products}
            setProducts={setProducts}
            totalPage={totalPage}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            bookingPageCount={bookingPageCount}
            filterNav={filterNav}
            sendFilterDataToapi={sendFilterDataToapi}
          />
        ) : bookingPageCount === "c3" ? (
          <ASMixandMaster
            products={products}
            setProducts={setProducts}
            totalPage={totalPage}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            bookingPageCount={bookingPageCount}
            filterNav={filterNav}
            sendFilterDataToapi={sendFilterDataToapi}
          />
        ) : (
          <Artist />
        )}
      </div>
    </>
  );
}

export default AllStudioPageDetailsPage;
