import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
// import "../studios/studios.css";
import style from "../studios/studio.module.css";

import StudioBookingDetail from "../../../components/adminStudio/booking/StudioBookingDetail";
import MusicProduction from "../../../components/adminStudio/booking/MusicProduction";
import MixMaster from "../../../components/adminStudio/booking/MixMaster";
import Artist from "../../../components/adminStudio/booking/Artist";
import BookingActionBar from "../../../components/adminStudio/booking/BookingActionBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WebDashboard2 from "../../produce/WebDashBoard2";
import bookingPageApi from "../../../services/bookingPageApi";
import { clearEmptyField } from "../../../utils/helperFunction";
let sendFilterDataToapi = {
  limit: 8,
  bookingType: "",
  category: "",
  startDate: "",
  endDate: "",
  searchField: "",
  pageCount: 1,
};
// let hasFilter = false;
function BookingPages() {
  const [bookingPageCount, setBookingPageCount] = useState("c0");
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [showBtnLoader, setShowBtnLoader] = useState(false);

  // let { page: paramData } = useParams();

  // setBookingPageCount("c2");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("/Bookings/studio")) {
      setBookingPageCount("c1");
    } else if (pathname.includes("/Bookings/musicproduction")) {
      setBookingPageCount("c2");
    } else if (pathname.includes("/Bookings/mixmaster")) {
      setBookingPageCount("c3");
    }
  }, [pathname, bookingPageCount]);

  const navigate = useNavigate();
  const gotoSignin = () => {
    navigate("/signin");
  };

  const handleChange = async (productId, event) => {
    /// api
    try {
      const updateddata = products.map((prd) => {
        if (prd._id === productId) {
          prd.bookingStatus = parseInt(event.target.value);
          console.log(" prd.status", prd.bookingStatus);
        }
        return prd;
      });
      const response = await bookingPageApi.updateStatus(
        productId,
        event.target.value
      );

      if (response.status) {
        // Assuming response.data is an array of updated products
        // setProducts(response.data);

        setProducts(updateddata);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }

    // console.log(updateddata);
  };

  const getStatusColor = (status) => {
    status = parseInt(status);
    switch (status) {
      case 2:
        return "#FFDDDD";
      // case "Pending":
      //   return "#CAE2FF";
      case 1:
        return "#DDFFF3";
      case 0:
        return "#FFF3CA";
      default:
        return "";
    }
  };

  // {-------  this code is end of  update color of selected  action ---------}
  useEffect(() => {
    console.log("bookingPageCount-----", bookingPageCount);
    setProducts([]);

    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      // Corrected the id assignments
      const idToUse = bookingPageCount === "c2" ? "c2" : "c3";

      let data = {
        limit: 8,

        category: idToUse,
        pageCount: pageCount,
      };

      bookingPageApi
        .musicProduction(data)
        .then((response) => {
          console.log(
            `====================> response ${bookingPageCount} `,
            response
          );
          if (response.data) {
            setProducts(response.data);
            setTotalPage(response.paginate.totalPages);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else if (bookingPageCount === "c1") {
      // for (const key in sendFilterDataToapi) {
      //   if (sendFilterDataToapi[key]) {
      //     hasFilter = true;
      //     break;
      //   }

      const limit = 8;
      // const active = "";
      const bookingType = 1;
      const category = bookingPageCount;
      // let data = {
      //   limit: 6,
      //   bookingType: -1,
      //   category: bookingPageCount,
      //   pageCount: pageCount,
      // };
      sendFilterDataToapi.category = bookingPageCount;
      sendFilterDataToapi.pageCount = pageCount;

      // const type = bookingPageCount;
      clearEmptyField(sendFilterDataToapi);
      bookingPageApi
        .getBookings(sendFilterDataToapi)
        .then((response) => {
          console.log("====================> response C1", response);
          if (response.data) {
            setProducts(response.data);
            setTotalPage(response.paginate.totalPages);
            console.log("pagekaDetail", response);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    }
  }, [bookingPageCount, pageCount]);
  return (
    <>
      <div className={style.allStudioDetailsPage}>
        <BookingActionBar
          bookingPageCount={bookingPageCount}
          setBookingPageCount={setBookingPageCount}
          setShowBtnLoader={setShowBtnLoader}
          showBtnLoader={showBtnLoader}
          loaderText={"Downloading ..."}
        />
        {bookingPageCount === "c1" ? (
          <StudioBookingDetail
            products={products}
            setProducts={setProducts}
            // handleChange={handleChange}
            // getStatusColor={getStatusColor}
            // setTotalPage={setTotalPage}
            bookingPageCount={bookingPageCount}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            totalPage={totalPage}
            sendFilterDataToapi={sendFilterDataToapi}
          />
        ) : // <AllStudioDetail />
        bookingPageCount === "c2" ? (
          <MusicProduction
            products={products}
            setProducts={setProducts}
            handleChange={handleChange}
            getStatusColor={getStatusColor}
            bookingPageCount={bookingPageCount}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            totalPage={totalPage}
          />
        ) : bookingPageCount === "c3" ? (
          <MixMaster
            products={products}
            setProducts={setProducts}
            handleChange={handleChange}
            getStatusColor={getStatusColor}
            bookingPageCount={bookingPageCount}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            totalPage={totalPage}
          />
        ) : (
          <Artist />
        )}
      </div>
    </>
  );
}

export default BookingPages;
