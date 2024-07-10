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

function BookingPages() {
  const [bookingPageCount, setBookingPageCount] = useState("c0");
  const [products, setProducts] = useState([]);
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
  }, [pathname,bookingPageCount]);

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

      bookingPageApi
        .musicProduction("100", idToUse, 1)
        .then((response) => {
          console.log(
            `====================> response ${bookingPageCount} `,
            response
          );
          if (response.data) {
            setProducts(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else if (bookingPageCount === "c1") {
      const limit = 1000;
      const active = 1;
      const bookingType = 1;
      const category = bookingPageCount;
      // const type = bookingPageCount;
      bookingPageApi
        .getBookings(limit, active, bookingType, category)
        .then((response) => {
          console.log("====================> response C1", response);
          if (response.data) {
            setProducts(response.data);
            console.log("pagekaDetail", response);
          }
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
          <StudioBookingDetail
            products={products}
            setProducts={setProducts}
            handleChange={handleChange}
            getStatusColor={getStatusColor}
          />
        ) : // <AllStudioDetail />
        bookingPageCount === "c2" ? (
          <MusicProduction
            products={products}
            setProducts={setProducts}
            handleChange={handleChange}
            getStatusColor={getStatusColor}
          />
        ) : bookingPageCount === "c3" ? (
          <MixMaster
            products={products}
            setProducts={setProducts}
            handleChange={handleChange}
            getStatusColor={getStatusColor}
          />
        ) : (
          <Artist />
        )}
      </div>
    </>
  );
}

export default BookingPages;
