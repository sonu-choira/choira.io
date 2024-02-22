import React, { useEffect, useMemo, useState } from "react";
// import "../studios/studios.css";
import style from "../studios/studio.module.css";
import { IoSearch } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { FaRegBell } from "react-icons/fa6";
import { MdCalendarMonth, MdOutlineSettings } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { LuFilePlus } from "react-icons/lu";
import Pagination from "./Pagination";
// import data from "../studios/mock-data.json";
import Button from "../layout/Button";
import { FaTableCellsLarge } from "react-icons/fa6";
import Switch from "../layout/Switch";
import OnboardStudio from "../../../components/adminStudio/OnboardStudio";
import AllStudioDetail from "../../../components/adminStudio/AllStudioDetail";
import StudioFooter from "../../../components/adminStudio/StudioFooter";
import upload from "../../../assets/img/upload.png";
import AddNewStudio from "../../../components/adminStudio/AddNewStudio";
import AddNewRoom from "../../../components/adminStudio/AddNewRoom";
import StudioBookingDetail from "../../../components/adminStudio/booking/StudioBookingDetail";
import MusicProduction from "../../../components/adminStudio/booking/MusicProduction";
import MixMaster from "../../../components/adminStudio/booking/MixMaster";
import Artist from "../../../components/adminStudio/booking/Artist";
import SlotBooking from "../../../components/adminStudio/SlotBooking";
import WebDashboard2 from "../../produce/WebDashBoard2";

function Studios() {
  const [selectTab, setSelectTab] = useState(1);
  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2 />
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
          {/* //sdhbsda */}

          {/* {selectTab===0 && (
            <OnboardStudio selectTab={selectTab} setSelectTab={setSelectTab} />
          )} */}
          <div className={style.allStudioDetailsPage}>
            {selectTab === 1 ? (
              <AllStudioDetail setSelectTab={setSelectTab} />
            ) : selectTab === 2 ? (
              <AddNewStudio setSelectTab={setSelectTab} />
            ) : selectTab === 3 ? (
              <SlotBooking setSelectTab={setSelectTab} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Studios;
