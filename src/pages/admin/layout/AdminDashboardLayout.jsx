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
import AddNewProduction from "../../../components/adminStudio/allStudio/AddNewProduction";

function AdminDashboardLayout() {
  const [tabCount, setTabCount] = useState(3);
  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2 tabCount={tabCount} setTabCount={setTabCount} />
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
          {tabCount === 1 && <AddNewStudio />}
          {tabCount === 2 && <AddNewProduction />}

          {tabCount === 3 ? (
            <AllStudioPageDetailsPage />
          ) : tabCount === 4 ? (
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
