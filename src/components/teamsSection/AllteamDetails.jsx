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
import StudioPatners from "./StudioPatners";
import teamsApi from "../../services/teamsApi";
import Subadmin from "./Subadmin";

function AllteamDetails() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState("asc");

  const [teamsPageCount, setTeamsPageCount] = useState("t2");
  let { page: currentPage, navOption: currentNav } = useParams();
  console.log("currentPage", currentPage);
  console.log("currentNav", currentNav);
  useEffect(() => {
    if (currentPage == "Arm") {
      setTeamsPageCount("t1");
    } else if (currentPage == "StudioPatners") {
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
  useEffect(() => {
    console.log("teamsPageCount-----", teamsPageCount);
    setProducts([]);
    // checking if filter has any data
    for (const key in sendFilterDataToapi) {
      if (sendFilterDataToapi[key]) {
        hasFilter = true;
        break;
      }
    }

    if (teamsPageCount === "t2" || teamsPageCount === "t3") {
      // Corrected the id assignments
      let idToUse = teamsPageCount === "t2" ? "t2" : "t3";

      // if (hasFilter) {
      //   console.log("sendFilterDataToapi", sendFilterDataToapi);
      //   alert(teamsPageCount);
      //   console.log(sendFilterDataToapi);
      //   // alert(JSON.stringify(sendFilterDataToapi));

      //   // alert("filter");
      //   sendFilterDataToapi.page = pageCount;
      //   sendFilterDataToapi.serviceType = idToUse;
      //   // teamsApi
      //   //   .filterServiceData(sendFilterDataToapi)
      //   //   .then((response) => {
      //   //     console.log("filter applied:", response);
      //   //     setProducts(response.services.results);
      //   //     setTotalPage(response.paginate.totalPages);
      //   //     setfilterNav(true);
      //   //   })
      //   //   .catch((error) => {
      //   //     console.error("Error filter studio:", error);
      //   //   });
      // } else {
      //   const idToUse = teamsPageCount === "t2" ? "t2" : "t3";
      //   // alert("main");

      //   teamsApi
      //     .getStudioOwners("10", idToUse, 1, pageCount)
      //     .then((response) => {
      //       console.log(
      //         `====================> response from team ${response}`,
      //         response
      //       );
      //       if (response.status) {
      //         setProducts(response.owners);
      //         console.log("lkasdnflkjsdnf", response.status);
      //         setTotalPage(response.paginate.totalPages);
      //       }
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching studios:", error);
      //     });
      // }
      teamsApi
        .getStudioOwners("10", idToUse, pageCount, shortby)
        .then((response) => {
          console.log(
            `====================> response from team ${response}`,
            response
          );
          if (response.status) {
            setProducts(response.owners);
            console.log("lkasdnflkjsdnf", response.status);
            setTotalPage(response.paginate.totalPages);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else if (teamsPageCount === "t1") {
      const limit = 64;
      const active = 1;
      // const type = teamsPageCount;
      if (hasFilter) {
        // delete sendFilterDataToapi.serviceType;
        // sendFilterDataToapi.page = pageCount;
        // teamsApi
        //   .filterData(sendFilterDataToapi)
        //   .then((response) => {
        //     console.log("filter applied:", response);
        //     setProducts(response.studios);
        //     setTotalPage(response.paginate.totalPages);
        //   })
        //   .catch((error) => {
        //     console.error("Error filter studio:", error);
        //   });

        teamsApi
          .getStudioOwners(limit, active, pageCount)
          .then((response) => {
            console.log(
              `====================> response ${teamsPageCount}`,
              response
            );
            console.log("response.data.studios", response.studios);
            if (response) {
              setProducts(response.studios);
              setTotalPage(response.paginate.totalPages);

              // setPageCount(response.paginate.page);
            }
          })
          .catch((error) => {
            console.error("Error fetching studios:", error);
          });
      }
      // else if (teamsPageCount == "t1") {

      // }
    }
    console.log(teamsPageCount, "inside useEffect");
  }, [teamsPageCount, pageCount, shortby]);
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
        currentNav == "Teams" && currentPage == "StudioPatners" ? (
          <StudioPatners
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
