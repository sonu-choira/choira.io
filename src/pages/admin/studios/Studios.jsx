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
import upload from "../../../assets/img/upload.png";

function Studios() {
  const amenitiesList = [
    { id: "wifi", label: "Wifi" },
    { id: "ac", label: "AC" },
    { id: "dj", label: "DJ" },
    { id: "piano", label: "Piano" },
    { id: "drum", label: "Drum" },
    { id: "carparking", label: "Car Parking" },
    { id: "banjo", label: "Banjo" },
  ];

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleCheckboxChange = (id) => {
    const updatedAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter((amenity) => amenity !== id)
      : [...selectedAmenities, id];

    setSelectedAmenities(updatedAmenities);
    console.log(selectedAmenities);
  };

  const [iframeCode, setIframeCode] = useState("");
  const [hasContent, setHasContent] = useState(false);

  const handleIframeCodeChange = (e) => {
    const inputCode = e.target.value;

    // Update the state with the user-entered iframe code
    setIframeCode(inputCode);

    // Update hasContent state based on whether there is content in the textarea
    setHasContent(inputCode.trim() !== "");
  };
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
                    <label htmlFor="rooms">Rooms</label>

                    <select id="rooms">
                      <option>Select No. of Rooms</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div className="addNewStudioinputBox">
                    <label htmlFor="pincode">Studio Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      placeholder="Enter Pincode"
                    />
                  </div>

                  <div className="addNewStudioinputBox">
                    <label htmlFor="addcity">Studio city</label>
                    <input
                      list="city"
                      id="addcity"
                      placeholder="Select city Name"
                    />
                    <datalist id="city">
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bombay">Bombay</option>
                    </datalist>
                  </div>
                  <div className="amenitesCheckbox">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity.id}>
                        <input
                          type="checkbox"
                          id={amenity.id}
                          value={amenity.id}
                          checked={selectedAmenities.includes(amenity.id)}
                          onChange={() => handleCheckboxChange(amenity.id)}
                        />
                        &nbsp;
                        <label htmlFor={amenity.id}>{amenity.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="addNewStudioimgBox">
                    <label htmlFor="selectimg">Image</label>
                    <br />

                    <div>
                      <label className="abs" htmlFor="selectimg">
                        <img src={upload} alt="" />
                        <div>
                          Drag and Drop or <span>Browse</span> <br /> to upload
                        </div>
                      </label>
                      <input type="file" id="selectimg" />
                    </div>
                  </div>
                  <div
                    className="addNewStudioinputBox"
                    style={{ paddingTop: "2%" }}
                  >
                    <label htmlFor="guest">Max Guests</label>

                    <select id="guest">
                      <option>Select Maximum Guest allowed</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>

                  <div className="addNewStudioinputBox">
                    <label htmlFor="addstate">Select State</label>
                    <input
                      list="state"
                      id="addstate"
                      placeholder="Select state Name"
                    />
                    <datalist id="state">
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bombay">Bombay</option>
                    </datalist>
                  </div>

                  <div className="addNewStudioinputBox">
                    <label
                      htmlFor="iframeCode"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        fontSize: "18px",
                      }}
                    >
                      Google Maps Embed Code
                    </label>
                    <input
                      type="text"
                      id="iframeCode"
                      placeholder="Paste Google Maps Embed Code here"
                      value={iframeCode}
                      onChange={handleIframeCodeChange}
                    />
                  </div>
                  <div style={{ fontSize: "1vmax", fontWeight: "600" }}>
                    Location
                  </div>
                  <div
                    className="showlocationDiv"
                    style={{
                      width: "100%",
                      height: "100%",

                      overflow: "hidden",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  >
                    {hasContent ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: iframeCode }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <span style={{ fontSize: "18px", color: "#888" }}>
                          Location will be visible here
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="addNewStudioinputBox2">
                    <label htmlFor="aboutStudio">About Studio</label>
                    <textarea
                      type="text"
                      id="aboutStudio"
                      placeholder="Enter Studio Details"
                    />
                  </div>
                  <div className="addNewStudioinputBox2">
                    <label htmlFor="studioService">Studio Services</label>
                    <textarea
                      type="text"
                      id="studioService"
                      placeholder="Enter Studio Services"
                    />
                  </div>
                  <div className="addNewStudioinputBox2">
                    <label htmlFor="area">Total Area</label>
                    <textarea
                      type="text"
                      id="area"
                      placeholder="Enter Approx. Area"
                    />
                  </div>
                  <div className="roomAndClassSection">
                    <div>
                      <div className="addNewStudioinputBox3">
                        <label htmlFor="pincode">Rooms</label>
                        <input
                          type="text"
                          id="pincode"
                          placeholder="Enter Pincode"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="addNewStudioinputBox3">
                        <label htmlFor="pincode">Our Team</label>
                        <input
                          type="text"
                          id="pincode"
                          placeholder="Enter Pincode"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <StudioFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Studios;
