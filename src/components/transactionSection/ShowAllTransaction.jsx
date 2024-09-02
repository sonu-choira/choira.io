import React, { useEffect, useMemo, useState } from "react";
// import { Alert } from "antd";

// import Cookies from "js-cookie";

// import "../studios/studios.css";

import style from "../../pages/admin/studios/studio.module.css";

import { useNavigate, useParams } from "react-router-dom";

// services

import TeamsActionBar from "../teamsSection/TeamActionBar";
import teamsApi from "../../services/teamsApi";
import StudioPartners from "../teamsSection/StudioPartners";
import TransactionActionBar from "./TransactionActionBar";
import Subadmin from "../teamsSection/Subadmin";
import StudioBookingDetail from "../adminStudio/booking/StudioBookingDetail";
import StudioTransaction from "./StudioTransaction";

import { partnerAccess } from "../../config/partnerAccess";

function ShowAllTransaction() {
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResult] = useState();

  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState("asc");
  const [perPage, setPerPage] = useState(7);
  const [shortBySrNo, setShortBySrNo] = useState(false);

  const [TransactionPageCount, setTransactionPageCount] = useState("t0");
  let { page: currentPage, navOption: currentNav } = useParams();
  console.log("currentPage", currentPage);
  console.log("currentNav", currentNav);

  const [navAccess, setnavAccess] = useState(partnerAccess || "");
  useEffect(() => {
    if (!navAccess) {
      if (currentPage == "studio") {
        setTransactionPageCount("t1");
      } else if (currentPage == "musicproduction") {
        setTransactionPageCount("t2");
      } else if (currentPage == "artist") {
        setTransactionPageCount("t3");
      } else if (currentPage == "mixmaster") {
        setTransactionPageCount("t4");
      }
    }
    if (navAccess) {
      setTransactionPageCount("t1");
    }
  }, [currentPage]);
  const pagetype = "apps";
  // const [products, setProducts] = useState([]);
  let sendFilterDataToapi = {};
  let hasFilter = false;
  useEffect(() => {
    console.log("TransactionPageCount-----", TransactionPageCount);
    setProducts([]);
    // checking if filter has any data
    for (const key in sendFilterDataToapi) {
      if (sendFilterDataToapi[key]) {
        hasFilter = true;
        break;
      }
    }

    if (TransactionPageCount === "t1") {
      // Corrected the id assignments
      let idToUse = TransactionPageCount === "t1" ? "t2" : "t3";

      // if (hasFilter) {
      //   console.log("sendFilterDataToapi", sendFilterDataToapi);
      //   alert(TransactionPageCount);
      //   console.log(sendFilterDataToapi);
      //   // alert(JSON.stringify(sendFilterDataToapi));

      //   // alert("filter");
      //   sendFilterDataToapi.page = pageCount;
      //   sendFilterDataToapi.serviceType = idToUse;
      //   // TransactionApi
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
      //   const idToUse = TransactionPageCount === "t2" ? "t2" : "t3";
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
        .getStudioOwners(perPage, idToUse, pageCount, shortby)
        .then((response) => {
          console.log(
            `====================> response from team ${response}`,
            response
          );
          if (response.status) {
            setProducts(response.owners);
            console.log("lkasdnflkjsdnf", response.status);
            setTotalPage(response.paginate.totalPages);
            setTotalResult(response.paginate.totalResults);
          }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    } else if (TransactionPageCount === "t2" || TransactionPageCount === "t3") {
      const active = 1;
      // const type = TransactionPageCount;
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
          .getStudioOwners(perPage, active, pageCount)
          .then((response) => {
            console.log(
              `====================> response ${TransactionPageCount}`,
              response
            );
            console.log("response.data.studios", response.studios);
            if (response) {
              setProducts(response.studios);
              setTotalPage(response.paginate.totalPages);
              setTotalResult(response.paginate.totalResults);

              // setPageCount(response.paginate.page);
            }
          })
          .catch((error) => {
            console.error("Error fetching studios:", error);
          });
      }
      // else if (TransactionPageCount == "t1") {

      // }
    }
    console.log(TransactionPageCount, "inside useEffect");
  }, [TransactionPageCount, pageCount, shortby]);
  return (
    <>
      <div
        className={style.allStudioDetailsPage}
        // style={{ border: "2px solid red" }}
      >
        <TransactionActionBar
          pagetype={pagetype}
          TransactionPageCount={TransactionPageCount}
          setTransactionPageCount={setTransactionPageCount}
        />

        {currentNav == "Transactions" && currentPage == "studio" ? (
          <StudioTransaction
            sendFilterDataToapi={sendFilterDataToapi}
            products={products}
            setProducts={setProducts}
            totalPage={totalPage}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            bookingPageCount={TransactionPageCount}
            filterNav={filterNav}
            setfilterNav={setfilterNav}
            setShortby={setShortby}
            shortby={shortby}
            perPage={perPage}
            totalResult={totalResult}
            setShortBySrNo={setShortBySrNo}
            shortBySrNo={shortBySrNo}
          />
        ) : // <AllStudioDetail />

        currentNav == "Transactions" && currentPage == "122" ? (
          <Subadmin
            sendFilterDataToapi={sendFilterDataToapi}
            products={products}
            setProducts={setProducts}
            totalPage={totalPage}
            setPageCount={setPageCount}
            setTotalPage={setTotalPage}
            pageCount={pageCount}
            TransactionPageCount={TransactionPageCount}
            filterNav={filterNav}
            setfilterNav={setfilterNav}
            setShortby={setShortby}
            shortby={shortby}
          />
        ) : currentNav == "Transactions" && currentPage == "Artist" ? (
          "t3"
        ) : currentNav == "Transactions" && currentPage == "MusicProducer" ? (
          "t4"
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ShowAllTransaction;
