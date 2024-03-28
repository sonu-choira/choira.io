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
import AddmultipleServises from "../../../pages/admin/layout/AddmultipleServises";
import AddNewServices2 from "./AddNewServices2";
import appAndmoreApi from "../../../services/appAndmoreApi";

function AddNewProduction({ setSelectTab }) {
  const data = useLocation();
  const navCount = data?.state?.navCount;
  const [showMode, setshowMode] = useState(data?.state?.showMode || false);
  let bookingPageCount;
  if (data?.state?.bookingPageCount) {
    bookingPageCount = data?.state?.bookingPageCount;
  }
  // const [productionData, setProductionData] = useState(initialState)
  const [selectedItems, setSelectedItems] = useState([]);
  const [addon, setAddon] = useState();

  const [teamDetails, setTeamsDetails] = useState([
    { photo: null, name: "", profile: "", designation: "" },
  ]);

  const [service, setService] = useState([
    { photo_url: [], name: "", about: "", amenites: [], price: "" },
  ]);
  const [discography, setDiscography] = useState([""]);

  const [images, setImages] = useState([]);
  const [addNewServicesformData, setAddNewServicesformData] = useState([]);

  useEffect(() => {
    console.log("addNewServicesformData-------", addNewServicesformData);
  }, [setAddNewServicesformData]);

  useEffect(() => {
    if (data?.state?.productData?.packages?.length) {
      // setStudioDetails(data?.state?.productData);
      console.log(
        "data?.state?.productData.packages",
        data?.state?.productData.packages
      );
      setService(data?.state?.productData.packages);
    }
  }, [data?.state?.productData?.packages]);

  // useEffect(() => {
  //   console.log("servicese chnage huaa hai ", service);
  // }, [service]);

  useEffect(() => {
    console.log("addNewServicesformData", addNewServicesformData);
    console.log("origiunal data", data?.state?.productData?.packages);
  }, [addNewServicesformData]);

  // const [serviceData, setStudioDetails] = useState({
  //   productionName: "",
  //   services: "",
  //   amenities: [],
  //   about: "",
  //   servicePhotos: [],
  //   addOns: [],
  //   discography: [],
  //   // teams: [{ photo: null, name: "", profile: "" }],
  // });

  const [serviceData, setServiceData] = useState({
    aboutUs: "",
    amenities: [],
    clientPhotos: [],
    creationTimeStamp: "",
    discographyDetails: [],
    featuredReviews: [],
    fullName: "",
    isActive: 0,
    packages: [],
    price: "",
    reviews: [],
    servicePhotos: [],
    service_id: "",
    type: bookingPageCount,
    workDetails: [],
    addOns: [],
  });

  const [sendataToApi, setsendataToApi] = useState({
    serviceName: "",
    startingPrice: "",
    offerings: [],
    TotalServices: "",
    servicePlans: [],
    servicePhotos: [],
    description: [],
    portfolio: [],
    userReviews: {},
    type: bookingPageCount,
    isActive: 0,
  });

  const handelSavebtn = () => {
    setsendataToApi((prev) => ({
      ...prev,
      serviceName: serviceData.fullName,
      startingPrice: serviceData.price,
      offerings: serviceData.amenities,
      TotalServices: serviceData.packages.length,
      servicePlans: serviceData.packages,
      servicePhotos: serviceData.servicePhotos,
      description: serviceData.aboutUs,
    }));
    alert("your service has been created ");
    appAndmoreApi
      .createService(sendataToApi)
      .then((response) => {
        console.log(
          `====================> data create huaa hai  ${bookingPageCount} `,
          response
        );
      })
      .catch((error) => {
        console.error("Error fetching studios:", error);
      });
  };
  // useEffect(() => {
  //   console.log("sendataToApi ===>", sendataToApi);
  // }, [sendataToApi]);

  useEffect(() => {
    setsendataToApi((prev) => ({
      ...prev,
      serviceName: serviceData.fullName,
      startingPrice: serviceData.price,
      offerings: serviceData.amenities,
      TotalServices: serviceData.packages.length,
      servicePlans: serviceData.packages,
      servicePhotos: serviceData.servicePhotos,
      description: serviceData.aboutUs,
    }));
  }, [serviceData]);

  useEffect(() => {
    console.log(
      "service ka data chnage ho raha haiiiiiiiii======>",
      serviceData
    );
  }, [images]);

  useEffect(() => {
    setServiceData((prevdata) => {
      prevdata.servicePhotos = images;
      return prevdata;
    });
  }, [images]);
  useEffect(() => {
    setServiceData((prevdata) => {
      prevdata.amenities = selectedItems;
      return prevdata;
    });
  }, [selectedItems]);
  useEffect(() => {
    setServiceData((prevdata) => {
      prevdata.packages = service;
      return prevdata;
    });
  }, [service]);
  useEffect(() => {
    setServiceData((prevdata) => {
      prevdata.addOns = addon;
      return prevdata;
    });
  }, [addon]);
  useEffect(() => {
    setServiceData((prevdata) => {
      prevdata.discographyDetails = discography;
      return prevdata;
    });
  }, [discography]);

  useEffect(() => {
    console.log("service data chnage huaa hai ", serviceData);
  }, [serviceData]);

  const handleStudioDetailsChange = (event, field) => {
    setServiceData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  useEffect(() => {
    if (data?.state?.productData) setServiceData(data?.state?.productData);
  }, [data?.state?.productData]);

  useEffect(() => {
    if (serviceData?.servicePhotos?.length)
      setImages(serviceData.servicePhotos);
  }, [serviceData?.servicePhotos?.length]);

  // useEffect(() => {
  //   // Initialize the array when the selectedOption changes
  //   initializeServicesArray();
  // }, [selectedOption]);

  useEffect(() => {
    console.log("addNewServicesformData", addNewServicesformData);
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

  const [productionData, setProductionData] = useState({});
  useEffect(() => {
    if (data.state?.productData) {
      setProductionData(data.state.productData);
    } else {
      setProductionData({});
    }
  }, [data.state?.productData]);

  const OPTIONS = ["Wifi", "AC", "DJ", "Piano", "Drum", "Banjo", "Car Parking"];

  const addonlist = [
    "Wifi",
    "AC",
    "DJ",
    "Piano",
    "Drum",
    "Banjo",
    "Car Parking",
  ];

  const filterAddon = addonlist.filter((o) => !addon?.includes(o));

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const customStyles = {
    height: "90%",
    overFlow: "scroll",
  };

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

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  //   setServiceDetails([]);
  // };

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
            <AddNewServices2
              setShowServices={setShowServices}
              setIndexofServices={setIndexofServices}
              indexofServices={indexofServices}
              setService={setService}
              service={service}
              isEditMode={isEditMode}
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
              <form
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
                        value={serviceData.fullName}
                        placeholder="Enter Production Name"
                        onChange={(event) =>
                          handleStudioDetailsChange(event, "fullName")
                        }
                      />
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
                        onChange={(event) =>
                          handleStudioDetailsChange(event, "aboutUs")
                        }
                      />
                    </div>
                    <div>
                      <AddmultipleServises
                        teamDetails={teamDetails}
                        setTeamsDetails={setTeamsDetails}
                        data={data}
                        isEditMode={isEditMode}
                        setIndexofServices={setIndexofServices}
                        indexofServices={indexofServices}
                        showServices={showServices}
                        setShowServices={setShowServices}
                        service={service}
                        setService={setService}
                      />
                    </div>
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
                        disabled
                        id="Amenities"
                        mode="multiple"
                        placeholder="Select one or more Add-ons"
                        value={addon}
                        onChange={setAddon}
                        style={customStyles}
                        options={filterAddon.map((item) => ({
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
                              style={{ cursor: "not-allowed" }}
                              disabled
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
                          style={{ cursor: "not-allowed" }}
                          // style={{ cursor: "pointer" }}
                          className={style.addDiscography}
                          // onClick={
                          //   handleAddDiscography
                          // }
                        >
                          <VscDiffAdded /> Add Discography
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              <StudioFooter
                backOnclick={gotoadminpage}
                saveOnclick={handelSavebtn}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNewProduction;
