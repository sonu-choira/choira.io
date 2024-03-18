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
import DragAndDropImageDiv from "../../../pages/admin/layout/DragAndDropImageDiv";
import AddMultipleTeam from "../../../pages/admin/layout/AddMultipleTeam";

function AddNewProduction({ setSelectTab }) {
  const data = useLocation();
  const navCount = data?.state?.navCount;
  const [showMode, setshowMode] = useState(data?.state?.showMode || false);
  // const [productionData, setProductionData] = useState(initialState)
  const [selectedOption, setSelectedOption] = useState("0");
  const [images, setImages] = useState([]);

  const [addNewServicesformData, setAddNewServicesformData] = useState([]);
  useEffect(() => {}, [data]);

  const [studioDetails, setStudioDetails] = useState({
    fullName: "",
    services: "",
    amenities: [],
    aboutUs: "",
    servicePhotos: [],
    addOns: [],
    discography: [],
    // teams: [{ photo: null, name: "", profile: "" }],
  });
  const handleStudioDetailsChange = (event, field) => {
    setStudioDetails((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const initializeServicesArray = () => {
    const initialArray = [];

    const selectedOptionCount = parseInt(selectedOption, 10);

    for (let i = 0; i < selectedOptionCount; i++) {
      initialArray.push({
        serviceName: "",
        startingPrice: "",
        serviceDetails: "",
        images: [],
        amenities: [],
      });
    }

    setAddNewServicesformData(initialArray);
  };

  useEffect(() => {
    if (data?.state?.productData) setStudioDetails(data?.state?.productData);
  }, [data?.state?.productData]);
  useEffect(() => {
    if (studioDetails?.servicePhotos.length)
      setImages(studioDetails.servicePhotos);
  }, [studioDetails?.servicePhotos?.length]);

  useEffect(() => {
    // Initialize the array when the selectedOption changes
    initializeServicesArray();
  }, [selectedOption]);

  useEffect(() => {
    console.log("hii", addNewServicesformData);
  }, [addNewServicesformData]);
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

  const [teamDetails, setTeamsDetails] = useState([
    { photo: null, name: "", profile: "", designation: "" },
  ]);

  const OPTIONS = ["Wifi", "AC", "DJ", "Piano", "Drum", "Banjo", "Car Parking"];
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const customStyles = {
    height: "90%",
    overFlow: "scroll",
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
  const [indexofServices, setIndexofServices] = useState();
  const handleEditService = (i) => {
    setShowServices(true);
    setIndexofServices(i);
  };
  const renderServiceDivs = () => {
    const divs = [];

    for (let i = 0; i < parseInt(selectedOption, 10); i++) {
      const currentServiceData = addNewServicesformData[i] || {};

      const serviceDiv = currentServiceData.serviceName ? (
        // currentServiceData.images.length > 0 ? (
        // Display service with data
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
                src={
                  currentServiceData.images.length > 0
                    ? URL.createObjectURL(currentServiceData.images[0])
                    : ""
                }
                alt=""
              />
            </div>
            <div>
              <input
                readOnly
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
            <div className={style.editpencil}>
              <FaPencilAlt
                onClick={() => {
                  handleEditService(i);
                }}
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
            <FaPencilAlt
              onClick={() => {
                handleEditService(i);
              }}
            />
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
              setIndexofServices={setIndexofServices}
              indexofServices={indexofServices}
            />
          ) : (
            <>
              <div
                className={style.addNewStudioTitle}
                style={{ marginTop: "-2%" }}
              >
                {isEditMode && showMode && bookingPageCount === "c2"
                  ? "Production Details"
                  : isEditMode && showMode && bookingPageCount === "c3"
                  ? "Mix & Master Details"
                  : isEditMode && bookingPageCount === "c2"
                  ? "Edit Production Details"
                  : isEditMode && bookingPageCount === "c3"
                  ? "Edit Mix & Master Details"
                  : !isEditMode && bookingPageCount === "c2"
                  ? "Add New Production"
                  : !isEditMode && bookingPageCount === "c3"
                  ? "Add New Mix & Master"
                  : ""}
              </div>
              <div
                className={style.addNewStudioPage}
                // style={{ maxHeight: "fit-content" }}
              >
                <div style={{ position: showMode ? "relative" : "" }}>
                  {showMode ? <p className={style.showmode}></p> : ""}
                  <div>
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="ProductionName">Production Name </label>
                      <input
                        type="text"
                        id="ProductionName"
                        name="ProductionName"
                        value={studioDetails.fullName}
                        placeholder="Enter Production Name"
                        onChange={(event) =>
                          handleStudioDetailsChange(event, "fullName")
                        }
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
                        value={productionData?.aboutUs}
                      />
                    </div>

                    {selectedOption !== "0" && renderServiceDivs()}
                  </div>

                  {/* -------------------second side start here -------------- */}
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
                      {/* <AddMultipleTeam
                        teamDetails={teamDetails}
                        setTeamsDetails={setTeamsDetails}
                        data={data}
                        isEditMode={isEditMode}
                      /> */}
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
