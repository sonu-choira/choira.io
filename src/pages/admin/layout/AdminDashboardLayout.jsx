import React, { useEffect, useMemo, useState } from "react";
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
import TokenService from "../../../services/token.service";

function AdminDashboardLayout() {
  const [tabCount, setTabCount] = useState(3);
  const [navCount, setNavCount] = useState(3); //localStorage.getItem("NavtabCount")

  useEffect(() => {
    console.log("pjgfdjgjfdgd", navCount);
  }, [navCount]);

  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2
          tabCount={tabCount}
          setTabCount={setTabCount}
          navCount={navCount}
          setNavCount={setNavCount}
        />
        <div className={style.studioMainScreen}>
          <div className={style.studioHeader}>
            <div>
              <input type="text" placeholder="search" />
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
          </div>
          {navCount === 1 && <SlotBooking />}
          {navCount === 2 && <AddNewServices />}

          {navCount === 3 ? (
            <AllStudioPageDetailsPage />
          ) : navCount === 4 ? (
            <BookingPages />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboardLayout;
