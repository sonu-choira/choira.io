import React, { useContext, useState } from "react";
import Button from "../../../pages/admin/layout/Button";
import { FaFilter, FaShare, FaTableCellsLarge } from "react-icons/fa6";
import { LuFilePlus } from "react-icons/lu";
import style from "../../../pages/admin/studios/studio.module.css";
import { FaDownload } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import appAndmoreApi from "../../../services/appAndmoreApi";
import { useNavigateRouter } from "../../../navigateRoute";
import { partnerAccess } from "../../../config/partnerAccess";
import { AccessContext } from "../../../utils/context";
import dynamicNav from "../../../utils/dynamicNav";

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
    router.push(`/${dynamicNav}/Bookings/AddSlotBooking`, {
      state: { navCount: 4 },
    });
  };
  const gotoMusicProduction = () => {
    if (pageData == "Apps&More") {
      router.push(`/${dynamicNav}/Apps&More/musicproduction`);
    } else {
      router.push(`/${dynamicNav}/Bookings/musicproduction`);
    }
  };
  const gotoStudio = () => {
    if (pageData == "Apps&More") {
      router.push(`/${dynamicNav}/Apps&More/studio`);
    } else {
      router.push(`/${dynamicNav}/Bookings/studio`);
    }
  };
  const gotoMixMaster = () => {
    if (pageData == "Apps&More") {
      router.push(`/${dynamicNav}/Apps&More/mixmaster`);
    } else {
      router.push(`/${dynamicNav}/Bookings/mixmaster`);
    }
  };
  const bookingOptions = [
    {
      id: "c1",
      label: "Studio",
      onClick: () => {
        setBookingPageCount("c1");
        gotoStudio();
      },
      style: { borderLeft: "none" },
    },
    {
      id: "c2",
      label: "Music Production",
      onClick: () => {
        setBookingPageCount("c2");
        gotoMusicProduction();
      },
      style: {},
    },
    {
      id: "c3",
      label: "Mix-Master",
      onClick: () => {
        setBookingPageCount("c3");
        gotoMixMaster();
      },
      style: { borderRight: "none" },
    },
  ];

  const buttons = [
    {
      name: "Card view",
      disabled: true,
      icon: <FaTableCellsLarge />,
      style: {
        height: "50%",
        width: "20%",
        gap: "5%",
        backgroundColor: "#ADB5BD",
      },
    },
    {
      name: "Filter",
      disabled: true,
      icon: <FaFilter />,
      style: {
        height: "50%",
        width: "15%",
        gap: "5%",
        backgroundColor: "#ADB5BD",
      },
    },
    {
      name: "Share",
      disabled: true,
      icon: <FaShare />,
      style: {
        height: "50%",
        width: "15%",
        gap: "5%",
        backgroundColor: "#ADB5BD",
      },
    },
    {
      name: "Download",
      icon: <FaDownload />,
      style: {
        height: "50%",
        width: "15%",
        gap: "5%",
      },
      onClick: pagetype === "apps" ? downloadAllData : downloadBookingsData,
      loaderText: loaderText,
      showBtnLoader: showBtnLoader,
    },
  ];
  if (bookingPageCount === "c1" && pagetype !== "apps") {
    buttons.push({
      name: "Slot Booking",
      icon: <LuFilePlus />,
      style: { height: "50%", width: "20%", gap: "5%" },
      onClick: gotoSlotBooking,
    });
  }

  if (
    pagetype === "apps" &&
    (bookingPageCount === "c2" ||
      bookingPageCount === "c3" ||
      bookingPageCount === "c1")
  ) {
    buttons.push({
      name: "Add New",
      icon: <MdNoteAdd />,
      style: { height: "50%", width: "15%", gap: "5%" },
      onClick: () => gotoAddNew(bookingPageCount),
    });
  }
  let navToMap = pageData.toLocaleLowerCase().replace(/ /g, "");
  if (navToMap === "apps&more") {
    navToMap = "app&more";
  } else if (navToMap === "mystudio") {
    navToMap = "MyStudio";
  }
  const context = useContext(AccessContext);

  const [navAccess, setnavAccess] = useState(context || "");
  let navCount = 0;
  const { pathname } = useLocation();
  if (pathname.includes("MyStudio")) {
    navCount = 2;
  } else if (pathname.includes("Bookings/studio")) {
    navCount = 3;
  }
  return (
    <>
      <div className={style.bookingStudiobtn} style={{ marginBottom: "2%" }}>
        {!navAccess ? (
          <div>
            <div>
              {navAccess
                ? navAccess[navToMap]?.navbar.map((data, index) =>
                    bookingOptions.map(
                      (option) =>
                        data.toLowerCase().replace(/ /g, "") ===
                          option.label.toLowerCase().replace(/ /g, "") && (
                          <div
                            key={index}
                            style={{
                              ...option.style,
                              backgroundColor:
                                bookingPageCount === option.id ? "#ffc701" : "",
                            }}
                            onClick={option.onClick}
                          >
                            {option.label}
                          </div>
                        )
                    )
                  )
                : bookingOptions.map((option, index) => (
                    <div
                      key={index}
                      style={{
                        ...option.style,
                        backgroundColor:
                          bookingPageCount === option.id ? "#ffc701" : "",
                      }}
                      onClick={option.onClick}
                    >
                      {option.label}
                    </div>
                  ))}
            </div>
          </div>
        ) : (
          <div>{navCount == 2 ? <h2>My Studio</h2> : <h2>Bookings</h2>}</div>
        )}

        <div style={{ justifyContent: bookingPageCount === "c1" ? "" : "end" }}>
          {navAccess
            ? navAccess[navToMap]?.button.map((data, index) =>
                buttons.map(
                  (option) =>
                    data.toLowerCase().replace(/ /g, "") ===
                      option.name.toLowerCase().replace(/ /g, "") &&
                    navAccess[navToMap].disabledButton.map((disabled) => (
                      <Button
                        key={index}
                        name={option.name}
                        style={{
                          ...option.style,
                          backgroundColor:
                            bookingPageCount === option.id ? "#ffc701" : "",
                        }}
                        onClick={option.onClick}
                        disabled={
                          disabled.toLowerCase().replace(/ /g, "") ===
                          option.name.toLowerCase().replace(/ /g, "")
                            ? true
                            : false
                        }
                        icon={option.icon}
                        loaderText={option.loaderText}
                        showBtnLoader={option.showBtnLoader}
                      />
                    ))
                )
              )
            : buttons.map((option, index) => (
                <Button
                  key={index}
                  name={option.name}
                  style={{
                    ...option.style,
                    backgroundColor:
                      bookingPageCount === option.id ? "#ffc701" : "",
                  }}
                  onClick={option.onClick}
                  disabled={option.disabled}
                  icon={option.icon}
                  loaderText={option.loaderText}
                  showBtnLoader={option.showBtnLoader}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default BookingActionBar;
