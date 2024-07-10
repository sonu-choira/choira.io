import React, { useEffect, useRef, useState } from "react";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";
import cross from "../../assets/cross.svg";
import { useFormik } from "formik";

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
import CustomInput from "../../pages/admin/layout/CustomInput";

function AddNewRoom({
  setshowRoomsDetails,
  isEditMode,
  setrooms,
  rooms,
  indexofrooms,
  setIndexofrooms,
  showMode,
}) {
  const currentRoomsData = rooms[indexofrooms] || "";
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: currentRoomsData,
    onSubmit: (values) => {
      console.log(values);

      // Handle form submission here
    },
  });
  useEffect(() => {
    console.log("rome value chnage ", values);
    // setrooms((prev=>[...prev, values[indexofrooms]]));
  }, [values]);

  const format = "HH:mm";
  const customStyles = {
    height: "90%",
    overFlow: "scroll",
  };
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    values?.bookingDays?.map((item) => item?.name || item) || []
  );
  const [time, setTime] = useState([]);
  const [generalTime, setGeneralTime] = useState({
    startTime: values?.generalTime?.startTime || "00:00",
    endTime: values?.generalTime?.endTime || "00:00",
  });
  const handleAddDetails = () => {
    setDetails((prevDetails) => [...prevDetails, ""]); // Add an empty string to the details array
  };

  const [bookingTimes, setBookingTimes] = useState(
    values?.availabilities
      ? [...values.availabilities]
      : [{ startTime: "00:00", endTime: "00:00" }]
  );

  // let genreralStartTime;
  // let genreralEndTime;

  const [details, setDetails] = useState(
    values.details ? values.details : [[]]
  );

  const inputRef = useRef(null);
  const [images, setImages] = useState(values ? values.roomPhotos : []);

  useEffect(() => {
    let dis = values.discountPercentage;
    let price = values.basePrice;

    let cal = (price, dis) => {
      let discountedAmount = (price * dis) / 100;
      let calculatedBasePrice = price - discountedAmount; // Renamed to avoid conflict
      return calculatedBasePrice;
    };
    values.pricePerHour = cal(price, dis);

    // Update basePrice in state or do something with it here
  }, [values.basePrice, values.discountPercentage]);

  useEffect(() => {
    // setrooms((prevRooms) => {
    //   return prevRooms.map((room, idx) => {
    //     if (idx === indexofrooms) {
    //       return {
    //         ...room, // Copy the previous room data
    //         roomPhotos: images, // Update roomPhotos with the new images
    //       };
    //     } else {
    //       return room;
    //     }
    //   });
    // });
    setFieldValue("roomPhotos", images);
  }, [images, setFieldValue]);

  useEffect(() => {
    // setrooms((prevRooms) => {
    //   return prevRooms.map((room, idx) => {
    //     if (idx === indexofrooms) {
    //       return {
    //         ...room, // Copy the previous room data
    //         roomId: indexofrooms + 1,
    //       };
    //     } else {
    //       return room;
    //     }
    //   });
    // });
    setFieldValue("roomId", indexofrooms + 1);
  }, []);

  useEffect(() => {
    console.log("images", images);
  }, [images, setFieldValue]);
  useEffect(() => {
    // setrooms((prerooms) => {
    //   prerooms.map((rm, idex) => {
    //     if (idex === indexofrooms) {
    //       rm.amenities = selectedAmenities;
    //     }
    //   });
    //   return prerooms;
    // });
    setFieldValue("amenities", selectedAmenities);
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
    // setrooms((prerooms) => {
    //   return prerooms.map((rm, idex) => {
    //     if (idex === indexofrooms) {
    //       return { ...rm, availabilities: bookingTimes };
    //     }
    //     return rm;
    //   });
    // });
    setFieldValue("availabilities", bookingTimes);
  }, [bookingTimes, setFieldValue]);

  useEffect(() => {
    setFieldValue("generalTime", generalTime);
  }, [generalTime, setFieldValue]);

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
    setSelectedAmenities(values?.amenities?.map((item) => item) || []);
  }, [values?.amenities]);

  // useEffect(() => {
  //   setSelectedDate(
  //     currentRoomsData?.bookingDays?.map((item) => item?.name || item) || []
  //   );
  // }, [currentRoomsData?.bookingDays]);

  useEffect(() => {
    console.log("selectedDate updated:", selectedDate);
    values.bookingDays = selectedDate;
  }, [selectedDate.length]);

  useEffect(() => {
    console.log("room k details mila", rooms);
  }, [rooms]);

  const handleRoomNameChange = (event) => {
    const { value } = event.target;
    setFieldValue("roomName", value);
    // setrooms((prevRooms) => {
    //   const updatedRooms = [...prevRooms];
    //   updatedRooms[indexofrooms] = {
    //     ...currentRoomsData,
    //     roomName: value,
    //   };
    //   return updatedRooms;
    // });
  };

  const handleRoomAreaChange = (event) => {
    const { value } = event.target;
    // setrooms((prevRooms) => {
    //   const updatedRooms = [...prevRooms];
    //   updatedRooms[indexofrooms] = {
    //     ...currentRoomsData,
    //     area: value,
    //   };
    //   return updatedRooms;
    // });
    setFieldValue("area", value);
  };
  const handleBasePriceChange = (event) => {
    const { value } = event.target;
    // setrooms((prevRooms) => {
    //   const updatedRooms = [...prevRooms];
    //   updatedRooms[indexofrooms] = {
    //     ...updatedRooms[indexofrooms],
    //     basePrice: parseFloat(value),
    //   };
    //   console.log(
    //     "updatedRooms--------------------------------------",
    //     updatedRooms
    //   );
    //   return updatedRooms;
    // });
    setFieldValue("basePrice", parseFloat(value));
  };

  const handleDiscountChange = (event) => {
    const { value } = event.target;
    // setrooms((prevRooms) => {
    //   const updatedRooms = [...prevRooms];
    //   updatedRooms[indexofrooms] = {
    //     ...currentRoomsData,
    //     discountPercentage: parseFloat(value),
    //   };
    //   return updatedRooms;
    // });
    setFieldValue("discountPercentage", parseFloat(value));
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
    // currentRoomsData.details = details;
    setFieldValue("details", details);
  }, [details]);

  const handleCancelDetails = (index) => {
    let teampDetail = [...details];
    teampDetail.splice(index, 1);
    setDetails(teampDetail);
  };

  return (
    <>
      <div className={style.addNewStudioTitle}>Add new room</div>
      <form className={style.addNewRoomPage} onSubmit={handleSubmit}>
        <div
          style={{ position: showMode ? "relative" : "", overflow: "hidden" }}
        >
          {showMode ? <p className={style.showmode}></p> : ""}

          <div>
            <CustomInput
              label="Room Name"
              htmlFor="RoomName"
              type="text"
              id="RoomName"
              placeholder="Enter Room Name"
              value={values?.roomName}
              onChange={handleRoomNameChange}
              onBlur={handleBlur}
            />

            <CustomInput
              label="Room Area"
              htmlFor="RoomArea"
              type="number"
              id="RoomArea"
              placeholder="Enter Approx. Area"
              value={values?.area}
              onChange={handleRoomAreaChange}
            />

            <CustomInput
              label="Base Price"
              htmlFor="price"
              type="number"
              id="price"
              placeholder="Enter Price Per Hour"
              value={values?.basePrice}
              onChange={handleBasePriceChange}
            />

            <CustomInput
              label="Discount"
              htmlFor="Discount"
              type="number"
              id="Discount"
              placeholder="Enter Discount"
              value={values?.discountPercentage}
              min={0}
              max={100}
              onChange={handleDiscountChange}
            />

            <CustomInput
              label="Price Per Hour"
              htmlFor="pricePerHour"
              type="number"
              id="pricePerHour"
              placeholder="Enter Price Per Hour"
              value={values?.pricePerHour}
              readOnly
              disabled
            />

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Dates">Booking Days</label>
              <Select
                id="Dates"
                mode="multiple"
                placeholder="Select Booking Dates"
                value={selectedDate}
                onChange={setSelectedDate}
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

          <div>
            <DragAndDropImageDiv
              images={images}
              setImages={setImages}
              isEditMode={isEditMode}
            />

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
                  value={""}
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
              ))
            )}
            {details.length < 3 && (
              <span
                className={style.addTeamDetailbtn}
                onClick={handleAddDetails}
              >
                <MdOutlineAddBox /> &nbsp;<div>Add Booking Time</div>
              </span>
            )}

            <label className={style.defaultLabel}>
              Booking start & End Time
            </label>
            {bookingTimes.map((bt, index) => (
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
            ))}
            <span
              className={style.addTeamDetailbtn}
              onClick={handleAddBookingTime}
            >
              <MdOutlineAddBox /> &nbsp;<div>Add Booking Time</div>
            </span>
          </div>
        </div>
      </form>

      <StudioFooter
        backOnclick={() => {
          setshowRoomsDetails(false);
        }}
        saveOnclick={() => {
          setshowRoomsDetails(false);
        }}
      />
    </>
  );
}

export default AddNewRoom;
