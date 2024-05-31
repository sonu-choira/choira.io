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

    studioDetails.roomsDetails.forEach((room, roomIndex) => {
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
            const correctedRealData = correctDataTypes(updatedStudioDetails);

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
                        placeholder="Enter Studio Area"
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
                        <option>Select Maximum Guest allowed</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
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
                        <option value="" disabled selected>
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
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNewStudio;
