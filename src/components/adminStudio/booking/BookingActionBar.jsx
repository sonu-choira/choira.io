import React from "react";
import Button from "../../../pages/admin/layout/Button";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import style from "../../../pages/admin/studios/studio.module.css";
import { FaDownload } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import appAndmoreApi from "../../../services/appAndmoreApi";
import { useNavigateRouter } from "../../../navigateRoute";

function BookingActionBar({
  setBookingPageCount,
  bookingPageCount,
  pagetype,
  downloadAllData,
  loaderText,
  showBtnLoader,
  setShowBtnLoader,
}) {
  console.log(bookingPageCount);
  const navigate = useNavigate();
  const router = useNavigateRouter();

  let { navOption: pageData, page: type } = useParams();
  console.log("page ka data ", useParams());

  const downloadBookingsData = () => {
    let bookingData = {
      type: "c1",
    };
    if (pageData == "Bookings" && type == "studio") {
      bookingData.type = "c1";
      setShowBtnLoader(true);
      appAndmoreApi
        .downloadBookingServiceData(bookingData)
        .then((response) => {
          console.log("data download", response);
          setShowBtnLoader(false);
        })
        .catch((error) => {
          console.error("Error download data:", error);
          setShowBtnLoader(false);
        });
    } else if (pageData == "Bookings" && type == "musicproduction") {
      bookingData.type = "c2";
      setShowBtnLoader(true);

      appAndmoreApi
        .downloadBookingServiceData(bookingData)
        .then((response) => {
          console.log("data download", response);
          setShowBtnLoader(false);
        })
        .catch((error) => {
          console.error("Error download data:", error);
          setShowBtnLoader(false);
        });
    } else if (pageData == "Bookings" && type == "mixmaster") {
      bookingData.type = "c3";
      setShowBtnLoader(true);

      appAndmoreApi
        .downloadBookingServiceData(bookingData)
        .then((response) => {
          setShowBtnLoader(false);

          console.log("data download", response);
        })
        .catch((error) => {
          setShowBtnLoader(false);

          console.error("Error download data:", error);
        });
    }
  };

  const gotoAddNew = (bookingPageCount) => {
    if (bookingPageCount === "c1") {
      navigate("/studio/add", {
        state: { navCount: 4, bookingPageCount: bookingPageCount },
      });
    } else {
      navigate("/service/musicProduction/add", {
        state: { navCount: 3, bookingPageCount: bookingPageCount },
      });
    }
  };
  const gotoSlotBooking = () => {
    router.push("/adminDashboard/Bookings/AddSlotBooking", {
      state: { navCount: 4 },
    });
  };
  const gotoMusicProduction = () => {
    if (pageData == "Apps&More") {
      router.push("/adminDashboard/Apps&More/musicproduction");
    } else {
      router.push("/adminDashboard/Bookings/musicproduction");
    }
  };
  const gotoStudio = () => {
    if (pageData == "Apps&More") {
      router.push("/adminDashboard/Apps&More/studio");
    } else {
      router.push("/adminDashboard/Bookings/studio");
    }
  };
  const gotoMixMaster = () => {
    if (pageData == "Apps&More") {
      router.push("/adminDashboard/Apps&More/mixmaster");
    } else {
      router.push("/adminDashboard/Bookings/mixmaster");
    }
  };
  return (
    <>
      <div className={style.bookingStudiobtn} style={{ marginBottom: "2%" }}>
        <div>
          <div>
            <div
              style={{
                borderLeft: "none",
                backgroundColor: bookingPageCount === "c1" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c1");
                gotoStudio();
              }}
            >
              Studio
            </div>
            <div
              style={{
                backgroundColor: bookingPageCount === "c2" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c2");
                gotoMusicProduction();
              }}
            >
              Music Production
            </div>

            <div
              style={{
                borderRight: "none",
                backgroundColor: bookingPageCount === "c3" ? "#ffc701" : "",
              }}
              onClick={() => {
                setBookingPageCount("c3");
                gotoMixMaster();
              }}
            >
              Mix-Master
            </div>
          </div>
        </div>
        <div style={{ justifyContent: bookingPageCount === "c1" ? "" : "end" }}>
          <Button
            name={"Card view"}
            disabled={true}
            icon={<FaTableCellsLarge />}
            style={{
              height: "50%",
              width: "20%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
          />
          <Button
            name={"Filter"}
            disabled={true}
            icon={<FaFilter />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
          />
          <Button
            name={"Share"}
            disabled={true}
            icon={<FaShare />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
              backgroundColor: "#ADB5BD",
            }}
          />
          <Button
            name={"Download"}
            icon={<FaDownload />}
            style={{
              height: "50%",
              width: "15%",
              gap: "5%",
            }}
            onClick={
              pagetype == "apps" ? downloadAllData : downloadBookingsData
            }
            loaderText={loaderText}
            showBtnLoader={showBtnLoader}
          />
          {(bookingPageCount === "c1") & (pagetype != "apps") ? (
            <Button
              name={"Slot Booking"}
              icon={<LuFilePlus />}
              style={{ height: "50%", width: "20%", gap: "5%" }}
              onClick={gotoSlotBooking}
            />
          ) : (
            ""
          )}

          {pagetype != "apps" ? (
            ""
          ) : bookingPageCount === "c2" ||
            bookingPageCount === "c3" ||
            bookingPageCount === "c1" ? (
            <Button
              name={"Add New"}
              onClick={() => {
                gotoAddNew(bookingPageCount);
              }}
              icon={<MdNoteAdd />}
              style={{ height: "50%", width: "15%", gap: "5%" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default BookingActionBar;
