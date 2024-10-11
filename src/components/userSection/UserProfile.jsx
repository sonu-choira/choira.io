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
import UserServiceBooking from "./UserServiceBooking";
import userApi from "../../services/userApi";
import { useQuery } from "react-query";
import axios from "axios";

function UserProfile({ userAllDetails, setShowUserProfile, userid }) {
  // const [products, setProducts] = useState([]);
  // const handleChange = () => {};

  const [bookingPageCount, setBookingPageCount] = useState("c2");
  const [products, setProducts] = useState([]);
  let { page: paramData } = useParams();

  const [totalPage, setTotalPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [filterNav, setfilterNav] = useState(false);
  const [shortby, setShortby] = useState("asc");
  const [sidebarPageCount, setSidebarPageCount] = useState(1);

  // const [userPageCount, setUserPageCount] = useState("t3");

  // setBookingPageCount("c2");

  const profileSidebarOptions = [
    {
      id: 1,
      icon: <LuUser2 style={{ fontSize: "1.2vmax" }} />,
      title: "Account",
    },
    {
      id: 2,
      icon: <IoCalendarClearOutline style={{ fontSize: "1.2vmax" }} />,
      title: "Studio Booking",
    },
    {
      id: 3,
      icon: <IoCalendarClearOutline style={{ fontSize: "1.2vmax" }} />,
      title: "Service Booking",
    },
  ];

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
  const {
    data: studioBookingData,
    isLoading: isStudioLoading,
    error: studioError,
  } = useQuery(
    ["studioBooking", userAllDetails._id, pageCount],
    async ({ signal }) => {
      const source = axios.CancelToken.source();
      signal.addEventListener("abort", () => {
        source.cancel();
      });
      return fetchStudioBooking(userAllDetails._id, pageCount, source.token);
    },
    {
      enabled: sidebarPageCount === 2,
      onSuccess: (response) => {
        if (response) {
          setProducts(response.data.allStudioBooking);
          setTotalPage(response.data.paginate.totalPages);
        }
      },
      onError: (error) => {
        console.error("Error fetching studios:", error);
      },
    }
  );
  const fetchStudioBooking = async (userId, pageCount, cancelToken) => {
    const response = await userApi.getuserStudioBooking(userId, pageCount, {
      cancelToken,
    });
    return response;
  };

  const fetchServiceBooking = async (userId, pageCount, cancelToken) => {
    const response = await userApi.getUserServiceBooking(userId, pageCount, {
      cancelToken,
    });
    return response;
  };

  const {
    data: serviceBookingData,
    isLoading: isServiceLoading,
    error: serviceError,
  } = useQuery(
    ["serviceBooking", userAllDetails._id, pageCount],
    async ({ signal }) => {
      const source = axios.CancelToken.source();
      signal.addEventListener("abort", () => {
        source.cancel();
      });
      return fetchServiceBooking(userAllDetails._id, pageCount, source.token);
    },
    {
      enabled: sidebarPageCount === 3,
      onSuccess: (response) => {
        if (response) {
          setProducts(response.data);
          setTotalPage(response.paginate.totalPages);
        }
      },
      onError: (error) => {
        console.error("Error fetching services:", error);
      },
    }
  );

  const backOnclick = () => {
    setShowUserProfile(false);
  };

  return (
    <>
      <div className={style.userProfileSection}>
        <div>
          <div className={style.profilesidebar}>
            {profileSidebarOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSidebarPageCount(option.id)}
                className={
                  sidebarPageCount === option.id ? style.leftBorder : ""
                }
              >
                {option.icon} {option.title}
              </div>
            ))}
          </div>

          <div
            className={style.UserbookingDetails}
            style={!sidebarPageCount == 1 ? { backgroundColor: "#F0F0F0" } : {}}
          >
            <div>
              {sidebarPageCount == 1 ? (
                <UserAcount userAllDetails={userAllDetails} />
              ) : sidebarPageCount == 2 ? (
                <UserBookingDetails
                  sendFilterDataToapi={sendFilterDataToapi}
                  products={products}
                  setProducts={setProducts}
                  totalPage={totalPage}
                  setPageCount={setPageCount}
                  setTotalPage={setTotalPage}
                  pageCount={pageCount}
                  sidebarPageCount={sidebarPageCount}
                  filterNav={filterNav}
                  setfilterNav={setfilterNav}
                  setShortby={setShortby}
                  shortby={shortby}
                />
              ) : (
                <UserServiceBooking
                  sendFilterDataToapi={sendFilterDataToapi}
                  products={products}
                  setProducts={setProducts}
                  totalPage={totalPage}
                  setPageCount={setPageCount}
                  setTotalPage={setTotalPage}
                  pageCount={pageCount}
                  sidebarPageCount={sidebarPageCount}
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
          backOnclick={backOnclick}
          saveDisabled={true}
          // disabled={true}
          //   saveOnclick={handelSavebtn}
        />
      </div>
    </>
  );
}

export default UserProfile;
