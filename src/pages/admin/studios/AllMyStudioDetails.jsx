import React, { useEffect, useMemo, useState } from "react";
// import { Alert } from "antd";
import axios from "axios";
// import Cookies from "js-cookie";

// import "../studios/studios.css";

import style from "../studios/studio.module.css";

// import data from "../studios/mock-data.json";

// components

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
import { partnerAccess } from "../../../config/partnerAccess";
import MyStudioApi from "../../../services/MyStudioApi";
import MyStudioDetails from "./MyStudioDetails";

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

function AllMyStudioDetails() {
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
  const [navAccess, setnavAccess] = useState(partnerAccess || "");
  useEffect(() => {
    if (navAccess) {
      setBookingPageCount("c1");
    } else {
      if (pathname.includes("/Apps&More/studio")) {
        setBookingPageCount("c1");
      } else if (pathname.includes("/Apps&More/musicproduction")) {
        setBookingPageCount("c2");
      } else if (pathname.includes("/Apps&More/mixmaster")) {
        setBookingPageCount("c3");
      }
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

  useEffect(() => {
    console.log("bookingPageCount-----", bookingPageCount);
    setProducts([]);
    MyStudioApi.getStudios()
      .then((response) => {
        console.log(
          "response.=================@@@@@@@@@@@@@@@@@@@@.studios",
          response.studio
        );
        if (response) {
          setProducts(response?.studio);
          setTotalPage(response?.paginate?.totalPages);

          // setPageCount(response.paginate.page);
        }
      })
      .catch((error) => {
        console.error("Error fetching studios:", error);
      });
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
          loaderText={loaderText}
          showBtnLoader={showBtnLoader}
        />
        {bookingPageCount === "c1" ? (
          <MyStudioDetails
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
          ""
        ) : bookingPageCount === "c3" ? (
          ""
        ) : (
          <Artist />
        )}
      </div>
    </>
  );
}

export default AllMyStudioDetails;
