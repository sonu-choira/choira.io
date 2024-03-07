import React, { useEffect, useState } from "react";
import {
  MdAddAPhoto,
  MdCancel,
  MdOutlineAddBox,
  MdOutlineSettings,
} from "react-icons/md";
import style from "../../../pages/admin/studios/studio.module.css";
import { FaPencilAlt } from "react-icons/fa";

import upload from "../../../assets/upload.svg";
import cross from "../../../assets/cross.svg";
import StudioFooter from "../StudioFooter";
import { Select } from "antd";
import { VscDiffAdded } from "react-icons/vsc";
import WebDashboard2 from "../../../pages/produce/WebDashBoard2";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaRegBell } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import AddNewServices from "./AddNewServices";

function AddNewProduction({ setSelectTab }) {
  // const [productionData, setProductionData] = useState(initialState)
  const data = useLocation();
  const navCount = data?.state?.navCount;

  const [addNewServicesformData, setAddNewServicesformData] = useState([
    {
      serviceName: "",
      startingPrice: "",
      serviceDetails: "",
      images: [],
      amenities: [],
    },
    // ... add more initial objects as needed based on the selectedOption
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);

  const navigate = useNavigate();
  const gotoadminpage = () => {
    navigate("/adminDashboard");
  };

  useEffect(() => {
    setIsEditMode(data.state?.isEditMode);
    console.log("the data id  ================== >", data.state?.productData);
  }, []);

  let bookingPageCount;
  if (data?.state?.bookingPageCount) {
    bookingPageCount = data?.state?.bookingPageCount;
  }

  const [productionData, setProductionData] = useState({});
  useEffect(() => {
    if (data.state?.productData) {
      setProductionData(data.state.productData);
    } else {
      setProductionData({});
    }
  }, [data.state?.productData]);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // const handleCheckboxChange = (id) => {
  //   const updatedAmenities = selectedAmenities.includes(id)
  //     ? selectedAmenities.filter((amenity) => amenity !== id)
  //     : [...selectedAmenities, id];

  //   setSelectedAmenities(updatedAmenities);
  //   console.log(selectedAmenities);
  // };
  // const [iframeCode, setIframeCode] = useState("");
  // const [hasContent, setHasContent] = useState(false);

  // const handleIframeCodeChange = (e) => {
  //   const inputCode = e.target.value;

  //   // Update the state with the user-entered iframe code
  //   setIframeCode(inputCode);

  //   // Update hasContent state based on whether there is content in the textarea
  //   setHasContent(inputCode.trim() !== "");
  // };
  const [teams, setTeams] = useState([{ photo: null, name: "", profile: "" }]);

  const handleAddTeamDetail = () => {
    const newTeam = { photo: null, name: "", profile: "" };
    setTeams([...teams, newTeam]);
    console.log(teams);
  };

  const handlePhotoChange = (event, index) => {
    const newTeams = [...teams];
    newTeams[index].photo = event.target.files[0];
    setTeams(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...teams];
    newTeams[index][field] = event.target.value;
    setTeams(newTeams);
  };

  const handleCancelImage = (index) => {
    const newTeams = [...teams];
    newTeams[index].photo = null;
    setTeams(newTeams);
  };

  const handleCancelTeam = (index) => {
    if (teams.length > 1) {
      const newTeams = [...teams];
      newTeams.splice(index, 1);
      setTeams(newTeams);
    }
  };

  const hideAddPhotoIcon = (team) => {
    return team.photo ? { display: "none" } : {};
  };

  const [images, setImages] = useState([]);
  const [isOver, setIsOver] = useState(false);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    const newImages = [
      ...images,
      ...selectedImages.slice(0, 5 - images.length),
    ];
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsOver(false);

    const draggedIndex = event.dataTransfer.getData("text/plain");
    const droppedIndex = images.length;

    // Prevent dropping the item back into its original position
    if (draggedIndex === droppedIndex.toString()) {
      return;
    }

    const draggedImage = images[draggedIndex];
    const newImages = [...images];
    newImages.splice(draggedIndex, 1);
    newImages.splice(droppedIndex, 0, draggedImage);

    setImages(newImages);
  };

  const OPTIONS = ["Wifi", "AC", "DJ", "Piano", "Drum", "Banjo", "Car Parking"];
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const customStyles = {
    height: "90%",
  };

  const [discography, setDiscography] = useState([""]);

  const handleDiscographyInputChange = (index, value) => {
    const updatedDiscography = [...discography];
    updatedDiscography[index] = value;
    setDiscography(updatedDiscography);
  };

  const handleAddDiscography = () => {
    // if (discography.length < 3) {
    setDiscography([...discography, ""]);
    // }
  };

  const handleRemoveDiscography = (index) => {
    const updatedDiscography = [...discography];
    updatedDiscography.splice(index, 1);
    setDiscography(updatedDiscography);
  };
  const [tabCount, setTabCount] = useState();

  // this code is for render multiple div based on select
  const [selectedOption, setSelectedOption] = useState("0");
  const [serviceDetails, setServiceDetails] = useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setServiceDetails([]);
  };

  const handleServiceChange = (event, index) => {
    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[index] = event.target.value;
    setServiceDetails(updatedServiceDetails);
  };

  const handleEditService = () => {
    setShowServices(true);
  };
  const renderServiceDivs = () => {
    const divs = [];

    for (let i = 0; i < parseInt(selectedOption, 10); i++) {
      const currentServiceData = addNewServicesformData[i] || {};

      const serviceDiv = currentServiceData.serviceName ? (
        // Display service with data
        <div key={i} className={style.addTeamDetailDynamicDiv}>
          <div className={style.addTeamDetailMainDiv}>
            <div>
              <label
                style={{ cursor: "pointer" }}
                htmlFor={`uploadServicePhoto`}
              >
                <MdOutlineAddBox />
              </label>
              <input
                type="file"
                id={`uploadServicePhoto`}
                style={{ display: "none" }}
                src={URL.createObjectURL(currentServiceData.images[0])}
              />
            </div>
            <div>
              <input
                type="text"
                value={currentServiceData.serviceName}
                placeholder="Name"
              />
              <input
                type="text"
                placeholder="Profile"
                value={`starting price from ₹ ${currentServiceData.startingPrice}`}
              />
            </div>
          </div>
        </div>
      ) : (
        // Display editable service div
        <div
          key={i}
          className={`${style.addNewStudioinputBox} ${style.editPencilinput}`}
        >
          <label htmlFor={`ProductionName${i + 1}`}>Service {i + 1}</label>
          <input
            className={style.editPencilinput}
            type="text"
            id={`ProductionName${i + 1}`}
            name={`ProductionName${i + 1}`}
            value={serviceDetails[i] || ""}
            placeholder={`Enter Service ${i + 1} Details`}
            onChange={(e) => handleServiceChange(e, i)}
          />
          <div className={style.editpencil}>
            <FaPencilAlt onClick={handleEditService} />
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
          {showServices ? (
            <AddNewServices
              setServices={setServices}
              setShowServices={setShowServices}
              setAddNewServicesformData={setAddNewServicesformData}
              addNewServicesformData={addNewServicesformData}
            />
          ) : (
            <>
              <div
                className={style.addNewStudioTitle}
                style={{ marginTop: "-2%" }}
              >
                {isEditMode
                  ? bookingPageCount === "c2"
                    ? "Edit production Details"
                    : "Edit Mix&Master Details"
                  : bookingPageCount === "c2"
                  ? "Add new production"
                  : "Add new Mix&Master"}
              </div>
              <div
                className={style.addNewStudioPage}
                // style={{ maxHeight: "fit-content" }}
              >
                <div>
                  <div>
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="ProductionName">Production Name </label>
                      <input
                        type="text"
                        id="ProductionName"
                        name="ProductionName"
                        value={productionData.fullName}
                        placeholder="Enter Production Name"
                      />
                    </div>

                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="Services">Services</label>
                      <select
                        id="Services"
                        name="Services"
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
                      <label htmlFor="Amenities">Amenities </label>
                      {isEditMode ? (
                        <Select
                          id="Amenities"
                          mode="multiple"
                          placeholder="Select one or more Amenities"
                          value={
                            productionData?.amenities?.map(
                              (item) => item.name
                            ) || []
                          }
                          onChange={setSelectedItems}
                          style={customStyles}
                          options={productionData?.amenities?.map((item) => ({
                            value: item.name,
                            label: item.name,
                          }))}
                        />
                      ) : (
                        <Select
                          id="Amenities"
                          mode="multiple"
                          placeholder="Select one or more Amenities"
                          value={selectedItems}
                          onChange={setSelectedItems}
                          style={customStyles}
                          options={filteredOptions.map((item) => ({
                            value: item,
                            label: item,
                          }))}
                        />
                      )}
                    </div>

                    <div className={style.addNewStudioinputBox2}>
                      <label htmlFor="About">About</label>

                      <textarea
                        type="text"
                        id="About"
                        placeholder="Enter About Services"
                        value={productionData?.aboutUs?.aboutUs}
                      />
                    </div>

                    {/* <div>
                      <label htmlFor={`Discography`}>Discography</label>
                      {discography.map((value, index) => (
                        <div className={style.Discography} key={index}>
                          <div>
                            <input
                              type="text"
                              id={`Discography-${index}`}
                              value={value}
                              onChange={(e) =>
                                handleDiscographyInputChange(index, e.target.value)
                              }
                              placeholder="Enter work links"
                            />
                            {index > 0 && (
                              <div
                                className={style.cancelUpload}
                                onClick={() => handleRemoveDiscography(index)}
                              >
                                <img src={cross} alt="Remove" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {discography.length < 3 && (
                        <div
                          style={{ cursor: "pointer" }}
                          className={style.addDiscography}
                          onClick={handleAddDiscography}
                        >
                          <VscDiffAdded /> Add Discography
                        </div>
                      )}
                    </div> */}

                    {/* <div
                      className={`${style.addNewStudioinputBox} ${style.editPencilinput}`}
                    >
                      <label htmlFor="ProductionName">Services</label>
                      <input
                        className={style.editPencilinput}
                        type="text"
                        id="ProductionName"
                        name="ProductionName"
                        value={productionData.fullName}
                        placeholder="Enter Services Details"
                      />
                      <div className={style.editpencil}>
                        <FaPencilAlt />
                      </div>
                    </div> */}
                    {selectedOption !== "0" && renderServiceDivs()}
                  </div>

                  {/* -------------------second side start here -------------- */}
                  <div>
                    <div className={style.addNewStudioimgBox}>
                      <label htmlFor="selectimg">Image</label>
                      <br />
                      <div>
                        <label className={style.abs} htmlFor="">
                          {images.length === 0 ? (
                            <div>
                              <label htmlFor="selectimg">
                                <img src={upload} alt="" />
                                <div>
                                  Drag and Drop or <span>Browse</span> <br /> to
                                  upload
                                </div>
                              </label>
                            </div>
                          ) : (
                            <div
                              className={`${style.showMultipleStudioImage} ${
                                isOver ? "drag-over" : ""
                              }`}
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                            >
                              {isEditMode ? (
                                <div>
                                  {productionData?.servicePhotos?.map(
                                    (image, index) => {
                                      if (
                                        image instanceof Blob ||
                                        image instanceof File
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            draggable
                                            onDragStart={(e) => {
                                              e.dataTransfer.setData(
                                                "text/plain",
                                                index
                                              );
                                            }}
                                          >
                                            <img
                                              src={URL.createObjectURL(image)}
                                              alt={`Uploaded Image ${
                                                index + 1
                                              }`}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                              }}
                                            />
                                            <span
                                              className={
                                                style.cancelImageUpload
                                              }
                                              style={{ right: "-10%" }}
                                              onClick={() =>
                                                handleRemoveImage(index)
                                              }
                                            >
                                              <img src={cross} alt="" />
                                            </span>
                                          </div>
                                        );
                                      } else {
                                        console.error(
                                          "Invalid image type at index",
                                          index,
                                          ":",
                                          image
                                        );

                                        return null;
                                      }
                                    }
                                  )}
                                </div>
                              ) : (
                                <div>
                                  {images.map((image, index) => (
                                    <div
                                      key={index}
                                      draggable
                                      onDragStart={(e) => {
                                        e.dataTransfer.setData(
                                          "text/plain",
                                          index
                                        );
                                      }}
                                    >
                                      <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Uploaded Image ${index + 1}`}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                      />
                                      <span
                                        className={style.cancelImageUpload}
                                        style={{ right: "-10%" }}
                                        onClick={() => handleRemoveImage(index)}
                                      >
                                        <img src={cross} alt="" />
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {images.length <= 4 && (
                                <div>
                                  <label
                                    htmlFor="selectimg"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      paddingTop: "15%",
                                    }}
                                  >
                                    <img src={upload} alt="" /> Upload
                                  </label>
                                </div>
                              )}
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          multiple
                          accept=".jpeg,.png,.svg,.webp,.jpg,.jfif"
                          id="selectimg"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    <div
                      className={style.addNewStudioinputBox}
                      style={{ paddingTop: "2%" }}
                    >
                      <label htmlFor="Amenities">Add-ons </label>
                      <Select
                        id="Amenities"
                        mode="multiple"
                        placeholder="Select one or more Add-ons"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={customStyles}
                        options={filteredOptions.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </div>

                    {/* <div className={style.addNewStudioinputBox}>
                      <label htmlFor="ProductionName">Production Name </label>
                      <input
                        type="text"
                        id="ProductionName"
                        placeholder="Enter Production Name"
                      />
                    </div> */}

                    <div>
                      <label htmlFor={`Discography`}>Discography</label>
                      {discography.map((value, index) => (
                        <div className={style.Discography} key={index}>
                          <div>
                            <input
                              type="text"
                              id={`Discography-${index}`}
                              value={value}
                              onChange={(e) =>
                                handleDiscographyInputChange(
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder="Enter work links"
                            />
                            {index > 0 && (
                              <div
                                className={style.cancelUpload}
                                onClick={() => handleRemoveDiscography(index)}
                              >
                                <img src={cross} alt="Remove" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {discography.length < 3 && (
                        <div
                          style={{ cursor: "pointer" }}
                          className={style.addDiscography}
                          onClick={handleAddDiscography}
                        >
                          <VscDiffAdded /> Add Discography
                        </div>
                      )}
                    </div>

                    <div>
                      <div className={style.addTeamDetailDiv}>
                        <label htmlFor="Teams">Teams</label>
                        {isEditMode ? (
                          <div className={style.addTeamDetailDynamicDiv}>
                            {productionData?.workDetails?.map((team, index) => (
                              <div
                                key={index}
                                className={style.addTeamDetailMainDiv}
                              >
                                <div>
                                  <label
                                    style={{ cursor: "pointer" }}
                                    htmlFor={`uploadteamPhoto-${index}`}
                                  >
                                    <MdAddAPhoto
                                      style={hideAddPhotoIcon(team)}
                                    />
                                  </label>
                                  <input
                                    type="file"
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
                                      handleInputChange(event, index, "profile")
                                    }
                                  />
                                </div>
                                {teams.length > 1 && (
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
                        ) : (
                          <div className={style.addTeamDetailDynamicDiv}>
                            {teams.map((team, index) => (
                              <div
                                key={index}
                                className={style.addTeamDetailMainDiv}
                              >
                                <div>
                                  <label
                                    style={{ cursor: "pointer" }}
                                    htmlFor={`uploadteamPhoto-${index}`}
                                  >
                                    <MdAddAPhoto
                                      style={hideAddPhotoIcon(team)}
                                    />
                                  </label>
                                  <input
                                    type="file"
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
                                    value={team.profile}
                                    onChange={(event) =>
                                      handleInputChange(event, index, "profile")
                                    }
                                  />
                                </div>
                                {teams.length > 1 && (
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

                      <div className={style.addTeamDetailDynamicDiv}>
                        <div className={style.addTeamDetailMainDiv}>
                          <div>
                            <label
                              style={{ cursor: "pointer" }}
                              htmlFor={`uploadServicePhoto`}
                            >
                              <MdOutlineAddBox />
                            </label>
                            <input
                              type="file"
                              id={`uploadServicePhoto`}
                              style={{ display: "none" }}
                            />
                          </div>
                          <div>
                            <input type="text" placeholder="Name" />
                            <input type="text" placeholder="Profile" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <StudioFooter backOnclick={gotoadminpage} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNewProduction;
