import React, { useState } from "react";
import { MdAddAPhoto, MdOutlineSettings } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";

import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";
import StudioFooter from "./StudioFooter";
import WebDashboard2 from "../../pages/produce/WebDashBoard2";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";

function SlotBooking({ setSelectTab }) {
  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const days = [
    { id: "Monday", label: "Monday" },
    { id: "Tuesday", label: "Tuesday" },
    { id: "wednesday", label: "wednesday" },
    { id: "thursday", label: "thursday" },
    { id: "friday", label: "friday" },
    { id: "Saturday", label: "Saturday" },
    { id: "sunday", label: "sunday" },
  ];
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
  const [selectedDate, setSelectedDate] = useState([]);

  const handleCheckboxChange = (id) => {
    const updatedAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter((amenity) => amenity !== id)
      : [...selectedAmenities, id];

    setSelectedAmenities(updatedAmenities);
    console.log(selectedAmenities);
  };
  const handledaysCheckboxChange = (id) => {
    const updaeddays = selectedDate.includes(id)
      ? selectedDate.filter((day) => day !== id)
      : [...selectedDate, id];

    setSelectedDate(updaeddays);
    console.log(selectedDate);
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
  const navigate = useNavigate();
  const backOnclick = () => {
    navigate("/adminDashboard");
  };
  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2
          navCount={navCount}
          tabCount={tabCount}
          setTabCount={setTabCount}
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
          <div className={style.addNewStudioTitle}>Slot Booking</div>
          <div className={style.addNewStudioPage}>
            <div style={{ height: "80%" }}>
              <div>
                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="UserName">User Name</label>
                  <input
                    type="text"
                    id="UserName"
                    placeholder="Enter User Name"
                  />
                </div>

                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="Mobilenumber">Mobile number</label>
                  <input
                    type="text"
                    id="Mobilenumber"
                    placeholder="Enter Mobile number"
                  />
                </div>

                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="Email">Email</label>
                  <input type="email" id="Email" placeholder="Enter Email id" />
                </div>

                <div className={style.addNewStudioinputBox}>
                  <label>Booking Hours</label>

                  <select>
                    <option>Choose Booking Hours</option>
                    <option>1 Hour</option>
                    <option>2 Hour</option>
                    <option>3 Hour</option>
                    <option>4 Hour</option>
                    <option>5 Hour</option>
                  </select>
                </div>
              </div>
              {/* secod side  */}
              <div>
                <div className={style.addNewStudioinputBox}>
                  <label>Studio</label>

                  <select>
                    <option>Select Studio</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className={style.addNewStudioinputBox}>
                  <label>Room</label>

                  <select>
                    <option>Select Room</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>

                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="Date">Date</label>
                  <input type="date" id="RoomArea" placeholder="Enter Date" />
                </div>

                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="TimeSlot">Time Slot</label>
                  <input
                    type="time"
                    id="TimeSlot"
                    placeholder="Enter Time Slot"
                  />
                </div>
              </div>
            </div>
          </div>
          <StudioFooter setSelectTab={setSelectTab} backOnclick={backOnclick} />
        </div>
      </div>
    </>
  );
}

export default SlotBooking;
