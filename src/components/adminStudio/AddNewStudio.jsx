import React, { useEffect, useRef, useState } from "react";
import {
  MdAddAPhoto,
  MdCancel,
  MdOutlineAddBox,
  MdOutlineSettings,
} from "react-icons/md";
import style from "../../pages/admin/studios/studio.module.css";

import upload from "../../assets/upload.svg";
import cross from "../../assets/cross.svg";
import StudioFooter from "./StudioFooter";
import WebDashboard2 from "../../pages/produce/WebDashBoard2";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaRegBell } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { FaPencilAlt } from "react-icons/fa";
import DragAndDropImageDiv from "../../pages/admin/layout/DragAndDropImageDiv";
import AddMultipleTeam from "../../pages/admin/layout/AddMultipleTeam";
import AddNewServices2 from "./appsAndMore/AddNewServices2";
import AddmultipleServises from "../../pages/admin/layout/AddmultipleServises";
import AddMultipleRooms from "../../pages/admin/layout/AddMultipleRooms";
import AddNewRoom from "./AddNewRoom";
import Button from "../../pages/admin/layout/Button";
import appAndmoreApi from "../../services/appAndmoreApi";
import Swal from "sweetalert2";
import MultipleSelect from "../../pages/admin/layout/MultipleSelect";
import { errorAlert } from "../../pages/admin/layout/Alert";
import { useFormik } from "formik";
import CustomInput from "../../pages/admin/layout/CustomInput";
import { set } from "react-ga";

function AddNewStudio({ setSelectTab }) {
  const submitButtonRef = useRef(null);
  const [images, setImages] = useState([]);

  const [isOver, setIsOver] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsEditMode(data.state?.isEditMode);
  }, []);
  const customStyles = {
    height: "90%",
  };
  const navigate = useNavigate();
  const gotoadminpage = () => {
    navigate("/adminDashboard/Apps&More/studio");
  };

  const data = useLocation();
  // console.log("the data id  ================== >", data?.state?.productData);

  const userStudioid = data?.state?.productData?._id;
  // alert(data.state.navCount);
  const showMode = data?.state?.showMode || false;
  // const [showMode, setshowMode] = useState(data?.state?.showMode || false);

  const navCount = data?.state?.navCount;
  const [tabCount, setTabCount] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [teamDetails, setTeamsDetails] = useState([
    { id: 1, photo: null, name: "", designation: "" },
  ]);
  const [selectedStudioAmenities, setSelectedStudioAmenities] = useState([]);

  const [rooms, setrooms] = useState([
    {
      roomId: 1,
      roomName: "",
      area: "",
      pricePerHour: "",
      discountPercentage: "",
      bookingDays: [],
      generalTime: {
        startTime: "",
        endTime: "",
      },
      // generalStartTime: "",
      // generalEndTime: "",
      availabilities: [],
      bookingStartTime: [],
      bookingEndTime: [],
      roomPhotos: [],
      basePrice: 0,

      amenities: [],
      details: [],
    },
  ]);
  const [showRoomsDetails, setshowRoomsDetails] = useState(false);
  const [indexofrooms, setIndexofrooms] = useState();
  useEffect(() => {
    console.log("teamDetails", teamDetails);
  }, [teamDetails]);

  const [studioDetails, setStudioDetails] = useState({
    aboutUs: {},
    address: "",
    amenities: [],
    area: 0,
    availabilities: [],
    city: "",
    country: "",
    clientPhotos: [],
    creationTimeStamp: "",
    featuredReviews: "",
    fullName: "",
    isActive: "",
    latitude: "",
    location: { coordinates: [], type: "" },
    longitude: "",
    mapLink: "",
    maxGuests: "",
    overallAvgRating: "",
    pincode: "",
    pricePerHour: 0,
    reviews: {},
    roomsDetails: [],
    state: "",
    studioPhotos: [],
    teamDetails: [],
    totalRooms: 0,
    _id: "",
  });

  let initialStudioData = {
    aboutUs: {},
    address: "",
    amenities: [],
    area: 0,
    availabilities: [],
    city: "",
    country: "",
    clientPhotos: [],
    creationTimeStamp: "",
    featuredReviews: "",
    fullName: "",
    isActive: "",
    latitude: "",
    location: { coordinates: [], type: "" },
    longitude: "",
    mapLink: "",
    maxGuests: "",
    overallAvgRating: "",
    pincode: "",
    pricePerHour: 0,
    reviews: {},
    roomsDetails: [],
    state: "",
    studioPhotos: [],
    teamDetails: [],
    totalRooms: 0,
    _id: "",
  };

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
    initialValues: data?.state?.productData
      ? data?.state?.productData
      : initialStudioData,
    onSubmit: (values) => {
      console.log(values);

      // Handle form submission here
    },
  });

  useEffect(() => {
    // setStudioDetails((prevData) => ({
    //   ...prevData,
    //   totalRooms: rooms.length,
    // }));
    setFieldValue("totalRooms", rooms.length);
    // console.log(rooms.length);
  }, [rooms.length, setFieldValue]);

  // useEffect(() => {
  //   console.log("studioDetails change huaa hai ", studioDetails);
  // }, [studioDetails]);

  useEffect(() => {
    // setStudioDetails((prevData) => ({
    //   ...prevData, // Copy previous data
    //   studioPhotos: images, // Update only the studioPhotos property
    // }));
    setFieldValue("studioPhotos", images);
  }, [images, setFieldValue]);

  useEffect(() => {
    // setStudioDetails((prevdata) => {
    //   prevdata.teamDetails = teamDetails;
    //   return prevdata;
    // });
    setFieldValue("teamDetails", teamDetails);
  }, [teamDetails.length, setFieldValue]);

  // useEffect(() => {
  //   setStudioDetails((prevdata) => {
  //     prevdata.roomsDetails = rooms;
  //     return prevdata;
  //   });
  // }, [rooms?.length]);

  useEffect(() => {
    // setStudioDetails((prevdata) => {
    //   return {
    //     ...prevdata,
    //     roomsDetails: rooms,
    //   };
    // });
    setFieldValue("roomsDetails", rooms);
  }, [rooms, setFieldValue]);

  useEffect(() => {
    // setStudioDetails((prevdata) => {
    //   prevdata.amenities = selectedStudioAmenities.map((name, index) => ({
    //     id: index,
    //     name,
    //   }));
    //   return prevdata;
    // });
    setFieldValue(
      "amenities",
      selectedStudioAmenities.map((name, index) => ({
        id: index,
        name,
      }))
    );
  }, [selectedStudioAmenities.length, setFieldValue]);

  // useEffect(() => {
  //   console.log("saveAddData change huaa hai ", saveAddData);
  //   // setsaveAddData((prev)=>{
  //   //   return {...prev,studioDetails}
  //   // })
  // }, [saveAddData]);

  useEffect(() => {
    if (data?.state?.productData) {
      setStudioDetails(data?.state?.productData);
      setrooms(data?.state?.productData.roomsDetails);
    }
  }, [data?.state?.productData]);
  useEffect(() => {
    console.log("room updated ", rooms);
  }, [rooms]);
  useEffect(() => {
    if (values?.studioPhotos?.length) setImages(values.studioPhotos);
  }, [values?.studioPhotos?.length]);

  const studioamenitiesList = [
    "Wifi",
    "AC",
    "DJ",
    "Piano",
    "Drum",
    "Car Parking",
    "Banjo",
  ];
  const filteredAmenities = studioamenitiesList.filter(
    (o) => !selectedStudioAmenities.includes(o)
  );

  useEffect(() => {
    setSelectedStudioAmenities(
      values?.amenities?.map((item) => item?.name || item) || []
    );
  }, [values?.amenities]);

  const handleSubmitButtonClick = () => {
    let hasError = false;

    values.studioPhotos.forEach((element, index) => {
      if (typeof element === "object") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please upload STUDIO images first!",
          showConfirmButton: false,
          timer: 1800,
        });
        hasError = true;
      }
    });

    values.roomsDetails.forEach((room, roomIndex) => {
      room.roomPhotos.forEach((element, photoIndex) => {
        if (typeof element === "object") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Please upload images for room  ${room.roomName.toUpperCase()} first!`,
            showConfirmButton: false,
            timer: 2000,
          });
          hasError = true;
        }
      });
    });

    const correctDataTypes = (data) => {
      return {
        ...data,
        area: parseInt(data.area, 10),
        maxGuests: data.maxGuests === "" ? null : data.maxGuests,
        featuredReviews: Array.isArray(data.featuredReviews)
          ? data.featuredReviews
          : [],
        amenities: data.amenities.map((amenity) => ({
          ...amenity,
          id: amenity.id.toString(),
        })),
        roomsDetails: data.roomsDetails.map((room) => ({
          ...room,
          area: room.area.toString(),
          pricePerHour: parseInt(room.pricePerHour, 10),
          basePrice: parseInt(room.basePrice, 10),

          discountPercentage: parseInt(room.discountPercentage, 10),
        })),
      };
    };

    if (!hasError) {
      const updatedStudioDetails = {
        ...values,
        roomsDetails: values.roomsDetails.map((room) => {
          const isArrayOfStrings =
            Array.isArray(room.bookingDays) &&
            room.bookingDays.every((day) => typeof day === "string");
          return {
            ...room,
            bookingDays: isArrayOfStrings
              ? room.bookingDays.map((day, index) => ({
                  id: index,
                  name: day,
                }))
              : room.bookingDays,
          };
        }),
      };

      if (isEditMode) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Update it!",
        }).then((result) => {
          if (result.isConfirmed) {
            const correctedRealData = correctDataTypes(updatedStudioDetails);
            if (
              correctedRealData.maxGuests === "" ||
              correctedRealData.maxGuests === null
            ) {
              errorAlert("Please enter max guests");
              console.log(
                "correctedRealData.maxGuests",
                correctedRealData.maxGuests
              );
              return;
            }

            console.log("studioDetails", correctedRealData);
            appAndmoreApi
              .updateStudio(userStudioid, correctedRealData)
              .then((response) => {
                console.log("Studio updated:", response);
                if (response) {
                  Swal.fire({
                    title: "Studio Updated!",
                    text: "Your data has been saved.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1800,
                  });
                }
              })
              .catch((error) => {
                console.error("Error updating studio:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  showConfirmButton: false,
                  timer: 1800,
                });
              });
            console.log("studioDetails", correctedRealData);
          }
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Create it!",
        }).then((result) => {
          if (result.isConfirmed) {
            alert("Studio created");
            const correctedRealData = correctDataTypes(updatedStudioDetails);
            if (
              correctedRealData.maxGuests === "" ||
              correctedRealData.maxGuests === null
            ) {
              errorAlert("Please enter max guests");
              console.log(
                "correctedRealData.maxGuests",
                correctedRealData.maxGuests
              );
              return;
            }

            appAndmoreApi
              .createStudio(correctedRealData)
              .then((response) => {
                console.log("Studio created:", response);
                if (response) {
                  Swal.fire({
                    title: "Studio Created!",
                    text: "Your data has been saved.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1800,
                  });
                }
              })
              .catch((error) => {
                console.error("Error creating studio:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  showConfirmButton: false,
                  timer: 1800,
                });
              });
            console.log("correctedRealData", correctedRealData);
          }
        });
      }
    }
  };
  useEffect(() => {
    console.log("studioDetails==============---------====>", values);
  }, [values]);

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
              <input required type="text" placeholder="search" />
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

          {showRoomsDetails ? (
            <AddNewRoom
              setshowRoomsDetails={setshowRoomsDetails}
              isEditMode={isEditMode}
              rooms={rooms}
              setrooms={setrooms}
              setIndexofrooms={setIndexofrooms}
              indexofrooms={indexofrooms}
              showMode={showMode}
            />
          ) : (
            <>
              <div
                className={style.addNewStudioTitle}
                style={{ marginTop: "-2%" }}
              >
                {isEditMode && showMode
                  ? "Studio details"
                  : isEditMode
                  ? "Edit Studio"
                  : "Add new studio"}
              </div>
              <form className={style.addNewStudioPage} onSubmit={handleSubmit}>
                <div
                  style={{
                    position: showMode ? "relative" : "",
                    overflow: "hidden",
                  }}
                >
                  {showMode ? <p className={style.showmode}></p> : ""}

                  <div>
                    <CustomInput
                      label="Studio Name"
                      htmlFor="studioName"
                      type="text"
                      id="studioName"
                      placeholder="Enter Studio Area"
                      name="fullName"
                      value={values.fullName}
                      // onChange={(e) =>
                      //   setStudioDetails({
                      //     ...studioDetails,
                      //     fullName: e.target.value,
                      //   })
                      // }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <CustomInput
                      label="Total Area"
                      htmlFor="area"
                      type="number"
                      id="area"
                      placeholder="Enter Approx. Area"
                      name="area"
                      value={values?.area}
                      // onChange={(e) =>
                      //   setStudioDetails({
                      //     ...studioDetails,
                      //     area: e.target.value,
                      //   })
                      // }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <CustomInput
                      label="Studio Pincode"
                      htmlFor="pincode"
                      type="number"
                      id="pincode"
                      placeholder="Enter Pincode"
                      name="pincode"
                      value={values?.pincode}
                      // onChange={(e) =>
                      //   setStudioDetails({
                      //     ...studioDetails,
                      //     pincode: e.target.value,
                      //   })
                      // }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <CustomInput
                      label="Studio City"
                      htmlFor="addcity"
                      type="text"
                      list="city"
                      id="addcity"
                      placeholder="Select city Name"
                      name="city"
                      value={values?.city}
                      // onChange={(e) =>
                      //   setStudioDetails({
                      //     ...studioDetails,
                      //     city: e.target.value,
                      //   })
                      // }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <datalist id="city">
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bombay">Bombay</option>
                    </datalist>

                    <MultipleSelect
                      selectedItems={selectedStudioAmenities}
                      setSelectedItems={setSelectedStudioAmenities}
                    />

                    <CustomInput
                      label="Studio MapLink"
                      htmlFor="mapLink"
                      type="text"
                      id="mapLink"
                      placeholder="Enter Studio MapLink"
                      name="mapLink"
                      value={values?.mapLink}
                      // onChange={(e) =>
                      //   setStudioDetails({
                      //     ...studioDetails,
                      //     mapLink: e.target.value,
                      //   })
                      // }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <DragAndDropImageDiv
                      images={images}
                      setImages={setImages}
                      isEditMode={isEditMode}
                    />

                    <div
                      className={style.addNewStudioinputBox}
                      style={{ paddingTop: "2%" }}
                    >
                      <label htmlFor="guest">Max Guests</label>
                      <select
                        required
                        id="guest"
                        name="maxGuests"
                        value={values?.maxGuests}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onChange={(e) =>
                        //   setStudioDetails({
                        //     ...studioDetails,
                        //     maxGuests: e.target.value,
                        //   })
                        // }
                      >
                        <option value={""}>Select Maximum Guest allowed</option>
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                        <option value={"6"}>6</option>
                        <option value={"7"}>7</option>
                        <option value={"8"}>8</option>
                        <option value={"9"}>9</option>
                        <option value={"10"}>10</option>
                      </select>
                    </div>

                    <CustomInput
                      label="Select State"
                      htmlFor="state"
                      type="text"
                      list="state"
                      id="state"
                      placeholder="Select state Name"
                      name="state"
                      value={values?.state}
                      // onChange={(e) =>
                      //   setStudioDetails({
                      //     ...studioDetails,
                      //     state: e.target.value,
                      //   })
                      // }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <datalist id="state">
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bombay">Bombay</option>
                    </datalist>

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="country">Select Country</label>
                      <select
                        id="country"
                        value={values?.country}
                        // onChange={(e) =>
                        //   setStudioDetails({
                        //     ...studioDetails,
                        //     country: e.target.value,
                        //   })
                        // }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled>
                          Select Country
                        </option>
                        <option value="IN">India</option>
                        <option value="US">USA</option>
                        <option value="JP">Japan</option>
                      </select>
                    </div>

                    <CustomInput
                      label="Studio Address"
                      htmlFor="address"
                      type="text"
                      id="address"
                      placeholder="Enter Studio Area"
                      name="address"
                      value={values?.address}
                      // onChange={(e) =>
                      //   setStudioDetails({
                      //     ...studioDetails,
                      //     address: e.target.value,
                      //   })
                      // }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div
                  style={{
                    position: showMode ? "relative" : "",
                    overflow: "hidden",
                  }}
                >
                  {showMode ? <p className={style.showmode}></p> : ""}

                  <div>
                    <div className={style.addNewStudioinputBox2}>
                      <label htmlFor="aboutStudio">About Studio</label>
                      <textarea
                        type="text"
                        id="aboutStudio"
                        placeholder="Enter Studio Details"
                        name="aboutUs"
                        value={values?.aboutUs?.aboutUs}
                        // onChange={(e) =>
                        //   setStudioDetails({
                        //     ...studioDetails,
                        //     aboutUs: {
                        //       ...studioDetails?.aboutUs,
                        //       aboutUs: e.target.value,
                        //     },
                        //   })
                        // }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className={style.roomAndClassSection}>
                      <div>
                        <AddMultipleRooms
                          rooms={rooms}
                          setrooms={setrooms}
                          setshowRoomsDetails={setshowRoomsDetails}
                          showRoomsDetails={showRoomsDetails}
                          indexofrooms={indexofrooms}
                          isEditMode={isEditMode}
                          setIndexofrooms={setIndexofrooms}
                          showMode={showMode}
                        />
                      </div>
                      <div>
                        <AddMultipleTeam
                          teamDetails={teamDetails}
                          setTeamsDetails={setTeamsDetails}
                          data={data}
                          isEditMode={isEditMode}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button style={{ display: "none" }} ref={submitButtonRef}>
                  submit
                </button>
              </form>
              <StudioFooter
                setSelectTab={setSelectTab}
                backOnclick={gotoadminpage}
                saveType={"submit"}
                saveOnclick={showMode ? "" : handleSubmitButtonClick}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNewStudio;
