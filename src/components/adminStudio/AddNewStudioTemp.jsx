// import React, { useEffect, useRef, useState } from "react";
// import {
//   MdAddAPhoto,
//   MdCancel,
//   MdOutlineAddBox,
//   MdOutlineSettings,
// } from "react-icons/md";
// import style from "../../pages/admin/studios/studio.module.css";

// import upload from "../../assets/upload.svg";
// import cross from "../../assets/cross.svg";
// import StudioFooter from "./StudioFooter";
// import WebDashboard2 from "../../pages/produce/WebDashBoard2";
// import { IoSearch } from "react-icons/io5";
// import { GoDotFill } from "react-icons/go";
// import { FaRegBell } from "react-icons/fa6";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Select } from "antd";
// import { FaPencilAlt } from "react-icons/fa";
// import DragAndDropImageDiv from "../../pages/admin/layout/DragAndDropImageDiv";
// import AddMultipleTeam from "../../pages/admin/layout/AddMultipleTeam";
// import AddNewServices2 from "./appsAndMore/AddNewServices2";
// import AddmultipleServises from "../../pages/admin/layout/AddmultipleServises";
// import AddMultipleRooms from "../../pages/admin/layout/AddMultipleRooms";
// import AddNewRoom from "./AddNewRoom";
// import Button from "../../pages/admin/layout/Button";

// function AddNewStudio({ setSelectTab }) {
//   const submitButtonRef = useRef(null);
//   const [images, setImages] = useState([]);
//   const [isOver, setIsOver] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     setIsEditMode(data.state?.isEditMode);
//   }, []);
//   const customStyles = {
//     height: "90%",
//   };
//   const navigate = useNavigate();
//   const gotoadminpage = () => {
//     navigate("/adminDashboard");
//   };

//   const data = useLocation();
//   console.log("the data id  ================== >", data?.state?.productData);
//   // alert(data.state.navCount);
//   const [showMode, setshowMode] = useState(data?.state?.showMode || false);

//   const navCount = data?.state?.navCount;
//   const [tabCount, setTabCount] = useState();
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [teamDetails, setTeamsDetails] = useState([
//     { photo: null, name: "", profile: "", designation: "" },
//   ]);
//   const [selectedStudioAmenities, setSelectedStudioAmenities] = useState([]);

//   const [rooms, setrooms] = useState([
//     {
//       roomName: "",
//       area: "",
//       pricePerHour: "",
//       discountPercentage: "",
//       bookingDays: [],
//       generalStartTime: "",
//       generalEndTime: "",
//       bookingStartTime: [],
//       bookingEndTime: [],
//       roomPhotos: [],
//       amenities: [],
//       roomDetails: "",
//     },
//   ]);
//   const [showRoomsDetails, setshowRoomsDetails] = useState(false);
//   const [indexofrooms, setIndexofrooms] = useState();
//   useEffect(() => {
//     console.log("teamDetails", teamDetails);
//   }, [teamDetails]);

//   const [studioDetails, setStudioDetails] = useState({
//     fullName: "",
//     area: "",
//     totalRooms: "",
//     pincode: "",
//     city: "",
//     amenities: [],
//     aboutUs: {
//       aboutUs: "",
//       services: "",
//       infrastructure: "",
//     },
//     // teamDetails: [{ photo: null, name: "", profile: "", designation: "" }],
//     studioPhotos: [],
//     maxGuests: "",
//     state: "",
//     mapLink: "",
//   });

//   const [saveAddData, setsaveAddData] = useState({
//     aboutUs: {},
//     address: "",
//     amenities: [],
//     area: "",
//     availabilities: [],
//     city: "",
//     clientPhotos: [],
//     creationTimeStamp: "",
//     featuredReviews: "",
//     fullName: "",
//     isActive: "",
//     latitude: "",
//     location: { coordinates: [], type: "" },
//     longitude: "",
//     mapLink: "",
//     maxGuests: "",
//     overallAvgRating: "",
//     pincode: "",
//     pricePerHour: "",
//     reviews: {},
//     roomsDetails: [],
//     state: "",
//     studioPhotos: [],
//     teamDetails: [],
//     totalRooms: "",
//     _id: "",
//   });

//   useEffect(() => {
//     console.log("studioDetails change huaa hai ", studioDetails);
//     setsaveAddData((prev) => {
//       return { ...prev, ...studioDetails };
//     });
//   }, [studioDetails]);

//   useEffect(() => {
//     setsaveAddData((prevdata) => {
//       prevdata.studioPhotos = images;
//       return prevdata;
//     });
//   }, [images]);

//   useEffect(() => {
//     setsaveAddData((prevdata) => {
//       prevdata.teamDetails = teamDetails;
//       return prevdata;
//     });
//   }, [teamDetails]);
//   useEffect(() => {
//     setsaveAddData((prevdata) => {
//       prevdata.roomsDetails = rooms;
//       return prevdata;
//     });
//   }, [rooms]);
//   useEffect(() => {
//     setsaveAddData((prevdata) => {
//       prevdata.amenities = selectedStudioAmenities;
//       return prevdata;
//     });
//   }, [selectedStudioAmenities]);

//   useEffect(() => {
//     console.log("saveAddData change huaa hai ", saveAddData);
//     // setsaveAddData((prev)=>{
//     //   return {...prev,studioDetails}
//     // })
//   }, [saveAddData]);

//   useEffect(() => {
//     if (data?.state?.productData) {
//       setStudioDetails(data?.state?.productData);
//       setrooms(data?.state?.productData.roomsDetails);
//     }
//   }, [data?.state?.productData]);
//   useEffect(() => {
//     console.log("room updated ", rooms);
//   }, [rooms]);
//   useEffect(() => {
//     if (studioDetails?.studioPhotos?.length)
//       setImages(studioDetails.studioPhotos);
//   }, [studioDetails?.studioPhotos?.length]);

//   const studioamenitiesList = [
//     "Wifi",
//     "AC",
//     "DJ",
//     "Piano",
//     "Drum",
//     "Car Parking",
//     "Banjo",
//   ];
//   const filteredAmenities = studioamenitiesList.filter(
//     (o) => !selectedStudioAmenities.includes(o)
//   );

//   useEffect(() => {
//     setSelectedStudioAmenities(
//       studioDetails?.amenities?.map((item) => item.name) || []
//     );
//   }, [studioDetails?.amenities]);

//   const handleSubmitButtonClick = () => {
//     // Programmatically trigger click event on the hidden submit button
//     if (submitButtonRef.current) {
//       submitButtonRef.current.click();
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     // Your submission logic goes here
//   };
//   return (
//     <>
//       <div className={style.wrapper}>
//         <WebDashboard2
//           navCount={navCount}
//           tabCount={tabCount}
//           setTabCount={setTabCount}
//         />
//         <div className={style.studioMainScreen}>
//           <div className={style.studioHeader}>
//             <div>
//               <input required type="text" placeholder="search" />
//             </div>
//             <div>
//               <IoSearch />
//             </div>
//             <div>
//               <div className={style.notifyIcon}>
//                 <GoDotFill />
//               </div>
//               <FaRegBell />
//             </div>
//             <div>
//               <MdOutlineSettings />
//             </div>
//           </div>

//           {showRoomsDetails ? (
//             <AddNewRoom
//               setshowRoomsDetails={setshowRoomsDetails}
//               isEditMode={isEditMode}
//               rooms={rooms}
//               setrooms={setrooms}
//               setIndexofrooms={setIndexofrooms}
//               indexofrooms={indexofrooms}
//             />
//           ) : (
//             <>
//               <div
//                 className={style.addNewStudioTitle}
//                 style={{ marginTop: "-2%" }}
//               >
//                 {isEditMode && showMode
//                   ? "Studio details"
//                   : isEditMode
//                   ? "Edit Studio"
//                   : "Add new studio"}
//               </div>
//               <form className={style.addNewStudioPage}>
//                 {/* {showMode ? ()} */}
//                 <div
//                   style={{
//                     position: showMode ? "relative" : "",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {showMode ? <p className={style.showmode}></p> : ""}

//                   <div>
//                     <div className={style.addNewStudioinputBox}>
//                       <label htmlFor="studioName">Studio Name</label>
//                       <input
//                         required
//                         type="text"
//                         id="studioName"
//                         placeholder="Enter Studio Area"
//                         name="studioName"
//                         value={studioDetails?.fullName}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             fullName: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <div className={style.addNewStudioinputBox}>
//                       <label htmlFor="area">Total Area</label>
//                       <input
//                         required
//                         type="text"
//                         id="area"
//                         placeholder="Enter Approx. Area"
//                         name="area"
//                         value={studioDetails?.area}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             area: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     {/* <div className={style.addNewStudioinputBox}>
//                   <label htmlFor="Rooms">Rooms</label>
//                   <select
//                     id="Rooms"
//                     name="totalRooms"
//                     onChange={handleChange}
//                     value={selectedOption}
//                   >
//                     <option value="0">Select No. of Services</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                     <option value="8">8</option>
//                     <option value="9">9</option>
//                     <option value="10">10</option>
//                   </select>
//                 </div> */}
//                     <div className={style.addNewStudioinputBox}>
//                       <label htmlFor="pincode">Studio Pincode</label>
//                       <input
//                         required
//                         type="text"
//                         id="pincode"
//                         name="pincode"
//                         placeholder="Enter Pincode"
//                         value={studioDetails?.pincode}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             pincode: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <div className={style.addNewStudioinputBox}>
//                       <label htmlFor="addcity">Studio city</label>
//                       <input
//                         required
//                         list="city"
//                         id="addcity"
//                         placeholder="Select city Name"
//                         name="addcity"
//                         value={studioDetails?.city}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             city: e.target.value,
//                           })
//                         }
//                       />
//                       <datalist id="city">
//                         <option value="Mumbai">Mumbai</option>
//                         <option value="Delhi">Delhi</option>
//                         <option value="Bombay">Bombay</option>
//                       </datalist>
//                     </div>
//                     <div className={style.addNewStudioinputBox}>
//                       <label htmlFor="Amenities">Amenities </label>

//                       <Select
//                         required
//                         id="Amenities"
//                         mode="multiple"
//                         className=""
//                         placeholder="Select one or more Amenities"
//                         value={selectedStudioAmenities}
//                         onChange={setSelectedStudioAmenities}
//                         // style={customStyles}
//                         options={filteredAmenities?.map((item) => ({
//                           value: item,
//                           label: item,
//                         }))}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <DragAndDropImageDiv
//                       images={images}
//                       setImages={setImages}
//                       isEditMode={isEditMode}
//                     />

//                     <div
//                       className={style.addNewStudioinputBox}
//                       style={{ paddingTop: "2%" }}
//                     >
//                       <label htmlFor="guest">Max Guests</label>

//                       <select
//                         required
//                         id="guest"
//                         value={studioDetails?.maxGuests}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             maxGuests: e.target.value,
//                           })
//                         }
//                       >
//                         <option>Select Maximum Guest allowed</option>
//                         <option>1</option>
//                         <option>2</option>
//                         <option>3</option>
//                         <option>4</option>
//                         <option>5</option>
//                       </select>
//                     </div>

//                     <div className={style.addNewStudioinputBox}>
//                       <label htmlFor="addstate">Select State</label>
//                       <input
//                         required
//                         list="state"
//                         id="addstate"
//                         placeholder="Select state Name"
//                         name="state"
//                         value={studioDetails?.state}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             state: e.target.value,
//                           })
//                         }
//                       />
//                       <datalist id="state">
//                         <option value="Mumbai">Mumbai</option>
//                         <option value="Delhi">Delhi</option>
//                         <option value="Bombay">Bombay</option>
//                       </datalist>
//                     </div>

//                     <div className={style.addNewStudioinputBox}>
//                       <label htmlFor="studioName">Studio MapLink</label>
//                       <input
//                         required
//                         type="text"
//                         id="studioName"
//                         placeholder="Enter Studio MapLink"
//                         name="studioName"
//                         value={studioDetails?.mapLink}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             mapLink: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ position: showMode ? "relative" : "" }}>
//                   {showMode ? <p className={style.showmode}></p> : ""}

//                   <div>
//                     <div className={style.addNewStudioinputBox2}>
//                       <label htmlFor="aboutStudio">About Studio</label>
//                       <textarea
//                         type="text"
//                         id="aboutStudio"
//                         placeholder="Enter Studio Details"
//                         value={studioDetails?.aboutUs?.aboutUs}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             aboutUs: {
//                               ...studioDetails?.aboutUs,
//                               aboutUs: e.target.value,
//                             },
//                           })
//                         }
//                       />
//                     </div>
//                     <div className={style.addNewStudioinputBox2}>
//                       <label htmlFor="studioService">Studio Services</label>
//                       <textarea
//                         type="text"
//                         id="studioService"
//                         placeholder="Enter Studio Services"
//                         value={studioDetails?.aboutUs?.services}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             aboutUs: {
//                               ...studioDetails?.aboutUs,
//                               services: e.target.value,
//                             },
//                           })
//                         }
//                       />
//                     </div>
//                     <div className={style.addNewStudioinputBox2}>
//                       <label htmlFor="area">Total Area</label>
//                       <textarea
//                         type="text"
//                         id="area"
//                         placeholder="Enter Approx. Area"
//                         value={studioDetails?.aboutUs?.infrastructure}
//                         onChange={(e) =>
//                           setStudioDetails({
//                             ...studioDetails,
//                             aboutUs: {
//                               ...studioDetails?.aboutUs,
//                               infrastructure: e.target.value,
//                             },
//                           })
//                         }
//                       />
//                     </div>

//                     <div className={style.roomAndClassSection}>
//                       <div>
//                         <AddMultipleRooms
//                           rooms={rooms}
//                           setrooms={setrooms}
//                           setshowRoomsDetails={setshowRoomsDetails}
//                           showRoomsDetails={showRoomsDetails}
//                           indexofrooms={indexofrooms}
//                           isEditMode={isEditMode}
//                           setIndexofrooms={setIndexofrooms}
//                         />
//                       </div>
//                       <div>
//                         <AddMultipleTeam
//                           teamDetails={teamDetails}
//                           setTeamsDetails={setTeamsDetails}
//                           data={data}
//                           isEditMode={isEditMode}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <button style={{ display: "none" }} ref={submitButtonRef}>
//                   submit
//                 </button>
//                 {/* <p className={style.showmode}></p> */}
//               </form>
//               <StudioFooter
//                 setSelectTab={setSelectTab}
//                 backOnclick={gotoadminpage}
//                 saveType={"submit"}
//                 saveOnclick={handleSubmitButtonClick}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddNewStudio;
