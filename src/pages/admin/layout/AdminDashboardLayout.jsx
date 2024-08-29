import React, { createContext, useEffect, useMemo, useState } from "react";
// import "../studios/studios.css";
import style from "../studios/studio.module.css";
import { IoSearch } from "react-icons/io5";

import { FaRegBell } from "react-icons/fa6";
import { MdCalendarMonth, MdOutlineSettings } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
// import data from "../studios/mock-data.json";
import AllStudioDetail from "../../../components/adminStudio/AllStudioDetail";

import AddNewStudio from "../../../components/adminStudio/AddNewStudio";

import SlotBooking from "../../../components/adminStudio/SlotBooking";
import WebDashboard2 from "../../produce/WebDashBoard2";
import AllStudioPageDetailsPage from "../studios/AllStudioPageDetailsPage";
import BookingPages from "../studios/BookingPages";
import AddNewProduction from "../../../components/adminStudio/appsAndMore/AddNewProduction";
import AddNewServices from "../../../components/adminStudio/appsAndMore/AddNewServices";
import { useNavigate } from "react-router-dom";
import AddNewRoom from "../../../components/adminStudio/AddNewRoom";
import AllteamDetails from "../../../components/teamsSection/AllteamDetails";
import ShowAllUser from "../../../components/userSection/ShowAllUser";
import Overview from "../adminDashboardOverview/Overview";
import Promotions from "../../../components/pramotation/Promotions";
import { partnerAccess, userAcess } from "../../../config/partnerAccess";
import { AccessContext } from "../../../utils/context";
import { useNavigateRouter } from "../../../navigateRoute";

function AdminDashboardLayout() {
  const navigate = useNavigate();
  const [tabCount, setTabCount] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("Token from localStorage:", token);
    if (token === null || token === undefined) {
      const isSignin = localStorage.getItem("isSignin");
      if (isSignin) {
        navigate("/landingpage");
      } else {
        navigate("/signin");
      }
    }
  }, []);
  console.log(partnerAccess, "userAcess");
  const [navAccess, setnavAccess] = useState(
    partnerAccess ? Object.keys(partnerAccess) : ""
  );
  const router = useNavigate();
  const gotoSlotBooking = () => {
    router("/adminDashboard/Bookings/AddSlotBooking", {
      state: { navCount: 4 },
    });
  };
  return (
    <>
      {" "}
      <AccessContext.Provider value={partnerAccess}>
        <div className={style.wrapper}>
          <WebDashboard2 tabCount={tabCount} setTabCount={setTabCount} />
          <div className={style.studioMainScreen}>
            {/* <div className={style.studioHeader}>
            <div className={style.puredisabled}>
              <input
                type="text"
                placeholder="Search"
                readOnly
                disabled
                className={style.puredisabled}
              />
            </div>
            <div>
              <IoSearch />
            </div>
            <div>
              <div className={style.notifyIcon}>
                <GoDotFill />
              </div>
              <FaRegBell />
            </div>
            <div>
              <MdOutlineSettings />
            </div>
          </div> */}
            {navAccess ? (
              navAccess.map((data, index) => {
                const lowerCaseData = data.toLowerCase().replace(/ /g, "");
                return (
                  <React.Fragment key={index}>
                    {tabCount === 1 && lowerCaseData === "dashboard" && (
                      <Overview />
                    )}
                    {tabCount === 2 && lowerCaseData === "mystudio" && (
                      <AllStudioPageDetailsPage />
                    )}
                    {tabCount === 3 && lowerCaseData === "bookings" && (
                      <BookingPages />
                    )}
                    {tabCount === 4 &&
                      lowerCaseData === "manageslots" &&
                      gotoSlotBooking()}
                    {tabCount === 5 && lowerCaseData === "bookings" && ""}
                    {tabCount === 6 && lowerCaseData === "promotion" && ""}
                  </React.Fragment>
                );
              })
            ) : (
              <>
                {tabCount === 1 && <Overview />}
                {tabCount === 2 && <ShowAllUser />}
                {tabCount === 3 && <AllteamDetails />}
                {tabCount === 4 && <AllStudioPageDetailsPage />}
                {tabCount === 5 && <BookingPages />}
                {tabCount === 6 && <Promotions />}
              </>
            )}
          </div>
        </div>
      </AccessContext.Provider>
    </>
  );
}

export default AdminDashboardLayout;
export { AccessContext };
