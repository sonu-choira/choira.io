import React, { useEffect, useState } from "react";
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
import userApi from "../../services/userApi";
import SearchAndSelectInput from "../../pages/admin/layout/SearchAndSelectInput";
import SearchSelectInput from "../../pages/admin/layout/SearchAndSelectInput";

function SlotBooking({ setSelectTab }) {
  const [timeSlotApiData, setTimeSlotApiData] = useState({
    userType: "",
    userName: "",
    mobile: "",
    email: "",
    studioId: "",
    roomId: "",
    bookingDate: "",
    bookingHours: "1",
  });

  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const [showAllSlots, setshowAllSlots] = useState(false);

  const [allStudio, setAllStudio] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

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
  const [selectedSlot, setSelectedSlot] = useState(null);

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

    setTimeSlotApiData((prevData) => ({
      ...prevData,
      studioId: id,
    }));

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

  let hitapi = () => {
    timeSlotApi
      .getAllSolts(timeSlotApiData)
      .then((res) => {
        console.log(res);
        setshowAllSlots(true);
        setallTimeSlots(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("timeSlotApiData");
    console.log(timeSlotApiData);
  }, [timeSlotApiData]);

  const sendTimeSlotDataToApi = () => {
    console.log("timeSlotApiData");
    console.log(timeSlotApiData);
    let newData = { ...timeSlotApiData };

    if (disabled) {
      delete newData.email;
      delete newData.mobile;
    }

    let ans = Object.keys(newData);

    for (let check of ans) {
      if (newData[check] === "") {
        alert(`Please fill ${check} fields`);
        return;
      }
    }

    hitapi();
  };
  const handelSavebtn = () => {
    if (showAllSlots) {
      if (selectedSlot) {
        setshowAllSlots(false);
      } else {
        alert("Please choose a slot");
      }
    } else if (selectedSlot) {
      alert("sendingData to api");
      timeSlotApi
        .getAllSolts(timeSlotApiData)
        .then((res) => {
          console.log(res);
          setshowAllSlots(true);
          setallTimeSlots(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [disabled, setDisabled] = useState(false);
  const handelUsertype = (val) => {
    if (val == "registered") {
      setDisabled(true);
      setTimeSlotApiData((prevData) => ({
        ...prevData,
        userName: "",
        email: "",
        mobile: "",
        userType: val,
      }));
    } else {
      setDisabled(false);
      setTimeSlotApiData((prevData) => ({
        ...prevData,

        userType: val,
      }));
    }
  };
  const handleUserChange = (newValue) => {
    // Handle user selection change here
    setTimeSlotApiData((prevData) => ({
      ...prevData,
      userName: newValue.value,
    }));
    console.log("Selected user:", newValue.value);
  };
  async function fetchUserList(username) {
    let dataToSend = {
      searchUser: username,
    };
    try {
      const response = await userApi.getAllUser(1, dataToSend);
      console.log("response.data.users", response.users);
      return response.users.map((user) => ({
        label: `${user.fullName} `,
        value: user.fullName,
      }));
    } catch (error) {
      console.error("Error fetching user list:", error);
      return []; // return empty array in case of error
    }
  }

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
          {showAllSlots ? (
            <ChooseTimeSlot
              allTimeSlots={allTimeSlots}
              setallTimeSlots={setallTimeSlots}
              hitapi={hitapi}
              timeSlotApiData={timeSlotApiData}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          ) : (
            <div className={style.addNewStudioPage}>
              <div style={{ height: "80%" }}>
                <div>
                  <div className={style.addNewStudioinputBox}>
                    <label htmlFor="UserName">Select User type</label>
                    <select
                      name=""
                      id=""
                      onChange={(event) => {
                        handelUsertype(event.target.value);
                      }}
                    >
                      <option value="" disabled selected>
                        Select User type
                      </option>
                      <option value="registered">Registered</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                  {!disabled ? (
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="UserName">User Name</label>
                      <input
                        type="text"
                        id="UserName"
                        placeholder="Enter User Name"
                        disabled={disabled}
                        onChange={(e) => {
                          setTimeSlotApiData((prevData) => ({
                            ...prevData,
                            userName: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  ) : (
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="UserName">User Name</label>
                      <SearchSelectInput
                        placeholder="Select users"
                        fetchOptions={fetchUserList}
                        onChange={handleUserChange}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  )}

                  <div className={style.addNewStudioinputBox}>
                    <label htmlFor="Mobilenumber">Mobile number</label>
                    <input
                      type="number"
                      id="Mobilenumber"
                      placeholder="Enter Mobile number"
                      value={timeSlotApiData.mobile}
                      onChange={(e) => {
                        setTimeSlotApiData((prevData) => ({
                          ...prevData,
                          mobile: e.target.value,
                        }));
                      }}
                      disabled={disabled}
                    />
                  </div>

                  <div className={style.addNewStudioinputBox}>
                    <label htmlFor="Email">Email</label>
                    <input
                      type="email"
                      id="Email"
                      placeholder="Enter Email id"
                      value={timeSlotApiData.email}
                      onChange={(e) => {
                        setTimeSlotApiData((prevData) => ({
                          ...prevData,
                          email: e.target.value,
                        }));
                      }}
                      disabled={disabled}
                    />
                  </div>
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
                        setTimeSlotApiData((prevData) => ({
                          ...prevData,
                          roomId: event.target.value,
                        }));
                      }}
                      value={timeSlotApiData.roomId}
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
                      min={getCurrentDate()}
                      placeholder="Enter Date"
                      onChange={(event) => {
                        setTimeSlotApiData((prevData) => ({
                          ...prevData,
                          bookingDate: event.target.value,
                        }));
                        console.log("timeSlotApiData");
                        console.log(timeSlotApiData);
                      }}
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
                      placeholder="Click to select time slot"
                      onClick={sendTimeSlotDataToApi}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <StudioFooter
            sname={showAllSlots ? "Save" : "Book"}
            saveDisabled={!showAllSlots && true}
            backOnclick={backOnclick}
            saveOnclick={handelSavebtn}
          />
        </div>
      </div>
    </>
  );
}

export default SlotBooking;
