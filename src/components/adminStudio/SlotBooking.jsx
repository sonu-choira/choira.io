import React, { useEffect, useRef, useState } from "react";
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
import timeSlotApi from "../../services/timeSlotApi";
import { event, send } from "react-ga";
import ChooseTimeSlot from "./ChooseTimeSlot";

function SlotBooking({ setSelectTab }) {
  const timeSlotApiData = useRef({
    userName: "",
    mobile: "",
    email: "",
    studioId: "",
    roomId: "",
    bookingDate: "",
    bookingHours: "1",
  });
  const [test, settest] = useState(timeSlotApiData);
  // const timeSlotApiData = useRef({
  //   userName: "ss",
  //   mobile: "aa",
  //   email: "aaa",
  //   studioId: "63d1225e1b3a159c2ce0799e",
  //   roomId: "1",
  //   bookingDate: "2024-05-18",
  //   bookingHours: "1",
  // });

  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const [showAllSlots, setshowAllSlots] = useState(false);

  const [allStudio, setAllStudio] = useState([]);

  useEffect(() => {
    timeSlotApi
      .getonlyStudio()
      .then((res) => {
        console.log(res.studios);
        setAllStudio(res.studios);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    if (showAllSlots) {
      setshowAllSlots(false);
    } else {
      navigate("/adminDashboard/Bookings/studio");
    }
  };
  const [selectedStudioid, setselectedStudioid] = useState("");
  const [selectRooms, setselectRooms] = useState([]);
  useEffect(() => {
    console.log("selectedStudioid");
    console.log(selectedStudioid);
  }, [selectedStudioid]);

  const handelStudioid = (e) => {
    let id = e.target.value;
    console.log("id");
    console.log(id);
    setselectedStudioid(id);

    timeSlotApiData.current.studioId = id;
    let ans = allStudio.filter((allStudio) => allStudio._id == id);
    console.log("ans");
    console.log(ans[0].roomsDetails);
    setselectRooms(ans[0].roomsDetails);
  };
  useEffect(() => {
    console.log("selectRooms");
    console.log(selectRooms);
  }, [selectRooms]);
  const [allTimeSlots, setallTimeSlots] = useState({});

  useEffect(() => {
    console.log("timeSlotApiData");
    console.log(timeSlotApiData);
  }, [timeSlotApiData.current]);

  const sendTimeSlotDataToApi = () => {
    console.log("timeSlotApiData");
    console.log(timeSlotApiData.current);

    // Get all keys of the object
    let ans = Object.keys(timeSlotApiData.current);

    // Check if any field is empty
    for (let check of ans) {
      if (timeSlotApiData.current[check] === "") {
        alert(`Please fill ${check} fields`);
        return;
      }
    }

    // If all fields are filled, call the API
    hitapi();
  };

  let hitapi = () => {
    timeSlotApi
      .getAllSolts(timeSlotApiData.current)
      .then((res) => {
        console.log(res);
        setshowAllSlots(true);
        setallTimeSlots(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("testing..............");
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
          {showAllSlots ? (
            <ChooseTimeSlot
              allTimeSlots={allTimeSlots}
              setallTimeSlots={setallTimeSlots}
              hitapi={hitapi}
              timeSlotApiData={timeSlotApiData}
            />
          ) : (
            <div className={style.addNewStudioPage}>
              <div style={{ height: "80%" }}>
                <div>
                  <div className={style.addNewStudioinputBox}>
                    <label htmlFor="UserName">User Name</label>
                    <input
                      type="text"
                      id="UserName"
                      placeholder="Enter User Name"
                      onChange={(e) => {
                        timeSlotApiData.current.userName = e.target.value;
                      }}
                      // value={timeSlotApiData.current?.userName}
                    />
                  </div>

                  <div className={style.addNewStudioinputBox}>
                    <label htmlFor="Mobilenumber">Mobile number</label>
                    <input
                      type="number"
                      id="Mobilenumber"
                      placeholder="Enter Mobile number"
                      onChange={(e) => {
                        timeSlotApiData.current.mobile = e.target.value;
                      }}
                      // value={timeSlotApiData.current?.mobile}
                    />
                  </div>

                  <div className={style.addNewStudioinputBox}>
                    <label htmlFor="Email">Email</label>
                    <input
                      type="email"
                      id="Email"
                      placeholder="Enter Email id"
                      onChange={(e) => {
                        timeSlotApiData.current.email = e.target.value;
                      }}
                      // value={timeSlotApiData.current?.email}
                    />
                  </div>

                  {/* <div className={style.addNewStudioinputBox}>
                  <label>Booking Hours</label>

                  <select>
                    <option>Choose Booking Hours</option>
                    <option>1 Hour</option>
                    <option>2 Hour</option>
                    <option>3 Hour</option>
                    <option>4 Hour</option>
                    <option>5 Hour</option>
                  </select>
                </div> */}
                </div>
                {/* secod side  */}
                <div>
                  <div className={style.addNewStudioinputBox}>
                    <label>Studio</label>

                    <select
                      onChange={(event) => {
                        handelStudioid(event);
                      }}
                      value={selectedStudioid}
                    >
                      <option value="" disabled selected>
                        Select Studio
                      </option>
                      {allStudio?.map((studio) => (
                        <option key={studio._id} value={studio._id}>
                          {studio.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={style.addNewStudioinputBox}>
                    <label>Room</label>

                    <select
                      onChange={(event) => {
                        timeSlotApiData.current.roomId = event.target.value;
                      }}
                      value={timeSlotApiData?.roomName}
                    >
                      <option value="" disabled selected>
                        Select Room
                      </option>
                      {selectRooms?.map((room, index) => (
                        <option value={room.roomId}>{room.roomName}</option>
                      ))}
                    </select>
                  </div>

                  <div className={style.addNewStudioinputBox}>
                    <label htmlFor="Date">Date</label>
                    <input
                      type="date"
                      id="RoomArea"
                      placeholder="Enter Date"
                      onChange={(event) => {
                        timeSlotApiData.current.bookingDate =
                          event.target.value;
                        console.log("timeSlotApiData");
                        console.log(timeSlotApiData);
                      }}
                      // value={timeSlotApiData.current?.bookingDate}
                    />
                  </div>

                  <div
                    className={style.addNewStudioinputBox}
                    style={{ cursor: "pointer" }}
                  >
                    <label htmlFor="TimeSlot">Time Slot</label>
                    <input
                      style={{ cursor: "pointer" }}
                      type="text"
                      id="TimeSlot"
                      placeholder="Choose Time Slot"
                      // disabled
                      onClick={sendTimeSlotDataToApi}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <StudioFooter setSelectTab={setSelectTab} backOnclick={backOnclick} />
        </div>
      </div>
    </>
  );
}

export default SlotBooking;
