import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { LuUser2 } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import StudioFooter from "../adminStudio/StudioFooter";
import StudioBookingDetail from "../adminStudio/booking/StudioBookingDetail";
import UserBookingDetails from "./UserBookingDetails";
import { useNavigate, useParams } from "react-router-dom";
import bookingPageApi from "../../services/bookingPageApi";
import UserAcount from "./UserAcount";
import teamsApi from "../../services/teamsApi";

function UserProfile() {
  // const [products, setProducts] = useState([]);
  // const handleChange = () => {};

  const [bookingPageCount, setBookingPageCount] = useState("c2");
  const [products, setProducts] = useState([]);
  let { page: paramData } = useParams();

  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState("asc");

  const [teamsPageCount, setTeamsPageCount] = useState("t2");

  // setBookingPageCount("c2");

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
      } else {
        teamsApi
          .getStudioOwners(limit, active, pageCount)
          .then((response) => {
            console.log(
              `====================> response ${teamsPageCount}`,
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
    console.log(teamsPageCount, "inside useEffect");
  }, [teamsPageCount, pageCount, shortby]);

  const [showAccount, setShowAccount] = useState(false);

  return (
    <>
      <div className={style.userProfileSection}>
        <div>
          <div className={style.profilesidebar}>
            <div
              onClick={() => {
                setShowAccount(true);
              }}
              className={showAccount ? style.leftBorder : ""}
            >
              <LuUser2 /> Account
            </div>
            <div
              className={!showAccount ? style.leftBorder : ""}
              onClick={() => {
                setShowAccount(false);
              }}
            >
              <IoCalendarClearOutline /> Booking
            </div>
          </div>
          <div className={style.UserbookingDetails}>
            <div>
              {showAccount ? (
                <UserAcount />
              ) : (
                <UserBookingDetails
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
              )}

              {/* <UserAcount /> */}
            </div>
          </div>
        </div>

        <StudioFooter
        //  backOnclick={backOnclick}
        //   saveOnclick={handelSavebtn}
        />
      </div>
    </>
  );
}

export default UserProfile;
