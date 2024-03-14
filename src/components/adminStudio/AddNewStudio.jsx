import React, { useEffect, useState } from "react";
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

function AddNewStudio({ setSelectTab }) {
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
    navigate("/adminDashboard");
  };

  const data = useLocation();
  console.log("the data id  ================== >", data?.state?.productData);
  // alert(data.state.navCount);
  const [showMode, setshowMode] = useState(data?.state?.showMode || false);

  const navCount = data?.state?.navCount;
  const [tabCount, setTabCount] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [teamDetails, setTeamsDetails] = useState([
    { photo: null, name: "", profile: "", designation: "" },
  ]);

  const [studioDetails, setStudioDetails] = useState({
    fullName: "",
    area: "",
    totalRooms: "",
    pincode: "",
    city: "",
    amenities: [],
    aboutUs: {
      aboutUs: "",
      services: "",
      infrastructure: "",
    },
    teamDetails: [{ photo: null, name: "", profile: "", designation: "" }],
    studioPhotos: [],
    maxGuests: "",
    state: "",
    iframeCode: "",
  });

  useEffect(() => {
    if (data?.state?.productData) setStudioDetails(data?.state?.productData);
  }, [data?.state?.productData]);

  useEffect(() => {
    if (studioDetails?.studioPhotos.length)
      setImages(studioDetails.studioPhotos);
  }, [studioDetails?.studioPhotos?.length]);
  useEffect(() => {
    if (studioDetails?.teamDetails.length)
      setTeamsDetails(studioDetails.teamDetails);
  }, [studioDetails?.teamDetails?.length]);

  const amenitiesList = [
    { id: "wifi", label: "Wifi" },
    { id: "ac", label: "AC" },
    { id: "dj", label: "DJ" },
    { id: "piano", label: "Piano" },
    { id: "drum", label: "Drum" },
    { id: "carparking", label: "Car Parking" },
    { id: "banjo", label: "Banjo" },
  ];

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleCheckboxChange = (id) => {
    const updatedAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter((amenity) => amenity !== id)
      : [...selectedAmenities, id];

    setSelectedAmenities(updatedAmenities);
    console.log(selectedAmenities);
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

  const handleAddTeamDetail = () => {
    const newTeam = { photo: null, name: "", designation: "" };
    setTeamsDetails([...teamDetails, newTeam]);
    console.log(teamDetails);
  };

  const handlePhotoChange = (event, index) => {
    console.log("event.target.files[0]");
    console.log(event.target.files[0]);
    const newTeams = [...teamDetails];
    newTeams[index].photo = event.target.files[0];
    setTeamsDetails(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...teamDetails];
    console.log(field);
    newTeams[index][field] = event.target.value;
    console.log(newTeams);
    setTeamsDetails(newTeams);
  };

  const handleCancelImage = (index) => {
    const newTeams = [...teamDetails];
    newTeams[index].photo = null;
    setTeamsDetails(newTeams);
  };

  const handleCancelTeam = (index) => {
    console.log("iimmggggg");
    if (teamDetails.length > 1) {
      const newTeams = [...teamDetails];
      newTeams.splice(index, 1);
      setTeamsDetails(newTeams);
    }
  };

  const hideAddPhotoIcon = (team) => {
    return team.photo ? { display: "none" } : {};
  };

  // --------------------------rooms ---------------------
  const [selectedOption, setSelectedOption] = useState("0");
  if (data?.state?.productData?.totalRooms.length) {
    // setSelectedOption(studioDetails?.totalRooms);
    console.log(data?.state?.productData?.totalRooms);
    setSelectedOption(data?.state?.productData?.totalRooms);
  }
  const [serviceDetails, setServiceDetails] = useState([]);
  const [addNewServicesformData, setAddNewServicesformData] = useState([]);
  const [showServices, setShowServices] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setServiceDetails([]);
  };

  const handleServiceChange = (event, index) => {
    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[index] = event.target.value;
    setServiceDetails(updatedServiceDetails);
  };
  const [indexofServices, setIndexofServices] = useState();
  const handleEditService = (i) => {
    setShowServices(true);
    setIndexofServices(i);
  };

  const renderServiceDivs = () => {
    const divs = [];

    for (let i = 0; i < parseInt(selectedOption, 10); i++) {
      const currentServiceData = addNewServicesformData[i] || {};

      const serviceDiv = (
        <div key={i} className={style.addTeamDetailDynamicDiv}>
          <div className={style.addTeamDetailMainDiv}>
            <div>
              <label
                style={{ cursor: "pointer" }}
                htmlFor={`uploadServicePhoto`}
              >
                {/* <MdOutlineAddBox /> */}
              </label>

              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                // src={
                //   currentServiceData.images.length > 0
                //     ? URL.createObjectURL(currentServiceData.images[0])
                //     : ""
                // }
                alt=""
              />
            </div>
            <div>
              <input
                readOnly
                type="text"
                value={studioDetails?.roomsDetails?.roomName}
                placeholder="Name"
              />
              <input
                type="text"
                placeholder="Profile"
                value={`starting price from ₹ ${currentServiceData.startingPrice}`}
              />
            </div>
            <div className={style.editpencil}>
              <FaPencilAlt
                onClick={() => {
                  handleEditService(i);
                }}
              />
            </div>
          </div>
        </div>
      );

      divs.push(serviceDiv);
    }

    return divs;
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

          <div className={style.addNewStudioTitle} style={{ marginTop: "-2%" }}>
            {isEditMode && showMode
              ? "Studio details"
              : isEditMode
              ? "Edit Studio"
              : "Add new studio"}
          </div>
          <div className={style.addNewStudioPage}>
            {/* {showMode ? ()} */}

            <div style={{ position: showMode ? "relative" : "" }}>
              {showMode ? <p className={style.showmode}></p> : ""}

              <div>
                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="studioName">Studio Name</label>
                  <input
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
                    type="text"
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
                  <label htmlFor="Rooms">Rooms</label>
                  <select
                    id="Rooms"
                    name="totalRooms"
                    onChange={handleChange}
                    value={selectedOption}
                  >
                    <option value="0">Select No. of Services</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="pincode">Studio Pincode</label>
                  <input
                    type="text"
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
                <div className={style.addNewStudioinputBox}>
                  <label htmlFor="Amenities">Amenities </label>

                  <Select
                    id="Amenities"
                    mode="multiple"
                    className=""
                    placeholder="Select one or more Amenities"
                    value={
                      studioDetails?.amenities?.map((item) => item.name) || []
                    }
                    onChange={setSelectedItems}
                    style={customStyles}
                    options={studioDetails?.amenities?.map((item) => ({
                      value: item.name,
                      label: item.name,
                    }))}
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
                  <label
                    htmlFor="iframeCode"
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontSize: "18px",
                    }}
                  >
                    Google Maps Embed Code
                  </label>
                  <input
                    type="text"
                    id="iframeCode"
                    placeholder="Paste Google Maps Embed Code here"
                    value={iframeCode}
                    onChange={handleIframeCodeChange}
                  />
                </div>
                <div
                  style={{
                    fontSize: "1vmax",
                    fontWeight: "600",
                    paddingTop: "2%",
                  }}
                >
                  Location
                </div>
                <div
                  className={style.showlocationDiv}
                  style={{
                    width: "100%",
                    height: "40%",

                    overflow: "hidden",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  {hasContent ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: iframeCode }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <span style={{ fontSize: "18px", color: "#888" }}>
                        Location will be visible here
                      </span>
                    </div>
                  )}
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
                    value={studioDetails?.aboutUs.aboutUs}
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
                    value={studioDetails?.aboutUs.services}
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
                  <label htmlFor="area">Total Area</label>
                  <textarea
                    type="text"
                    id="area"
                    placeholder="Enter Approx. Area"
                    value={studioDetails?.aboutUs.infrastructure}
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
                  <div>{selectedOption !== "0" && renderServiceDivs()}</div>
                  <div>
                    <div className={style.addTeamDetailDiv}>
                      <label htmlFor="Teams">Teams</label>
                      {isEditMode ? (
                        <>
                          <div className={style.addTeamDetailDynamicDiv}>
                            {studioDetails?.teamDetails.map((team, index) => (
                              <div
                                key={index}
                                className={style.addTeamDetailMainDiv}
                              >
                                <div>
                                  <label
                                    style={{ cursor: "pointer" }}
                                    htmlFor={`uploadteamPhoto-${index}`}
                                  >
                                    {/* <MdAddAPhoto
                                      style={hideAddPhotoIcon(team)}
                                    /> */}
                                  </label>
                                  <input
                                    type="file"
                                    // value={studioDetails?.teamDetails}
                                    id={`uploadteamPhoto-${index}`}
                                    style={{ display: "none" }}
                                    onChange={(event) =>
                                      handlePhotoChange(event, index)
                                    }
                                  />
                                  {team.imgUrl && (
                                    <div>
                                      <img
                                        src={team.imgUrl}
                                        alt={`Team ${index} Photo`}
                                        style={{
                                          maxWidth: "100px",
                                          maxHeight: "100px",
                                        }}
                                      />
                                      <span
                                        className={style.cancelImageUpload}
                                        onClick={() => handleCancelImage(index)}
                                      >
                                        <img src={cross} alt="" />
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    value={team.name}
                                    onChange={(event) =>
                                      handleInputChange(event, index, "name")
                                    }
                                  />
                                  <input
                                    type="text"
                                    placeholder="Profile"
                                    value={team.designation}
                                    onChange={(event) =>
                                      handleInputChange(
                                        event,
                                        index,
                                        "designation"
                                      )
                                    }
                                  />
                                </div>
                                {team.length > 1 && (
                                  <span
                                    style={{ cursor: "pointer" }}
                                    className={style.cancelTeamDetailUpload}
                                    onClick={() => handleCancelTeam(index)}
                                  >
                                    <img src={cross} alt="" />
                                  </span>
                                )}
                              </div>
                            ))}
                            <span
                              className={style.addTeamDetailbtn}
                              onClick={handleAddTeamDetail}
                            >
                              <MdOutlineAddBox /> &nbsp;<div>Add Person</div>
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className={style.addTeamDetailDynamicDiv}>
                          {teamDetails.map((team, index) => (
                            <div
                              key={index}
                              className={style.addTeamDetailMainDiv}
                            >
                              <div>
                                <label
                                  style={{ cursor: "pointer" }}
                                  htmlFor={`uploadteamPhoto-${index}`}
                                >
                                  <MdAddAPhoto style={hideAddPhotoIcon(team)} />
                                </label>
                                <input
                                  type="file"
                                  // value={studioDetails?.teamDetails}
                                  id={`uploadteamPhoto-${index}`}
                                  style={{ display: "none" }}
                                  onChange={(event) =>
                                    handlePhotoChange(event, index)
                                  }
                                />
                                {team.photo && (
                                  <div>
                                    <img
                                      src={URL.createObjectURL(team.photo)}
                                      alt={`Team ${index} Photo`}
                                      style={{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                      }}
                                    />
                                    <span
                                      className={style.cancelImageUpload}
                                      onClick={() => handleCancelImage(index)}
                                    >
                                      <img src={cross} alt="" />
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  value={team.name}
                                  onChange={(event) =>
                                    handleInputChange(event, index, "name")
                                  }
                                />
                                <input
                                  type="text"
                                  placeholder="Profile"
                                  // value={team.profile}
                                  onChange={(event) =>
                                    handleInputChange(event, index, "profile")
                                  }
                                />
                              </div>
                              {teamDetails.length > 1 && (
                                <span
                                  style={{ cursor: "pointer" }}
                                  className={style.cancelTeamDetailUpload}
                                  onClick={() => handleCancelTeam(index)}
                                >
                                  <img src={cross} alt="" />
                                </span>
                              )}
                            </div>
                          ))}
                          <span
                            className={style.addTeamDetailbtn}
                            onClick={handleAddTeamDetail}
                          >
                            <MdOutlineAddBox /> &nbsp;<div>Add Person</div>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <p className={style.showmode}></p> */}
          </div>
          <StudioFooter
            setSelectTab={setSelectTab}
            backOnclick={gotoadminpage}
          />
        </div>
      </div>
    </>
  );
}

export default AddNewStudio;
