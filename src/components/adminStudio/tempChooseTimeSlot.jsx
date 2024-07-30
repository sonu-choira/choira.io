import React, { useEffect, useState } from "react";
import { MdAddAPhoto, MdOutlineSettings } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";
import { GrSubtractCircle } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
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

function tempChooseTimeSlot({ setSelectTab }) {
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
  const [counter, setCounter] = useState(1);
  const handelCounter = (type) => {
    if (type === "add") {
      if (counter < 24) {
        setCounter(counter + 1);
      }
    } else {
      if (counter > 1) {
        setCounter(counter - 1);
      }
    }
  };

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
  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:30 AM - 11:30 AM",
    "12:00 PM - 1:00 PM",
    "1:30 PM - 2:30 PM",
    "3:00 PM - 4:00 PM",
    "4:30 PM - 5:30 PM",
    "6:00 PM - 7:00 PM",
    "7:30 PM - 8:30 PM",
    "9:00 PM - 10:00 PM",
    "10:30 PM - 11:30 PM",
    "12:00 AM - 1:00 AM",
    "1:30 AM - 2:30 AM",
    "3:00 AM - 4:00 AM",
    "4:30 AM - 5:30 AM",
    "6:00 AM - 7:00 AM",
    "7:30 AM - 8:30 AM",
  ];
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const [selectedSlot, setSelectedSlot] = useState(null);
  useEffect(() => {
    console.log("selectedSlot");
    console.log(selectedSlot);
  }, [selectedSlot]);
  const chunkedTimeSlots = chunkArray(timeSlots, 4);

  const handleSlotClick = (slot) => {
    if (slot === selectedSlot) {
      setSelectedSlot(null); // Deselect the slot if it's already selected
    } else {
      setSelectedSlot(slot); // Select the clicked slot
    }
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
          <div className={style.timeSlotDiv}>
            <div className={style.mainSlotDiv}>
              <div>
                <div>
                  <h3>Choose Time Slot</h3>
                </div>
                <div className={style.counterMaindiv}>
                  <div>
                    <b>Choose</b>
                    <small>Hour 1-24</small>
                  </div>
                  <div className={style.counterDiv}>
                    <GrSubtractCircle
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handelCounter("sub");
                      }}
                    />
                    <p>{counter}</p>
                    <GrAddCircle
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handelCounter("add");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={style.allSlots}>
                {chunkedTimeSlots.map((chunk, index) => (
                  <div key={index} className={style.selectSlotDiv}>
                    {chunk.map((slot, idx) => (
                      <div
                        key={idx}
                        className={`${style.slots} ${
                          slot === selectedSlot ? style.selected : ""
                        }`}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <StudioFooter setSelectTab={setSelectTab} backOnclick={backOnclick} />
        </div>
      </div>
    </>
  );
}

export default tempChooseTimeSlot;
