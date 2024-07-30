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
import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";

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
  console.log("the data id  ================== >", data?.state?.productData);

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
    aboutUs: {
      aboutUs: "",
      services: "",
      infrastructure: "",
    },
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

  const checkEmptyFields = (checkData) => {
    let hasError = false;
    const errorFields = [];

    const errorAlert = (message) => {
      // Placeholder for your error alert function
      console.error(message);
    };

    const isEmpty = (value) => {
      return (
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null &&
          Object.keys(value).length === 0)
      );
    };

    const check = (data) => {
      for (const key of Object.keys(data)) {
        const value = data[key];

        if (isEmpty(value)) {
          errorAlert(`${key} field is empty`);
          hasError = true; // Set hasError to true if an empty field is found
          errorFields.push(key); // Collect the field name with error
          return; // Exit on first empty field
        }

        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null
        ) {
          if (check(value)) hasError = true; // Recursively check nested objects
        }

        if (Array.isArray(value)) {
          for (const item of value) {
            if (typeof item === "object" && item !== null) {
              if (check(item)) hasError = true; // Recursively check items in arrays
            }
          }
        }
      }
      return hasError;
    };

    check(checkData);
    return { hasError, errorFields };
  };

  useEffect(() => {
    setStudioDetails((prevData) => ({
      ...prevData,
      totalRooms: rooms.length,
    }));
    // console.log(rooms.length);
  }, [rooms.length]);

  useEffect(() => {
    console.log("studioDetails change huaa hai ", studioDetails);
  }, [studioDetails]);

  useEffect(() => {
    setStudioDetails((prevData) => ({
      ...prevData, // Copy previous data
      studioPhotos: images, // Update only the studioPhotos property
    }));
  }, [images]);

  useEffect(() => {
    setStudioDetails((prevdata) => {
      prevdata.teamDetails = teamDetails;
      return prevdata;
    });
  }, [teamDetails.length]);

  // useEffect(() => {
  //   setStudioDetails((prevdata) => {
  //     prevdata.roomsDetails = rooms;
  //     return prevdata;
  //   });
  // }, [rooms?.length]);

  useEffect(() => {
    setStudioDetails((prevdata) => {
      return {
        ...prevdata,
        roomsDetails: rooms,
      };
    });
  }, [rooms]);

  useEffect(() => {
    setStudioDetails((prevdata) => {
      prevdata.amenities = selectedStudioAmenities.map((name, index) => ({
        id: index,
        name,
      }));
      return prevdata;
    });
  }, [selectedStudioAmenities.length]);

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
    if (studioDetails?.studioPhotos?.length)
      setImages(studioDetails.studioPhotos);
  }, [studioDetails?.studioPhotos?.length]);

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
      studioDetails?.amenities?.map((item) => item?.name || item) || []
    );
  }, [studioDetails?.amenities]);

  const handleSubmitButtonClick = () => {
    let hasError = false;

    studioDetails.studioPhotos.forEach((element, index) => {
      if (typeof element === "object") {
        errorAlert("Please upload STUDIO images first!");

        hasError = true;
      }
    });

    studioDetails.roomsDetails.forEach((room, roomIndex) => {
      room.roomPhotos.forEach((element, photoIndex) => {
        if (typeof element === "object") {
          errorAlert(
            `Please upload images for room  ${room.roomName.toUpperCase()} first!`
          );
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
          area: room?.area?.toString(),
          pricePerHour: parseInt(room.pricePerHour, 10),

          discountPercentage: parseInt(room.discountPercentage, 10),
        })),
      };
    };

    if (!hasError) {
      const updatedStudioDetails = {
        ...studioDetails,
        roomsDetails: studioDetails.roomsDetails.map((room) => {
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
        const correctedRealData = correctDataTypes(updatedStudioDetails);
        console.log("correctedRealData----->", correctedRealData);

        const checkData = { ...correctedRealData };
        delete checkData.availabilities;
        delete checkData.clientPhotos;
        delete checkData.creationTimeStamp;
        delete checkData.featuredReviews;
        delete checkData.isActive;
        delete checkData.latitude;
        delete checkData.location;
        delete checkData.longitude;
        delete checkData.overallAvgRating;
        delete checkData._id;
        delete checkData.pricePerHour;
        delete checkData.reviews;

        // for (const key of Object.keys(checkData)) {
        //   const value = checkData[key];
        //   alert("hii");

        //   if (
        //     value === null ||
        //     value === "" ||
        //     (Array.isArray(value) && value.length === 0) || //
        //     (typeof value === "object" &&
        //       !Array.isArray(value) &&
        //       value !== null &&
        //       Object.keys(value).length === 0)
        //   ) {
        //     return errorAlert(`${key} field is empty`);
        //   }
        // }

        const result = checkEmptyFields(checkData);
        let hasError = result.hasError;
        console.log(`Has error: ${result.hasError}`);

        if (hasError == true)
          return errorAlert(`Empty fields: ${result.errorFields.join(", ")}`);
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
            console.log("studioDetails", correctedRealData);
            appAndmoreApi
              .updateStudio(userStudioid, correctedRealData)
              .then((response) => {
                console.log("Studio updated:", response);
                if (response) {
                  if (response.status) {
                    sucessAlret("Studio Updated!", "Your data has been saved.");

                    navigate("/adminDashboard/Apps&More/studio");
                  } else {
                    errorAlert(response.message);
                  }
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
        const correctedRealData = correctDataTypes(updatedStudioDetails);
        console.log("correctedRealData----->", correctedRealData);
        const checkData = { ...correctedRealData };
        delete checkData.availabilities;
        delete checkData.clientPhotos;
        delete checkData.creationTimeStamp;
        delete checkData.featuredReviews;
        delete checkData.isActive;
        delete checkData.latitude;
        delete checkData.location;
        delete checkData.longitude;
        delete checkData.overallAvgRating;
        delete checkData._id;
        delete checkData.pricePerHour;
        delete checkData.reviews;

        const result = checkEmptyFields(checkData);
        let hasError = result.hasError;
        console.log(`Has error: ${result.hasError}`);

        if (hasError == true)
          return errorAlert(`Empty fields: ${result.errorFields.join(", ")}`);
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
            appAndmoreApi
              .createStudio(correctedRealData)
              .then((response) => {
                console.log("Studio created:", response);
                if (response) {
                  if (response.status) {
                    Swal.fire({
                      title: "Studio Created!",
                      text: "Your data has been saved.",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1800,
                    });
                    navigate("/adminDashboard/Apps&More/studio");
                  } else {
                    errorAlert(response.message);
                  }
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

  return (
    <>
      <div className={style.wrapper}>
        <WebDashboard2
          navCount={4}
          tabCount={tabCount}
          setTabCount={setTabCount}
        />
        <div className={style.studioMainScreen}>
          {/* <div className={style.studioHeader}>
            <div className={style.puredisabled}>
              <input
                type="text"
                placeholder="Search"
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
              <div className={style.addNewStudioTitle}>
                {isEditMode && showMode
                  ? "Studio details"
                  : isEditMode
                  ? "Edit Studio"
                  : "Add new studio"}
              </div>
              <form className={style.addNewStudioPage}>
                <div
                  style={{
                    position: showMode ? "relative" : "",
                    overflow: "hidden",
                  }}
                >
                  {showMode ? <p className={style.showmode}></p> : ""}

                  <div>
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="studioName">Studio Name</label>
                      <input
                        required
                        type="text"
                        id="studioName"
                        placeholder="Enter Studio Name"
                        name="studioName"
                        value={studioDetails?.fullName}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="area">Total Area</label>
                      <input
                        required
                        type="number"
                        id="area"
                        placeholder="Enter Approx. Area"
                        name="area"
                        value={studioDetails?.area}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            area: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="pincode">Studio Pincode</label>
                      <input
                        required
                        type="number"
                        id="pincode"
                        name="pincode"
                        placeholder="Enter Pincode"
                        value={studioDetails?.pincode}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="addcity">Studio city</label>
                      <input
                        required
                        list="city"
                        id="addcity"
                        placeholder="Select city Name"
                        name="addcity"
                        value={studioDetails?.city}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            city: e.target.value,
                          })
                        }
                      />
                      <datalist id="city">
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bombay">Bombay</option>
                      </datalist>
                    </div>
                    {/* <div className={style.addNewStudioinputBox}>
                      <label htmlFor="Amenities">Amenities </label>

                      <Select
                        required
                        id="Amenities"
                        mode="multiple"
                        className=""
                        placeholder="Select one or more Amenities"
                        value={selectedStudioAmenities}
                        onChange={setSelectedStudioAmenities}
                        // style={customStyles}
                        options={filteredAmenities?.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </div> */}

                    <MultipleSelect
                      selectedItems={selectedStudioAmenities}
                      setSelectedItems={setSelectedStudioAmenities}
                    />

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="studioName">Studio MapLink</label>
                      <input
                        required
                        type="text"
                        id="studioName"
                        placeholder="Enter Studio MapLink"
                        name="studioName"
                        value={studioDetails?.mapLink}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            mapLink: e.target.value,
                          })
                        }
                      />
                    </div>
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
                        value={studioDetails?.maxGuests}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            maxGuests: e.target.value,
                          })
                        }
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

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="addstate">Select State</label>
                      <input
                        required
                        list="state"
                        id="addstate"
                        placeholder="Select state Name"
                        name="state"
                        value={studioDetails?.state}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            state: e.target.value,
                          })
                        }
                      />
                      <datalist id="state">
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bombay">Bombay</option>
                      </datalist>
                    </div>
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="addstate">Select Country</label>
                      <select
                        name=""
                        id=""
                        value={studioDetails?.country}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            country: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select Country
                        </option>
                        <option value="IN">India</option>
                        <option value="US">USA</option>
                        <option value="JP">Japan</option>
                      </select>
                    </div>
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="address">Studio Address</label>
                      <input
                        required
                        type="text"
                        id="address"
                        placeholder="Enter Studio Area"
                        name="studioName"
                        value={studioDetails?.address}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div style={{ position: showMode ? "relative" : "" }}>
                  {showMode ? <p className={style.showmode}></p> : ""}

                  <div>
                    <div className={style.addNewStudioinputBox2}>
                      <label htmlFor="aboutStudio">About Studio</label>
                      <textarea
                        type="text"
                        id="aboutStudio"
                        placeholder="Enter Studio Details"
                        value={studioDetails?.aboutUs?.aboutUs}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            aboutUs: {
                              ...studioDetails?.aboutUs,
                              aboutUs: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className={style.addNewStudioinputBox2}>
                      <label htmlFor="studioService">Studio Services</label>
                      <textarea
                        type="text"
                        id="studioService"
                        placeholder="Enter Studio Services"
                        value={studioDetails?.aboutUs?.services}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            aboutUs: {
                              ...studioDetails?.aboutUs,
                              services: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className={style.addNewStudioinputBox2}>
                      <label htmlFor="infrastructure">Infrastructure</label>
                      <textarea
                        type="text"
                        id="infrastructure"
                        placeholder="Enter Approx. Area"
                        value={studioDetails?.aboutUs?.infrastructure}
                        onChange={(e) =>
                          setStudioDetails({
                            ...studioDetails,
                            aboutUs: {
                              ...studioDetails?.aboutUs,
                              infrastructure: e.target.value,
                            },
                          })
                        }
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
                {/* <p className={style.showmode}></p> */}
              </form>
              <StudioFooter
                setSelectTab={setSelectTab}
                backOnclick={gotoadminpage}
                saveType={"submit"}
                saveOnclick={showMode ? "" : handleSubmitButtonClick}
                saveDisabled={showMode}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNewStudio;
