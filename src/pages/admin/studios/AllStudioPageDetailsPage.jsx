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
import { useMutation, useQuery, useQueryClient } from "react-query";

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
  const [totalResult, setTotalResult] = useState();
  const [perPage, setPerPage] = useState(7);
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
  const downloadServiceData = async (data) => {
    const response = await appAndmoreApi.downloadServiceData(data);
    return response;
  };

  const downloadData = async (data) => {
    const response = await appAndmoreApi.downloadData(data);
    return response;
  };

  const { mutate: downloadService, isLoading: isDownloadingService } =
    useMutation(downloadServiceData, {
      onSuccess: (response) => {
        console.log("Service data download:", response);
        setShowBtnLoader(false);
      },
      onError: (error) => {
        console.error("Error downloading service data:", error);
        setShowBtnLoader(false);
      },
    });

  // Mutation for downloading general data
  const { mutate: downloadGeneralData, isLoading: isDownloadingGeneral } =
    useMutation(downloadData, {
      onSuccess: (response) => {
        console.log("General data download:", response);
        setShowBtnLoader(false);
      },
      onError: (error) => {
        console.error("Error downloading general data:", error);
        setShowBtnLoader(false);
      },
    });

  // Function to handle download logic
  const downloadAllData = () => {
    let tempData = { ...sendFilterDataToapi };

    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      // Determine which data to fetch based on bookingPageCount
      const idToUse = bookingPageCount === "c2" ? "c2" : "c3";

      // Prepare data for download
      delete tempData.serviceType;
      tempData.type = idToUse;

      setShowBtnLoader(true);
      downloadService(tempData); // Trigger service data download
    } else {
      // Prepare data for general download
      delete tempData.sortBy;
      delete tempData.page;

      setShowBtnLoader(true);
      downloadGeneralData(tempData); // Trigger general data download
    }
  };

  const queryClient = useQueryClient();

  const fetchServiceData = async (
    bookingPageCount,
    pageCount,
    sendFilterDataToapi
  ) => {
    if (bookingPageCount === "c2" || bookingPageCount === "c3") {
      const idToUse = bookingPageCount === "c2" ? "c2" : "c3";

      if (
        Object.keys(sendFilterDataToapi).some((key) => sendFilterDataToapi[key])
      ) {
        // If filters are applied
        sendFilterDataToapi.page = pageCount;
        sendFilterDataToapi.serviceType = idToUse;

        const response = await appAndmoreApi.filterServiceData(
          sendFilterDataToapi
        );
        return response;
      } else {
        const response = await Appapi.getServices("10", idToUse, 1, pageCount);
        return response;

      }
    } else if (bookingPageCount === "c1") {
      const perPage = 64;
      const active = 1;

      if (
        Object.keys(sendFilterDataToapi).some(
          (key) => sendFilterDataToapi[key]
        ) &&
        !partnerAccess
      ) {
        // If filters are applied
        delete sendFilterDataToapi.serviceType;
        sendFilterDataToapi.page = pageCount;

        const response = await appAndmoreApi.filterData(sendFilterDataToapi);
        return response;
      } else {
        const response = await Appapi.getStudios(limit, active, pageCount);
        return response;

      }
    }
  };

  const { isLoading, isError, error } = useQuery(
    ["services", bookingPageCount, pageCount, sendFilterDataToapi],
    () => fetchServiceData(bookingPageCount, pageCount, sendFilterDataToapi),
    {
      keepPreviousData: true, // Keep the previous data while loading new data
      onSuccess: (response) => {
        if (response) {
          if (bookingPageCount === "c2" || bookingPageCount === "c3") {
            setProducts(response.services.results);
          } else if (bookingPageCount === "c1") {
            setProducts(
              partnerAccess ? response.allBookings : response.studios
            );
          }
          setTotalPage(response.paginate.totalPages);
        }
      },
      onError: (error) => {
        console.error("Error fetching data:", error);
      },
    }
  );
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
            totalResult={totalResult}
            setfilterNav={setfilterNav}
            perPage={perPage}
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
            totalResult={totalResult}
            perPage={perPage}
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
            totalResult={totalResult}
            perPage={perPage}
          />
        ) : (
          <Artist />
        )}
      </div>
    </>
  );
}

export default AllStudioPageDetailsPage;
