import React, { useEffect, useMemo, useState } from "react";
import "../studios/studios.css";
import WebDashboard from "../../produce/WebDashboard";
import { IoSearch } from "react-icons/io5";

import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";
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
            <div className="addNewStudioTitle">Add new studio</div>
            <div className="addNewStudioPage">
              <div>
                <div>
                  <div className="addNewStudioinputBox">
                    <label htmlFor="studioName">Studio Name</label>
                    <input
                      type="text"
                      id="studioName"
                      placeholder="Enter Studio Area"
                    />
                  </div>

                  <div className="addNewStudioinputBox">
                    <label htmlFor="area">Total Area</label>
                    <input
                      type="text"
                      id="area"
                      placeholder="Enter Approx. Area"
                    />
                  </div>
                  <div className="addNewStudioinputBox">
                    <label htmlFor="studioName">Studio Name</label>
                    <input type="text" id="studioName" placeholder="hi" />
                  </div>
                  <div className="addNewStudioinputBox">
                    <label htmlFor="studioName">Studio Pincode</label>
                    <input
                      type="text"
                      id="studioName"
                      placeholder="Enter Pincode"
                    />
                  </div>
                  <div className="addNewStudioinputBox">
                    <label htmlFor="studioName">Studio City</label>
                    <input list="city" />
                    <datalist id="city">
                      <option value="mumbai">mumbai</option>
                      <option value="delhi">Delhi</option>
                    </datalist>
                  </div>
                </div>
                <div></div>
              </div>
              <div></div>
            </div>
            <StudioFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Studios;
