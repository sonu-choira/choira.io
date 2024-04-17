// import React, { useEffect, useRef, useState } from "react";
// import { MdAddAPhoto } from "react-icons/md";
// import { IoMdAddCircle } from "react-icons/io";
// import upload from "../../assets/img/upload.png";
// import style from "../../pages/admin/studios/studio.module.css";

// import {
//   FaCheckDouble,
//   FaFilter,
//   FaRegBell,
//   FaRegClock,
//   FaShare,
// } from "react-icons/fa6";

// import StudioFooter from "./StudioFooter";
// import { Button, Divider, Input, Select, Space } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import DragAndDropImageDiv from "../../pages/admin/layout/DragAndDropImageDiv";
// import { TimePicker } from "antd";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// function AddNewRoom({
//   setshowRoomsDetails,
//   isEditMode,
//   setrooms,
//   rooms,
//   indexofrooms,
//   setIndexofrooms,
//   showMode,
// }) {
//   const currentRoomsData = rooms[indexofrooms] || "";

//   const customStyles = {
//     height: "90%",
//     overFlow: "scroll",
//   };
//   const [selectedAmenities, setSelectedAmenities] = useState([]);
//   const [selectedDate, setSelectedDate] = useState([]);
//   const [time, setTime] = useState([]);
//   const [bookingtime, setBookingtime] = useState([]);

//   let genreralStartTime;
//   let genreralEndTime;
//   let bookingStartTime;
//   let bookingEndTime;
//   useEffect(() => {
//     if (currentRoomsData?.generalTime?.startTime?.length == 5) {
//       genreralStartTime = String(
//         `${currentRoomsData?.generalTime?.startTime}:00`
//       );
//       genreralEndTime = String(`${currentRoomsData?.generalTime?.endTime}:00`);

//       bookingStartTime = String(`${currentRoomsData?.generalStartTime}:00`);
//       bookingEndTime = String(`${currentRoomsData?.generalEndTime}:00`);
//     } else {
//       genreralStartTime = String(`${currentRoomsData?.generalTime?.startTime}`);
//       genreralEndTime = String(`${currentRoomsData?.generalTime?.endTime}`);

//       bookingStartTime = String(`${currentRoomsData?.generalStartTime}`);
//       bookingEndTime = String(`${currentRoomsData?.generalEndTime}`);
//     }

//     console.log("genreralStartTime", genreralStartTime);
//     console.log("genreralStartTime", typeof genreralStartTime);

//     console.log("genreralEndTime", genreralEndTime);
//   }, [currentRoomsData]);

//   useEffect(() => {
//     console.log("rooms ka details change huaa haiiiiiiiiiiiiiiii");
//   }, [rooms]);

//   useEffect(() => {
//     console.log("currentRoomsData------>/", currentRoomsData);
//     console.log(
//       "currentRoomsData?.generalTime?.startTime",
//       `${currentRoomsData?.generalTime?.startTime}:00`
//     );
//   }, []);

//   const inputRef = useRef(null);
//   const [images, setImages] = useState(
//     currentRoomsData ? currentRoomsData.roomPhotos : []
//   );

//   useEffect(() => {
//     setrooms((prevRooms) => {
//       return prevRooms.map((room, idx) => {
//         if (idx === indexofrooms) {
//           return {
//             ...room, // Copy the previous room data
//             roomPhotos: images, // Update roomPhotos with the new images
//           };
//         } else {
//           return room;
//         }
//       });
//     });
//   }, [images]);

//   useEffect(() => {
//     setrooms((prevRooms) => {
//       return prevRooms.map((room, idx) => {
//         if (idx === indexofrooms) {
//           return {
//             ...room, // Copy the previous room data
//             roomId: indexofrooms + 1,
//           };
//         } else {
//           return room;
//         }
//       });
//     });
//   }, []);

//   useEffect(() => {
//     console.log("images", images);
//   }, [images]);
//   useEffect(() => {
//     setrooms((prerooms) => {
//       prerooms.map((rm, idex) => {
//         if (idex === indexofrooms) {
//           rm.amenities = selectedAmenities;
//         }
//       });
//       return prerooms;
//     });
//   }, [selectedAmenities.length]);

//   useEffect(() => {
//     setrooms((prerooms) => {
//       prerooms.map((rm, idex) => {
//         if (idex === indexofrooms) {
//           console.log("selectedDate", selectedDate);
//           rm.bookingDays = selectedDate;
//         }
//       });
//       return prerooms;
//     });
//   }, [selectedDate.length]);

//   useEffect(() => {
//     console.log("====>>>>>>>", rooms);
//   }, [rooms]);

//   useEffect(() => {
//     setrooms((prerooms) => {
//       prerooms.map((rm, idex) => {
//         if (idex === indexofrooms) {
//           rm.bookingStartTime = time[0];
//           rm.bookingEndTime = time[1];
//         }
//       });
//       return prerooms;
//     });
//   }, [bookingtime.length]);

//   useEffect(() => {
//     setrooms((prerooms) => {
//       prerooms.map((rm, idex) => {
//         if (idex === indexofrooms) {
//           rm.generalStartTime = time[0];
//           rm.generalEndTime = time[1];
//         }
//       });
//       return prerooms;
//     });
//   }, [time.length]);

//   const handelGeneralTime = (time, timeString) => {
//     console.log(time, timeString);
//     console.log("time is ", time);
//     console.log("timeString is ", timeString);
//     setTime(timeString);
//   };
//   const handelbookingTime = (time, timeString) => {
//     console.log(time, timeString);
//     console.log("bookingt time is ", time);
//     console.log(" boolking timeString is ", timeString);
//     setBookingtime(timeString);
//   };

//   const abdefaultValue = ["18:30:56", "23:30:56"];

//   useEffect(() => {
//     console.log("timeRange", time);
//   }, [time]);
//   dayjs.extend(customParseFormat);

//   const days = [
//     // { id: "1", name: "Monday" },
//     // { id: "2", name: "Tuesday" },
//     // { id: "3", name: "wednesday" },
//     // { id: "4", name: "thursday" },
//     // { id: "5", name: "friday" },
//     // { id: "6", name: "Saturday" },
//     // { id: "7", name: "sunday" },
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const amenitiesList = [
//     "Wifi",
//     "AC",
//     "DJ",
//     "Piano",
//     "Drum",
//     "Car Parking",
//     "Banjo",
//   ];

//   // useEffect(() => {
//   //   if (isEditMode) {
//   //     setSelectedDate(
//   //       currentRoomsData?.bookingDays?.map((item) => item?.name || item) || []
//   //     );
//   //     console.log(
//   //       "currentRoomsData?.bookingDays?.map((item) => item?.name)",
//   //       currentRoomsData?.bookingDays?.map((item) => item?.name)
//   //     );
//   //   }
//   // }, [currentRoomsData?.bookingDays?.length]);

//   // useEffect(() => {
//   //   if (isEditMode) {
//   //     const bookingDays = currentRoomsData?.bookingDays;
//   //     console.log("currentRoomsData:", currentRoomsData);
//   //     if (bookingDays && bookingDays.length > 0) {
//   //       const selectedDateNames = bookingDays.map((item) => item?.name || item);
//   //       console.log("selectedDateNames:", selectedDateNames);
//   //       setSelectedDate(selectedDateNames);
//   //     } else {
//   //       setSelectedDate([]);
//   //     }
//   //   }
//   // }, [isEditMode]);

//   const filteredDates = days.filter((o) => !selectedDate.includes(o));

//   const filteredAmenities = amenitiesList.filter(
//     (o) => !selectedAmenities.includes(o)
//   );

//   useEffect(() => {
//     setSelectedAmenities(
//       currentRoomsData?.amenities?.map((item) => item) || []
//     );
//   }, [currentRoomsData?.amenities]);

//   useEffect(() => {
//     setSelectedDate(
//       currentRoomsData?.bookingDays?.map((item) => item?.name || item) || []
//     );
//   }, [currentRoomsData?.bookingDays]);

//   // const handleCheckboxChange = (id) => {
//   //   const updatedAmenities = selectedAmenities.includes(id)
//   //     ? selectedAmenities.filter((amenity) => amenity !== id)
//   //     : [...selectedAmenities, id];

//   //   setSelectedAmenities(updatedAmenities);
//   //   console.log(selectedAmenities);
//   // };

//   useEffect(() => {
//     console.log("selectedDate updated:", selectedDate);
//   }, [selectedDate]);

//   // const handledaysCheckboxChange = (id) => {
//   //   const updatedDays = selectedDate.includes(id)
//   //     ? selectedDate.filter((day) => day !== id)
//   //     : [...selectedDate, id];

//   //   setSelectedDate(updatedDays);
//   //   console.log(selectedDate);
//   // };

//   // const [temproomdetails, settemproomdetails] = useState( {
//   //   roomName: "",
//   //   area: "",
//   //   pricePerHour: "",
//   //   discountPercentage: "",
//   //   bookingDays: [],
//   //   generalStartTime: "",
//   //   generalEndTime: "",
//   //   bookingStartTime: [],
//   //   bookingEndTime: [],
//   //   roomPhotos: [],
//   //   amenities: [],
//   //   roomDetails: "",
//   // },)
//   useEffect(() => {
//     console.log("room k details mila", rooms);
//   }, [rooms]);

//   const handleRoomNameChange = (event) => {
//     const { value } = event.target;
//     setrooms((prevRooms) => {
//       const updatedRooms = [...prevRooms];
//       updatedRooms[indexofrooms] = {
//         ...currentRoomsData,
//         roomName: value,
//       };
//       return updatedRooms;
//     });
//   };

//   const handleRoomAreaChange = (event) => {
//     const { value } = event.target;
//     setrooms((prevRooms) => {
//       const updatedRooms = [...prevRooms];
//       updatedRooms[indexofrooms] = {
//         ...currentRoomsData,
//         area: value,
//       };
//       return updatedRooms;
//     });
//   };

//   const handlePricePerHourChange = (event) => {
//     const { value } = event.target;
//     setrooms((prevRooms) => {
//       const updatedRooms = [...prevRooms];
//       updatedRooms[indexofrooms] = {
//         ...updatedRooms[indexofrooms],
//         pricePerHour: parseFloat(value),
//         basePrice: parseFloat(value), // Update basePrice as well
//       };
//       return updatedRooms;
//     });
//   };

//   const handleDiscountChange = (event) => {
//     const { value } = event.target;
//     setrooms((prevRooms) => {
//       const updatedRooms = [...prevRooms];
//       updatedRooms[indexofrooms] = {
//         ...currentRoomsData,
//         discountPercentage: parseFloat(value),
//       };
//       return updatedRooms;
//     });
//   };

//   const handleRoomDetailsChange = (event) => {
//     const { value } = event.target;
//     setrooms((prevRooms) => {
//       const updatedRooms = [...prevRooms];
//       updatedRooms[indexofrooms] = {
//         ...currentRoomsData,
//         roomDetails: value,
//       };
//       return updatedRooms;
//     });
//   };

//   return (
//     <>
//       <div className={style.addNewStudioTitle}>Add new room</div>
//       <div className={style.addNewRoomPage}>
//         <div
//           style={{
//             position: showMode ? "relative" : "",
//             overflow: "hidden",
//           }}
//         >
//           {showMode ? <p className={style.showmode}></p> : ""}

//           <div>
//             <div className={style.addNewStudioinputBox}>
//               <label htmlFor="RoomName">Room Name</label>
//               <input
//                 type="text"
//                 id="RoomName"
//                 placeholder="Enter Room Name"
//                 value={currentRoomsData?.roomName}
//                 onChange={handleRoomNameChange}
//               />
//             </div>

//             <div className={style.addNewStudioinputBox}>
//               <label htmlFor="RoomArea">Room Area</label>
//               <input
//                 type="text"
//                 id="RoomArea"
//                 placeholder="Enter Approx. Area"
//                 value={currentRoomsData?.area}
//                 onChange={handleRoomAreaChange}
//               />
//             </div>
//             <div className={style.addNewStudioinputBox}>
//               <label htmlFor="price">Price Per Hour</label>
//               <input
//                 type="number"
//                 id="price"
//                 placeholder="Enter Price Per Hour"
//                 value={currentRoomsData?.pricePerHour}
//                 onChange={handlePricePerHourChange}
//               />
//             </div>
//             <div className={style.addNewStudioinputBox}>
//               <label htmlFor="Discount">Discount</label>
//               <input
//                 type="number"
//                 id="Discount"
//                 placeholder="Enter Discount"
//                 value={currentRoomsData?.discountPercentage}
//                 min={0}
//                 max={100}
//                 onChange={handleDiscountChange}
//               />
//             </div>
//             <div className={style.addNewStudioinputBox}>
//               <label htmlFor="Dates">Booking Days </label>
//               <Select
//                 id="Dates"
//                 mode="multiple"
//                 placeholder="Select Bookig Dates"
//                 value={selectedDate}
//                 onChange={setSelectedDate}
//                 // style={customStyles}
//                 options={filteredDates?.map((item) => ({
//                   value: item,
//                   label: item,
//                 }))}
//               />
//             </div>

//             <div className={style.addNewStudioinputBox}>
//               <label>General Start & End Time</label>
//               <TimePicker.RangePicker
//                 onChange={handelGeneralTime}
//                 // defaultValue={[
//                 //   dayjs("1:30:00", "HH:mm:ss"),
//                 //   dayjs("2:30:56", "HH:mm:ss"),
//                 // ]}
//                 // defaultValue={
//                 //   isEditMode
//                 //     ? [
//                 //         dayjs(`${genreralStartTime}`, "HH:mm:ss"),
//                 //         dayjs(`${genreralEndTime}`, "HH:mm:ss"),
//                 //       ]
//                 //     : []
//                 // }
//                 style={{ height: "100%", outline: "none" }}
//               />
//             </div>
//             {/* <div className={style.addNewStudioinputBox}>
//               <label>Booking Start Time</label>
//               <select>
//                 <option>Select Booking Start Time</option>
//                 <option>1</option>
//                 <option>2</option>
//                 <option>3</option>
//                 <option>4</option>
//                 <option>5</option>
//               </select>
//             </div> */}
//           </div>
//           <div>
//             <DragAndDropImageDiv
//               images={images}
//               setImages={setImages}
//               isEditMode={isEditMode}
//             />
//             <div className={style.addNewStudioinputBox}>
//               <label htmlFor="roomAmenities">Amenities </label>

//               <Select
//                 id="roomAmenities"
//                 mode="multiple"
//                 placeholder="Select Amenites"
//                 value={selectedAmenities}
//                 onChange={setSelectedAmenities}
//                 // style={customStyles}
//                 options={filteredAmenities?.map((item) => ({
//                   value: item,
//                   label: item,
//                 }))}
//               />
//             </div>

//             <div className={style.addNewStudioinputBox2}>
//               <label htmlFor="RoomDetails">Room Details</label>
//               <textarea
//                 type="text"
//                 id="RoomDetails"
//                 placeholder="Enter Room Details"
//                 value={currentRoomsData?.details?.map((item) => item) || []}
//                 onChange={handleRoomDetailsChange}
//               />
//             </div>
//             {/* <div className={style.addNewStudioinputBox}>
//               <label>General End Time</label>

//               <select>
//                 <option>Select General End Time</option>
//                 <option>1</option>
//                 <option>2</option>
//                 <option>3</option>
//                 <option>4</option>
//                 <option>5</option>
//               </select>
//             </div> */}
//             <div className={style.addNewStudioinputBox}>
//               <label>Booking start & End Time</label>

//               <TimePicker.RangePicker
//                 onChange={handelbookingTime}
//                 defaultValue={
//                   isEditMode
//                     ? [
//                         dayjs(bookingStartTime, "HH:mm:ss"),
//                         dayjs(bookingEndTime, "HH:mm:ss"),
//                       ]
//                     : // ? [
//                       //     dayjs(`${bookingStartTime}`, "HH:mm:ss"),
//                       //     dayjs(`${bookingEndTime}`, "HH:mm:ss"),
//                       //   ]
//                       []
//                 }
//                 style={{ height: "100%", outline: "none" }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <StudioFooter
//         backOnclick={() => {
//           setshowRoomsDetails(false);
//         }}
//       />
//     </>
//   );
// }

// export default AddNewRoom;
