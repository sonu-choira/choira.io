import React, { useEffect, useMemo, useState } from "react";
// import { Alert } from "antd";
import axios from "axios";
// import Cookies from "js-cookie";

// import "../studios/studios.css";

import style from "../../pages/admin/studios/studio.module.css";

import { useNavigate, useParams } from "react-router-dom";

// services

import BookingActionBar from "../adminStudio/booking/BookingActionBar";
import TeamsActionBar from "./TeamActionBar";
import AllStudioDetail from "../adminStudio/AllStudioDetail";
import AllStudioDetail2 from "../adminStudio/appsAndMore/AllStudioDetail2";
import StudioPartners from "./StudioPartners";
import teamsApi from "../../services/teamsApi";
import Subadmin from "./Subadmin";
import { useQuery } from "react-query";
import { errorAlert } from "../../pages/admin/layout/Alert";

function AllteamDetails() {
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResult] = useState();

  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState("asc");
  const [perPage, setPerPage] = useState(7);
  const [shortBySrNo, setShortBySrNo] = useState(false);

  const [teamsPageCount, setTeamsPageCount] = useState("t2");
  let { page: currentPage, navOption: currentNav } = useParams();
  console.log("currentPage", currentPage);
  console.log("currentNav", currentNav);
  useEffect(() => {
    if (currentPage == "Arm") {
      setTeamsPageCount("t1");
    } else if (currentPage == "StudioPartners") {
      setTeamsPageCount("t2");
    } else if (currentPage == "Artist") {
      setTeamsPageCount("t3");
    } else if (currentPage == "MusicProducer") {
      setTeamsPageCount("t4");
    }
  }, [currentPage]);
  const pagetype = "apps";
  // const [products, setProducts] = useState([]);
  let sendFilterDataToapi = {};
  let hasFilter = false;
  const fetchStudioOwners = async ({ queryKey }) => {
    const [
      _,
      perPage,
      idToUse,
      pageCount,
      shortby,
      active,
      hasFilter,
      sendFilterDataToapi,
      isFetching,
    ] = queryKey;

    if (hasFilter) {
      // Assuming you need to handle the filter data when `hasFilter` is true
      const response = await teamsApi.getStudioOwners(
        perPage,
        active,
        pageCount,
        sendFilterDataToapi
      );
      return response;
    } else if (idToUse) {
      const response = await teamsApi.getStudioOwners(
        perPage,
        idToUse,
        pageCount,
        shortby
      );
      return response;
    }
  };

  // Checking if the filter data has any non-empty values
  for (const key in sendFilterDataToapi) {
    if (sendFilterDataToapi[key]) {
      hasFilter = true;
      break;
    }
  }

  // Determine which ID to use based on `teamsPageCount`
  const idToUse =
    teamsPageCount === "t2" ? "t2" : teamsPageCount === "t3" ? "t3" : null;
  const active = teamsPageCount === "t1" ? 1 : null;

  // React Query Hook
  const { data, error, isLoading, isFetching } = useQuery(
    [
      "studioOwners",
      perPage,
      idToUse,
      pageCount,
      shortby,
      active,
      hasFilter,
      sendFilterDataToapi,
    ],
    fetchStudioOwners,
    {
      enabled: !!teamsPageCount, // Only run query when teamsPageCount is defined
      onSuccess: (response) => {
        if (response) {
          if (teamsPageCount === "t2" || teamsPageCount === "t3") {
            setProducts(response.owners);
          } else if (teamsPageCount === "t1") {
            setProducts(response.studios);
          }
          setTotalPage(response.paginate.totalPages);
          setTotalResult(response.paginate.totalResults);
        }
      },
      onError: (error) => {
        errorAlert("Error fetching studios:", error);
      },
      // refetchOnWindowFocus: false, // Optional: prevents refetch on window focus
    }
  );

  useEffect(() => {
    console.log("hello", isFetching);
  }, [isFetching]);
  return (
    <>
      <div
        className={style.allStudioDetailsPage}
        // style={{ border: "2px solid red" }}
      >
        <TeamsActionBar
          pagetype={pagetype}
          teamsPageCount={teamsPageCount}
          setTeamsPageCount={setTeamsPageCount}
        />
        {currentNav == "Teams" && currentPage == "Arm" ? (
          <Subadmin
            sendFilterDataToapi={sendFilterDataToapi}
            products={products}
            setProducts={setProducts}
            totalPage={totalPage}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            teamsPageCount={teamsPageCount}
            filterNav={filterNav}
            setfilterNav={setfilterNav}
            setShortby={setShortby}
            shortby={shortby}
          />
        ) : // <AllStudioDetail />
        currentNav == "Teams" && currentPage == "StudioPartners" ? (
          <StudioPartners
            sendFilterDataToapi={sendFilterDataToapi}
            products={products}
            setProducts={setProducts}
            totalPage={totalPage}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            teamsPageCount={teamsPageCount}
            filterNav={filterNav}
            setfilterNav={setfilterNav}
            setShortby={setShortby}
            shortby={shortby}
            perPage={perPage}
            totalResult={totalResult}
            setShortBySrNo={setShortBySrNo}
            shortBySrNo={shortBySrNo}
            isFetching={isFetching}
          />
        ) : currentNav == "Teams" && currentPage == "Artist" ? (
          "t3"
        ) : currentNav == "Teams" && currentPage == "MusicProducer" ? (
          "t4"
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default AllteamDetails;
