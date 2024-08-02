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
import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";
import ChoiraLoder2 from "../loader/ChoiraLoder2";
import ChoiraLoader from "../loader/ChoiraLoader";

function SlotBooking({ setSelectTab }) {
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  let loaderText = "Booking ...";
  const [timeSlotApiData, setTimeSlotApiData] = useState({
    bookingType: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    studioId: "",
    roomId: "",
    bookingDate: "",
    bookingHours: "1",
    totalPrice: "",
    bookingTime: "",
    actualBasePrice: "",
    serviceType: "c1",
    userId: "",
    tempUserName: "",
  });
  // let navigate = useNavigate();
  const data = useLocation();
  const [tabCount, setTabCount] = useState();
  const navCount = data?.state?.navCount;
  const [showAllSlots, setshowAllSlots] = useState(false);

  const [allStudio, setAllStudio] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showLoader, setshowLoader] = useState(false);

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
  const [registered, setregistered] = useState(false);

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
    setTimeSlotApiData((prevData) => ({
      ...prevData,
      roomId: "",
      totalPrice: "",
    }));

    setselectRooms([]);
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
    console.log(ans);
    console.log(ans[0].roomsDetails);
    setselectRooms(ans[0].roomsDetails);
  };
  const handelRoomSelect = (room) => {
    console.log("room", room);
    setTimeSlotApiData((prevData) => ({
      ...prevData,
      roomId: room.roomId,
      // totalPrice: room.pricePerHour,
      totalPrice: room.pricePerHour * prevData?.bookingHours,
      actualBasePrice: room.pricePerHour,
    }));
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

    if (registered) {
      delete newData.email;
      delete newData.phoneNumber;
      delete newData.fullName;
      delete newData.tempUserName;
    }
    delete newData.bookingTime;
    delete newData.actualBasePrice;
    delete newData.serviceType;
    delete newData.userId;
    delete newData.tempUserName;

    let ans = Object.keys(newData);

    for (let check of ans) {
      if (newData[check] === "") {
        alert(`Please fill ${check} fields`);
        return;
      }
    }

    hitapi();
  };
  const slotBookingApi = () => {
    let newData = { ...timeSlotApiData };
    delete newData.actualBasePrice;
    delete newData.bookingHours;
    delete newData.tempUserName;

    if (registered) {
      delete newData.email;
      delete newData.phoneNumber;
      delete newData.fullName;
    } else {
      delete newData.userId;
    }
    console.log(newData);
    let ans = Object.keys(newData);
    for (let check of ans) {
      if (newData[check] === "") {
        return;
      }
    }
    newData.bookingDate = newData.bookingDate + "T00:00:00.000Z";
    setshowLoader(true);
    setShowBtnLoader(true);
    timeSlotApi
      .offlineStudioBooking(newData)
      .then((res) => {
        console.log(res);
        if (res.status) {
          setShowBtnLoader(false);
          setshowAllSlots(false);
          setshowLoader(false);
          sucessAlret("Booking done");
          navigate("/adminDashboard/Bookings/studio");
        } else {
          setShowBtnLoader(false);
          errorAlert(res.message || "Booking failed");
          setshowLoader(false);
        }
      })
      .catch((err) => {
        setShowBtnLoader(false);
        console.log(err);
        errorAlert(err || "Booking failed");

        setshowLoader(false);
      });
  };

  const handelSavebtn = () => {
    if (showAllSlots) {
      if (selectedSlot) {
        console.log("timeSlotApiData", timeSlotApiData);
        // slotBookingApi();
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
  const handelUsertype = (val) => {
    if (val == "registered") {
      setregistered(true);
      setTimeSlotApiData((prevData) => ({
        ...prevData,
        fullName: "",
        email: "",
        phoneNumber: "",
        bookingType: val,
      }));
    } else {
      setregistered(false);
      setTimeSlotApiData((prevData) => ({
        ...prevData,

        bookingType: val,
      }));
    }
  };
  const handleUserChange = (newValue) => {
    // Handle user selection change here
    setTimeSlotApiData((prevData) => ({
      ...prevData,
      userId: newValue.value,
      tempUserName: newValue.label,
    }));
    console.log("Selected user:", newValue);
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
        value: user._id,
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
          {/* <div className={style.studioHeader}>
            <div className={style.puredisabled}>
              <input
                type="text"
                placeholder="search"
                readOnly
                disabled
                className={style.puredisabled}
              />
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
          </div> */}
          <div className={style.addNewStudioTitle}>Slot Booking</div>

          {showAllSlots ? (
            <ChooseTimeSlot
              allTimeSlots={allTimeSlots}
              setallTimeSlots={setallTimeSlots}
              hitapi={hitapi}
              timeSlotApiData={timeSlotApiData}
              setTimeSlotApiData={setTimeSlotApiData}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          ) : (
            <div className={style.addNewStudioPage}>
              {showLoader ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F0F0F0",
                  }}
                >
                  <ChoiraLoader />
                </div>
              ) : (
                <div style={{ height: "70%" }}>
                  <div>
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="booking">Select Booking type</label>
                      <select
                        name=""
                        id="booking"
                        onChange={(event) => {
                          handelUsertype(event.target.value);
                        }}
                        value={timeSlotApiData.bookingType}
                      >
                        <option value="" disabled>
                          Select User type
                        </option>
                        <option value="registered">Registered</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    {!registered ? (
                      <div className={style.addNewStudioinputBox}>
                        <label htmlFor="UserName">User Name</label>
                        <input
                          type="text"
                          id="UserName"
                          placeholder="Enter User Name"
                          disabled={registered}
                          value={timeSlotApiData.fullName}
                          onChange={(e) => {
                            setTimeSlotApiData((prevData) => ({
                              ...prevData,
                              fullName: e.target.value,
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
                          defaultValue={timeSlotApiData?.tempUserName}
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                    {!registered && (
                      <div className={style.addNewStudioinputBox}>
                        <label htmlFor="Mobilenumber">Mobile number</label>
                        <input
                          type="number"
                          id="Mobilenumber"
                          placeholder="Enter Mobile number"
                          value={timeSlotApiData.phoneNumber}
                          onChange={(e) => {
                            setTimeSlotApiData((prevData) => ({
                              ...prevData,
                              phoneNumber: e.target.value,
                            }));
                          }}
                          disabled={registered}
                        />
                      </div>
                    )}

                    {!registered && (
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
                          disabled={registered}
                        />
                      </div>
                    )}

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="price">Total Price</label>
                      <input
                        type="number"
                        id="price"
                        placeholder="Your Total Price"
                        value={timeSlotApiData?.totalPrice}
                        disabled={true}
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
                        <option value="" disabled>
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
                          const selectedRoomId = Number(event.target.value);
                          const selectedRoom = selectRooms.find(
                            (room) => room.roomId === selectedRoomId
                          );
                          console.log(selectedRoom, "selectedRoom");
                          handelRoomSelect(selectedRoom);
                        }}
                        value={timeSlotApiData.roomId}
                      >
                        <option value="" disabled>
                          Select Room
                        </option>
                        {selectRooms?.map((room) => (
                          <option key={room.roomId} value={room.roomId}>
                            {room.roomName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="Date">Date</label>
                      <input
                        type="date"
                        id="RoomArea"
                        min={getCurrentDate()}
                        value={timeSlotApiData.bookingDate}
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
                        readOnly
                        // disabled={timeSlotApiData?.bookingTime && true}
                        placeholder="Click to select time slot"
                        value={
                          timeSlotApiData?.bookingTime &&
                          `${timeSlotApiData?.bookingTime?.startTime} - ${timeSlotApiData?.bookingTime?.endTime}`
                        }
                        onClick={sendTimeSlotDataToApi}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <StudioFooter
            sname={showAllSlots ? "Save" : "Book"}
            saveDisabled={!timeSlotApiData?.bookingTime && true}
            backOnclick={backOnclick}
            saveOnclick={!showAllSlots ? slotBookingApi : handelSavebtn}
            loaderText={loaderText}
            showBtnLoader={showBtnLoader}
          />
        </div>
      </div>
    </>
  );
}

export default SlotBooking;
