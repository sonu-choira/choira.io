import React, { useEffect, useRef, useState } from "react";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";
import cross from "../../assets/cross.svg";

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
import MultipleSelect from "../../pages/admin/layout/MultipleSelect";
import { errorAlert, confirmAlret } from "../../pages/admin/layout/Alert";

function AddNewRoom({
  setshowRoomsDetails,
  isEditMode,
  setrooms,
  rooms,
  indexofrooms,
  setIndexofrooms,
  showMode,
}) {
  let currentRoomsData = rooms[indexofrooms] || "";
  let defaultData = {
    roomName: "",

    pricePerHour: "",
    discount: "",
    bookingDays: [],

    generalTime: {
      startTime: "",
      endTime: "",
    },
    bookingStartTime: [],
    bookingEndTime: [],
    roomPhotos: [],
    amenities: [],
    roomDetails: "",
  };

  const format = "HH:mm";
  const customStyles = {
    height: "90%",
    overFlow: "scroll",
  };
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    currentRoomsData?.bookingDays?.map((item) => item?.name || item) || []
  );
  const [time, setTime] = useState([]);
  const [generalTime, setGeneralTime] = useState({
    startTime: currentRoomsData?.generalTime?.startTime || "00:00",
    endTime: currentRoomsData?.generalTime?.endTime || "00:00",
  });
  const handleAddDetails = () => {
    setDetails((prevDetails) => [...prevDetails, ""]); // Add an empty string to the details array
  };

  const [bookingTimes, setBookingTimes] = useState(
    currentRoomsData?.availabilities
      ? [...currentRoomsData.availabilities]
      : [{ startTime: "00:00", endTime: "00:00" }]
  );

  // let genreralStartTime;
  // let genreralEndTime;

  const [details, setDetails] = useState(
    currentRoomsData.details ? currentRoomsData.details : [[]]
  );

  const inputRef = useRef(null);
  const [images, setImages] = useState(
    currentRoomsData ? currentRoomsData.roomPhotos : []
  );

  useEffect(() => {
    let dis = currentRoomsData.discountPercentage;
    let price = currentRoomsData.pricePerHour;

    let cal = (price, dis) => {
      let discountedAmount = (price * dis) / 100;
      let calculatedBasePrice = price + discountedAmount; // Renamed to avoid conflict
      return parseInt(calculatedBasePrice);
    };
    currentRoomsData.basePrice = cal(price, dis);

    // Update basePrice in state or do something with it here
  }, [currentRoomsData.pricePerHour, currentRoomsData.discountPercentage]);

  useEffect(() => {
    setrooms((prevRooms) => {
      return prevRooms.map((room, idx) => {
        if (idx === indexofrooms) {
          return {
            ...room, // Copy the previous room data
            roomPhotos: images, // Update roomPhotos with the new images
          };
        } else {
          return room;
        }
      });
    });
  }, [images]);

  useEffect(() => {
    setrooms((prevRooms) => {
      return prevRooms.map((room, idx) => {
        if (idx === indexofrooms) {
          return {
            ...room, // Copy the previous room data
            roomId: indexofrooms + 1,
          };
        } else {
          return room;
        }
      });
    });
  }, []);

  useEffect(() => {
    console.log("images", images);
  }, [images]);
  useEffect(() => {
    setrooms((prerooms) => {
      prerooms.map((rm, idex) => {
        if (idex === indexofrooms) {
          rm.amenities = selectedAmenities;
        }
      });
      return prerooms;
    });
  }, [selectedAmenities.length]);

  // useEffect(() => {
  //   setrooms((prerooms) => {
  //     prerooms.map((rm, idex) => {
  //       if (idex === indexofrooms) {
  //         console.log("selectedDate", selectedDate);
  //         rm.bookingDays = selectedDate;
  //       }
  //     });
  //     return prerooms;
  //   });
  // }, [selectedDate.length]);

  useEffect(() => {
    console.log("====>>>>>>>", rooms);
  }, [rooms]);

  useEffect(() => {
    setrooms((prerooms) => {
      return prerooms.map((rm, idex) => {
        if (idex === indexofrooms) {
          return { ...rm, availabilities: bookingTimes };
        }
        return rm;
      });
    });
  }, [bookingTimes]);

  useEffect(() => {
    setrooms((prerooms) => {
      return prerooms.map((room) => {
        return {
          ...room,
          generalTime: {
            startTime: generalTime.startTime,
            endTime: generalTime.endTime,
          },
        };
      });
    });
  }, [generalTime]);

  const handelGeneralTime = (_, timeString) => {
    setGeneralTime({
      startTime: timeString[0],
      endTime: timeString[1],
    });
  };

  useEffect(() => {
    // Ensure there's always at least one booking time range displayed
    if (bookingTimes.length === 0) {
      setBookingTimes([[{ startTime: "00:00", endTime: "00:00" }]]);
    }
  }, [bookingTimes]);

  const handleAddBookingTime = () => {
    // Add a new booking time range to the array
    setBookingTimes([
      ...bookingTimes,
      { startTime: "00:00", endTime: "00:00" },
    ]);
  };

  const handleCancelBooking = (index) => {
    // if (bookingTimes.length > 1 && index >= 0 && index < bookingTimes.length) {
    const newBookingTimes = [...bookingTimes];
    // alert(index);
    newBookingTimes.splice(index, 1);
    console.log(newBookingTimes);
    setBookingTimes(newBookingTimes);
    // }
  };

  useEffect(() => {
    console.log("bookingTimes", bookingTimes);
  }, [bookingTimes]);

  // const handelbookingTime = (time, timeString, index) => {
  //   console.log("timeString is", timeString);
  //   const updatedBookingTimes = [...bookingTimes];
  //   updatedBookingTimes[index] = timeString;
  //   setBookingTimes(updatedBookingTimes);
  // };
  const handelbookingTime = (time, timeString, index) => {
    console.log("timeString is", timeString);
    const updatedBookingTimes = [...bookingTimes];
    updatedBookingTimes[index] = {
      startTime: timeString[0],
      endTime: timeString[1],
    };
    setBookingTimes(updatedBookingTimes);
  };

  const abdefaultValue = ["18:30:56", "23:30:56"];

  useEffect(() => {
    console.log("timeRange", time);
  }, [time]);
  dayjs.extend(customParseFormat);

  const days = [
    // { id: "1", name: "Monday" },
    // { id: "2", name: "Tuesday" },
    // { id: "3", name: "wednesday" },
    // { id: "4", name: "thursday" },
    // { id: "5", name: "friday" },
    // { id: "6", name: "Saturday" },
    // { id: "7", name: "sunday" },
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const amenitiesList = [
    "Wifi",
    "AC",
    "DJ",
    "Piano",
    "Drum",
    "Car Parking",
    "Banjo",
  ];

  const filteredDates = days.filter((o) => !selectedDate.includes(o));

  const filteredAmenities = amenitiesList.filter(
    (o) => !selectedAmenities.includes(o)
  );

  useEffect(() => {
    setSelectedAmenities(
      currentRoomsData?.amenities?.map((item) => item) || []
    );
  }, [currentRoomsData?.amenities]);

  // useEffect(() => {
  //   setSelectedDate(
  //     currentRoomsData?.bookingDays?.map((item) => item?.name || item) || []
  //   );
  // }, [currentRoomsData?.bookingDays]);

  useEffect(() => {
    console.log("selectedDate updated:", selectedDate);
    currentRoomsData.bookingDays = selectedDate;
  }, [selectedDate.length]);

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
        ...updatedRooms[indexofrooms],
        pricePerHour: parseInt(value),
      };
      console.log(
        "updatedRooms--------------------------------------",
        updatedRooms
      );
      return updatedRooms;
    });
  };

  const handleDiscountChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        discountPercentage: parseInt(value),
      };
      return updatedRooms;
    });
  };
  const handleRoomDetailsChange = (e, index) => {
    const updatedDetails = [...details];
    updatedDetails[index] = e.target.value;
    setDetails(updatedDetails);
  };

  // useEffect(() => {
  //   setrooms((prevRooms) => ({
  //     ...prevRooms,
  //     details: details,
  //   }));
  // }, [details]);

  useEffect(() => {
    currentRoomsData.details = details;
  }, [details]);

  const handleCancelDetails = (index) => {
    let teampDetail = [...details];
    teampDetail.splice(index, 1);
    setDetails(teampDetail);
  };

  const handleDataUpdate = () => {
    delete currentRoomsData.bookingStartTime;
    delete currentRoomsData.bookingEndTime;
    delete currentRoomsData.discount;
    delete currentRoomsData.roomDetails;
    for (const key of Object.keys(currentRoomsData)) {
      if (`${currentRoomsData[key]}`.length <= 0) {
        return errorAlert(`${key} field is empty`);
      }
    }

    setshowRoomsDetails(false);
  };

  return (
    <>
      <div className={style.addNewStudioTitle}>Add new room</div>
      <form className={style.addNewRoomPage}>
        <div
          style={{
            position: showMode ? "relative" : "",
            overflow: "hidden",
          }}
        >
          {showMode ? <p className={style.showmode}></p> : ""}

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
                type="number"
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
                min={0}
                max={100}
                onChange={handleDiscountChange}
              />
            </div>
            <div className={style.customInput}>
              <label htmlFor="Dates">Booking Days </label>
              <Select
                id="Dates"
                mode="multiple"
                placeholder="Select Bookig Dates"
                value={selectedDate}
                onChange={setSelectedDate}
                // style={customStyles}
                options={filteredDates?.map((item, index) => ({
                  value: item,
                  label: item,
                  key: index,
                }))}
              />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label>General Start & End Time</label>

              <TimePicker.RangePicker
                format={format}
                onChange={handelGeneralTime}
                value={[
                  dayjs(generalTime.startTime || "00:00", format),
                  dayjs(generalTime.endTime || "00:00", format),
                ]}
                style={{ height: "100%", outline: "none" }}
              />
            </div>
          </div>
          <div
          //  style={{ overflow: "visible" }}
          >
            <DragAndDropImageDiv
              images={images}
              setImages={setImages}
              isEditMode={isEditMode}
              showMode={showMode}
            />
            {/* <div className={style.addNewStudioinputBox}>
              <label htmlFor="roomAmenities">Amenities </label>

              <Select
                id="roomAmenities"
                mode="multiple"
                placeholder="Select Amenites"
                value={selectedAmenities}
                onChange={setSelectedAmenities}
                // style={customStyles}
                options={filteredAmenities?.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div> */}
            <MultipleSelect
              selectedItems={selectedAmenities}
              setSelectedItems={setSelectedAmenities}
            />

            {details.length === 0 ? (
              <div
                className={style.addNewStudioinputBox2}
                style={{ position: "relative" }}
              >
                <label htmlFor="RoomDetails">Room Details</label>
                <textarea
                  type="text"
                  id="RoomDetails"
                  placeholder="Enter Room Details"
                  value={""} // Empty value
                  onChange={(e) => handleRoomDetailsChange(e, 0)}
                />
                {details.length > 1 && (
                  <span
                    className={style.cancelDetailsUpload}
                    onClick={() => handleCancelDetails(0)}
                  >
                    <img src={cross} alt="" />
                  </span>
                )}
              </div>
            ) : (
              details.map((detail, index) => (
                <>
                  <div
                    className={style.addNewStudioinputBox2}
                    key={index}
                    style={{ position: "relative" }}
                  >
                    <label htmlFor="RoomDetails">Room Details</label>
                    <textarea
                      type="text"
                      id="RoomDetails"
                      placeholder="Enter Room Details"
                      value={detail}
                      onChange={(e) => handleRoomDetailsChange(e, index)}
                    />

                    {details.length > 1 && (
                      <span
                        className={style.cancelDetailsUpload}
                        onClick={() => handleCancelDetails(index)}
                      >
                        <img src={cross} alt="" />
                      </span>
                    )}
                  </div>
                </>
              ))
            )}
            {details.length < 3 && (
              <span
                className={style.addTeamDetailbtn}
                onClick={handleAddDetails}
              >
                <MdOutlineAddBox /> &nbsp;<div>Add Room Details</div>
              </span>
            )}

            <label className={style.defaultLabel}>
              Booking start & End Time
            </label>
            {bookingTimes.map((bt, index) => (
              <>
                <div
                  key={index}
                  className={style.addNewStudioinputBox}
                  style={{
                    position: "relative",
                    maxHeight: "6vh",
                    minHeight: "6vh",
                  }}
                >
                  <TimePicker.RangePicker
                    format={format}
                    onChange={(time, timeString) =>
                      handelbookingTime(time, timeString, index)
                    }
                    value={
                      bt.startTime === ""
                        ? [dayjs("00:00", "HH:mm"), dayjs("00:00", "HH:mm")]
                        : [
                            dayjs(bt.startTime || "00:00", "HH:mm"),
                            dayjs(bt.endTime || "00:00", "HH:mm"),
                          ]
                    }
                    style={{
                      height: "100%",
                      outline: "none",
                      justifySelf: "flex-end",
                    }}
                  />
                  {bookingTimes.length > 1 && (
                    <span
                      className={style.cancelImageUpload}
                      onClick={() => handleCancelBooking(index)}
                    >
                      <img src={cross} alt="" />
                    </span>
                  )}
                </div>
              </>
            ))}
            <span
              className={style.addTeamDetailbtn}
              onClick={handleAddBookingTime}
            >
              <MdOutlineAddBox /> &nbsp;<div>Add Booking Time </div>
            </span>
          </div>
        </div>
      </form>
      <StudioFooter
        backOnclick={() => {
          if (showMode) {
            setshowRoomsDetails(false);
          } else {
            confirmAlret("Room data will be lost ", "").then((result) => {
              if (result.isConfirmed) {
                console.log("default data is =====>", defaultData);
                console.log("room data is =====>", rooms);
                setshowRoomsDetails(false);
                setrooms((prevRooms) => {
                  const newRooms = [...prevRooms];
                  newRooms[indexofrooms] = defaultData; // Reset to defaultData
                  return newRooms;
                });
              }
            });
          }
          // handleDataUpdate();
          // errorAlert("hii");
        }}
        saveOnclick={() => {
          handleDataUpdate();
        }}
        backType={"reset"}
        saveDisabled={showMode}
      />
    </>
  );
}

export default AddNewRoom;
