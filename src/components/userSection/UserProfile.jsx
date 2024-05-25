import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { LuUser2 } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import StudioFooter from "../adminStudio/StudioFooter";
import StudioBookingDetail from "../adminStudio/booking/StudioBookingDetail";
import UserBookingDetails from "./UserBookingDetails";
import { useNavigate, useParams } from "react-router-dom";
import bookingPageApi from "../../services/bookingPageApi";

function UserProfile() {
  // const [products, setProducts] = useState([]);
  // const handleChange = () => {};

  const [bookingPageCount, setBookingPageCount] = useState("c1");
  const [products, setProducts] = useState([]);
  let { page: paramData } = useParams();

  // setBookingPageCount("c2");

  useEffect(() => {
    if (paramData == "studio") {
      setBookingPageCount("c1");
    } else if (paramData == "musicproduction") {
      setBookingPageCount("c2");
    } else if (paramData == "mixmaster") {
      setBookingPageCount("c3");
    }
  }, [paramData]);

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
      const limit = 10;
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
      <div className={style.userProfileSection}>
        <div>
          <div className={style.profilesidebar}>
            <div>
              <LuUser2 /> Account
            </div>
            <div>
              <IoCalendarClearOutline /> Booking
            </div>
          </div>
          <div className={style.UserbookingDetails}>
            <div>
              <UserBookingDetails
                products={products}
                setProducts={setProducts}
                handleChange={handleChange}
              />
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
