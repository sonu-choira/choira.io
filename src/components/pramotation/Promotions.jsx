import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { LuUser2 } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import StudioFooter from "../adminStudio/StudioFooter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import bookingPageApi from "../../services/bookingPageApi";
import userApi from "../../services/userApi";
import { IoImageOutline } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { PiSquaresFour } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import Banner from "./Banner";
import Discount from "./Discount";
import Integration from "./Integration";
import promotionApi from "../../services/promotionApi";
function Promotions({ userAllDetails, setShowUserProfile, userid }) {
  // const [products, setProducts] = useState([]);
  // const handleChange = () => {};

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();

  const [pageCount, setPageCount] = useState(1);
  const [shortby, setShortby] = useState("asc");
  const [sidebarPageCount, setSidebarPageCount] = useState(1);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("Banner")) {
      setSidebarPageCount(1);
    } else if (pathname.includes("Discounts")) {
      setSidebarPageCount(2);
    } else if (pathname.includes("Integrations")) {
      setSidebarPageCount(3);
    }
  }, [sidebarPageCount]);

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

    if (sidebarPageCount === 1) {
      // Corrected the id assignments

      // const limit = 10;
      // const active = 1;

      promotionApi
        .getAllBanner()
        .then((response) => {
          console.log(
            `====================> response from promotion ${response}`,
            response.banners
          );
          setProducts(response.banners);
          // if (response) {
          //   setProducts(response.data.allStudioBooking);
          //   console.log("lkasdnflkjsdnf", response.status);
          //   setTotalPage(response.data.paginate.totalPages);
          // }
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
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
  }, [pageCount, sidebarPageCount]);

  const sidebarOptions = [
    {
      id: 1,
      icon: <IoImageOutline style={{ fontSize: "1.2vmax" }} />,
      title: "Banner",
      description: "Ensure your app stands out with captivating banners!",
      navigate: "/adminDashboard/Promotions/Banner",
    },
    {
      id: 2,
      icon: <CiDiscount1 style={{ fontSize: "1.2vmax" }} />,
      title: "Discounts",
      description: "Attract users with amazing discounts!",
      navigate: "/adminDashboard/Promotions/Discounts",
    },
    {
      id: 3,
      icon: <PiSquaresFour style={{ fontSize: "1.2vmax" }} />,
      title: "Integrations",
      description: "Boost functionality with seamless integrations!",
      navigate: "/adminDashboard/Promotions/Integrations",
    },
    {
      id: 4,
      icon: <IoIosNotificationsOutline style={{ fontSize: "1.2vmax" }} />,
      title: "Notifications",
      description: "Ensure your app stands out with captivating banners!",
      disable: true,
      navigate: "/adminDashboard/Promotions/Notifications",
    },
  ];

  const backOnclick = () => {
    setShowUserProfile(false);
  };
  const [showFooter, setShowFooter] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [submitData, setSubmitData] = useState(false);

  return (
    <>
      <div className={style.userProfileSection}>
        <div>
          <div className={style.PromotionSidebar}>
            {sidebarOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  if (!option.disable) {
                    setSidebarPageCount(option.id);
                    navigate(option.navigate); // Corrected navigation function chaining
                  }
                }}
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

                <Banner setProducts={setProducts} products={products} />
              ) : sidebarPageCount == 2 ? (
                <Discount
                  setShowFooter={setShowFooter}
                  showFooter={showFooter}
                  setShowTable={setShowTable}
                  showTable={showTable}
                  submitData={submitData}
                />
              ) : sidebarPageCount == 3 ? (
                <Integration />
              ) : sidebarPageCount == 4 ? (
                ""
              ) : (
                ""
              )}

              {/* <UserAcount /> */}
            </div>
          </div>
        </div>

        {sidebarPageCount == 2 && showFooter && (
          <StudioFooter
            backOnclick={() => {
              setShowFooter(false);
              setShowTable(true);
              setSubmitData(false);
            }}
            // saveDisabled={true}
            saveOnclick={() => {
              setSubmitData(true);
            }}
            // disabled={true}
            //   saveOnclick={handelSavebtn}
          />
        )}
      </div>
    </>
  );
}

export default Promotions;
