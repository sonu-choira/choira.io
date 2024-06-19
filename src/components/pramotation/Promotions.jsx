import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { LuUser2 } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import StudioFooter from "../adminStudio/StudioFooter";
import { useNavigate, useParams } from "react-router-dom";
import bookingPageApi from "../../services/bookingPageApi";
import userApi from "../../services/userApi";
import { IoImageOutline } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { PiSquaresFour } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import Banner from "./Banner";
function Promotions({ userAllDetails, setShowUserProfile, userid }) {
  // const [products, setProducts] = useState([]);
  // const handleChange = () => {};

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();

  const [pageCount, setPageCount] = useState(1);
  const [shortby, setShortby] = useState("asc");
  const [sidebarPageCount, setSidebarPageCount] = useState(1);

  // const [userPageCount, setUserPageCount] = useState("t3");

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

  // {-------  this code is end of  update color of selected  action ---------}

  // const [products, setProducts] = useState([]);
  let sendFilterDataToapi = {};
  let hasFilter = false;
  useEffect(() => {
    console.log("sidebarPageCount-----", sidebarPageCount);
    setProducts([]);
    // checking if filter has any data
    for (const key in sendFilterDataToapi) {
      if (sendFilterDataToapi[key]) {
        hasFilter = true;
        break;
      }
    }

    if (sidebarPageCount === 2) {
      // Corrected the id assignments

      const limit = 10;
      const active = 1;

      // userApi
      //   .getuserStudioBooking(userAllDetails._id, pageCount)
      //   .then((response) => {
      //     console.log(
      //       `====================> response from studio booking ${response.data.users}`,
      //       response
      //     );
      //     if (response) {
      //       setProducts(response.data.allStudioBooking);
      //       console.log("lkasdnflkjsdnf", response.status);
      //       setTotalPage(response.data.paginate.totalPages);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching studios:", error);
      //   });
    } else if (sidebarPageCount === 3) {
      const limit = 10;
      const active = 1;

      // userApi
      //   .getUserServiceBooking(userAllDetails._id, pageCount)
      //   .then((response) => {
      //     console.log(
      //       `====================> response user service ${sidebarPageCount}`,
      //       response
      //     );
      //     console.log("response.data", response.data);
      //     if (response) {
      //       setProducts(response.data);
      //       setTotalPage(response.paginate.totalPages);
      //       console.log(
      //         "response.paginate.totalPages",
      //         response.paginate.totalPages
      //       );
      //       // setPageCount(response.paginate.page);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching studios:", error);
      //   });
      // }
    }
    console.log(sidebarPageCount, "inside useEffect");
  }, [pageCount, shortby]);

  const sidebarOptions = [
    {
      id: 1,
      icon: <IoImageOutline style={{ fontSize: "1.2vmax" }} />,
      title: "Banner",
      description: "Ensure your app stands out with captivating banners!",
    },
    {
      id: 2,
      icon: <CiDiscount1 style={{ fontSize: "1.2vmax" }} />,
      title: "Discounts",
      description: "Attract users with amazing discounts!",
    },
    {
      id: 3,
      icon: <PiSquaresFour style={{ fontSize: "1.2vmax" }} />,
      title: "Integrations",
      description: "Boost functionality with seamless integrations!",
    },
    {
      id: 4,
      icon: <IoIosNotificationsOutline style={{ fontSize: "1.2vmax" }} />,
      title: "Notifications",
      description: "Ensure your app stands out with captivating banners!",
      disable: true,
    },
  ];

  const backOnclick = () => {
    setShowUserProfile(false);
  };

  return (
    <>
      <div className={style.userProfileSection}>
        <div>
          <div className={style.PromotionSidebar}>
            {sidebarOptions.map((option) => (
              <div
                key={option.id}
                onClick={() =>
                  !option.disable && setSidebarPageCount(option.id)
                }
                style={{
                  height: sidebarPageCount === option.id ? "15%" : "",
                  backgroundColor: option.disable && "#F0F0F0",
                  cursor: option.disable && "not-allowed",
                }}
                className={
                  sidebarPageCount === option.id ? style.leftBorder : ""
                }
              >
                <div>
                  {option.icon} {option.title}
                </div>
                {sidebarPageCount === option.id && (
                  <small>{option.description}</small>
                )}
              </div>
            ))}
          </div>
          <div
            className={style.UserbookingDetails}
            style={!sidebarPageCount == 1 ? { backgroundColor: "#F0F0F0" } : {}}
          >
            <div>
              {sidebarPageCount == 1 ? (
                // <UserAcount userAllDetails={userAllDetails} />
                <Banner />
              ) : sidebarPageCount == 2 ? (
                ""
              ) : sidebarPageCount == 3 ? (
                ""
              ) : sidebarPageCount == 4 ? (
                ""
              ) : (
                ""
              )}

              {/* <UserAcount /> */}
            </div>
          </div>
        </div>

        {/* <StudioFooter
          backOnclick={backOnclick}
          saveDisabled={true}
          // disabled={true}
          //   saveOnclick={handelSavebtn}
        /> */}
      </div>
    </>
  );
}

export default Promotions;
