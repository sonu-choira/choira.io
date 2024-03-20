import React, { useEffect, useRef, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
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
import { Button, Divider, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DragAndDropImageDiv from "../../pages/admin/layout/DragAndDropImageDiv";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function AddNewRoom({
  setshowRoomsDetails,
  isEditMode,
  setrooms,
  rooms,
  indexofrooms,
  setIndexofrooms,
}) {
  const currentRoomsData = rooms[indexofrooms] || "";

  let genreralStartTime;
  let genreralEndTime;
  useEffect(() => {
    genreralStartTime = String(
      `${currentRoomsData?.generalTime?.startTime}:00`
    );
    console.log("genreralStartTime", genreralStartTime);
    console.log("genreralStartTime", typeof genreralStartTime);
    genreralEndTime = String(`${currentRoomsData?.generalTime?.endTime}:00`);
    console.log("genreralEndTime", genreralEndTime);
  }, [currentRoomsData]);
  console.log("indexofrooms", indexofrooms);
  useEffect(() => {
    console.log("currentRoomsData------>/", currentRoomsData);
    console.log(
      "currentRoomsData?.generalTime?.startTime",
      `${currentRoomsData?.generalTime?.startTime}:00`
    );
  }, []);

  const inputRef = useRef(null);
  const [images, setImages] = useState(
    currentRoomsData ? currentRoomsData.roomPhotos : []
  );

  const [time, setTime] = useState();
  const [bookingtime, setBookingtime] = useState();

  const handelGeneralTime = (time, timeString) => {
    console.log(time, timeString);
    console.log("time is ", time);
    console.log("timeString is ", timeString);
    setTime(timeString);
  };
  const handelbookingTime = (time, timeString) => {
    console.log(time, timeString);
    console.log("bookingt time is ", time);
    console.log(" boolking timeString is ", timeString);
    setBookingtime(timeString);
  };

  const abdefaultValue = ["18:30:56", "23:30:56"];

  useEffect(() => {
    console.log("timeRange", time);
  }, [time]);
  dayjs.extend(customParseFormat);

  const days = [
    { id: "Monday", label: "Monday" },
    { id: "Tuesday", label: "Tuesday" },
    { id: "wednesday", label: "wednesday" },
    { id: "thursday", label: "thursday" },
    { id: "friday", label: "friday" },
    { id: "Saturday", label: "Saturday" },
    { id: "sunday", label: "sunday" },
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

  const [amenitiesList, setAmenitiesList] = useState([
    "Wifi",
    "AC",
    "DJ",
    "Piano",
    "Drum",
    "Car Parking",
    "Banjo",
  ]);
  const [name, setName] = useState("");
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setAmenitiesList([...amenitiesList, name]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    console.log("room k details mila", rooms);
  }, [rooms]);

  const handleRoomNameChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        roomName: value,
      };
      return updatedRooms;
    });
  };

  const handleRoomAreaChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        area: value,
      };
      return updatedRooms;
    });
  };

  const handlePricePerHourChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        pricePerHour: value,
      };
      return updatedRooms;
    });
  };

  const handleDiscountChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        discountPercentage: value,
      };
      return updatedRooms;
    });
  };

  const handleRoomDetailsChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        roomDetails: value,
      };
      return updatedRooms;
    });
  };

  return (
    <>
      <div className={style.addNewStudioTitle}>Add new room</div>
      <div className={style.addNewRoomPage}>
        <div>
          <div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="RoomName">Room Name</label>
              <input
                type="text"
                id="RoomName"
                placeholder="Enter Room Name"
                value={currentRoomsData?.roomName}
                onChange={handleRoomNameChange}
              />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="RoomArea">Room Area</label>
              <input
                type="text"
                id="RoomArea"
                placeholder="Enter Approx. Area"
                value={currentRoomsData?.area}
                onChange={handleRoomAreaChange}
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="price">Price Per Hour</label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price Per Hour"
                value={currentRoomsData?.pricePerHour}
                onChange={handlePricePerHourChange}
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Discount">Discount</label>
              <input
                type="number"
                id="Discount"
                placeholder="Enter Discount"
                value={currentRoomsData?.discountPercentage}
                onChange={handleDiscountChange}
              />
            </div>

            <div className={style.defaultLabel}>Booking Days</div>
            <div className={style.amenitesCheckbox}>
              {days.map((days) => (
                <div key={days.id}>
                  <input
                    type="checkbox"
                    id={days.id}
                    value={days.id}
                    checked={selectedDate.includes(days.id)}
                    onChange={() => handledaysCheckboxChange(days.id)}
                  />
                  &nbsp;
                  <label htmlFor={days.id}>{days.label}</label>
                </div>
              ))}
            </div>

            <div className={style.addNewStudioinputBox}>
              <label>General Start & End Time</label>
              <TimePicker.RangePicker
                onChange={handelGeneralTime}
                // defaultValue={[
                //   dayjs("1:30:00", "HH:mm:ss"),
                //   dayjs("2:30:56", "HH:mm:ss"),
                // ]}
                defaultValue={
                  isEditMode
                    ? [
                        dayjs(`${genreralStartTime}`, "HH:mm:ss"),
                        dayjs(`${genreralEndTime}`, "HH:mm:ss"),
                      ]
                    : []
                }
                style={{ height: "100%", outline: "none" }}
              />
            </div>
            {/* <div className={style.addNewStudioinputBox}>
              <label>Booking Start Time</label>
              <select>
                <option>Select Booking Start Time</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div> */}
          </div>
          <div>
            <DragAndDropImageDiv
              images={images}
              setImages={setImages}
              isEditMode={isEditMode}
            />

            <div className={style.defaultLabel}>Amenities</div>
            {/* <div className={style.amenitesCheckbox}>
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
              
            </div> */}

            <Select
              mode="multiple"
              style={{
                width: "100%",
                minHeight: "7%",

                outline: "none",
                border: "none",
              }}
              placeholder="Select one or more Amenities"
              value={currentRoomsData?.amenities?.map((item) => item) || []}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={amenitiesList.map((item) => ({
                label: item,
                value: item,
              }))}
            />
            <div className={style.addNewStudioinputBox2}>
              <label htmlFor="RoomDetails">Room Details</label>
              <textarea
                type="text"
                id="RoomDetails"
                placeholder="Enter Room Details"
                value={currentRoomsData?.details?.map((item) => item) || []}
                onChange={handleRoomDetailsChange}
              />
            </div>
            {/* <div className={style.addNewStudioinputBox}>
              <label>General End Time</label>

              <select>
                <option>Select General End Time</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div> */}
            <div className={style.addNewStudioinputBox}>
              <label>Booking start & End Time</label>

              <TimePicker.RangePicker
                onChange={handelbookingTime}
                defaultValue={[
                  dayjs("3:30:00", "HH:mm:ss"),
                  dayjs("4:30:00", "HH:mm:ss"),
                ]}
                style={{ height: "100%", outline: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
      <StudioFooter
        backOnclick={() => {
          setshowRoomsDetails(false);
        }}
      />
    </>
  );
}

export default AddNewRoom;
