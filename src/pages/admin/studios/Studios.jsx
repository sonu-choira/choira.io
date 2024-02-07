import React, { useEffect, useMemo, useState } from "react";
import "../studios/studios.css";
import WebDashboard from "../../produce/WebDashboard";
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

function Studios() {
  return (
    <>
      <div className="wrapper">
        <WebDashboard />
        <div className="studioMainScreen">
          <div className="studioHeader">
            <div>
              <input type="text" placeholder="search" />
            </div>
            <div>
              <IoSearch />
            </div>
            <div>
              <div className="notifyIcon">
                <GoDotFill />
              </div>
              <FaRegBell />
            </div>
            <div>
              <MdOutlineSettings />
            </div>
          </div>
          {/* //sdhbsda */}
          {/* <OnboardStudio/> */}
          <div className="allStudioDetailsPage">
            {/* <AllStudioDetail /> */}
            {/* <AddNewStudio /> */}
            <AddNewRoom />

            <StudioFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Studios;
