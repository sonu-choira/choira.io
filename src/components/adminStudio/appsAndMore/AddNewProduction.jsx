import React, { useEffect, useState } from "react";
import {
  MdAddAPhoto,
  MdCancel,
  MdOutlineAddBox,
  MdOutlineSettings,
} from "react-icons/md";
import style from "../../../pages/admin/studios/studio.module.css";
// test

import cross from "../../../assets/cross.svg";
import StudioFooter from "../StudioFooter";
import { Select } from "antd";
import { VscDiffAdded } from "react-icons/vsc";
import WebDashboard2 from "../../../pages/produce/WebDashBoard2";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaRegBell } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import DragAndDropImageDiv from "../../../pages/admin/layout/DragAndDropImageDiv";
import AddmultipleServises from "../../../pages/admin/layout/AddmultipleServises";
import AddNewServices2 from "./AddNewServices2";
import appAndmoreApi from "../../../services/appAndmoreApi";
import Swal from "sweetalert2";
import MultipleSelect from "../../../pages/admin/layout/MultipleSelect";
import { errorAlert } from "../../../pages/admin/layout/Alert";

function AddNewProduction({ setSelectTab }) {
  const data = useLocation();
  const navCount = data?.state?.navCount;
  const showMode = data?.state?.showMode || false;

  // console.log("data.state", data.state.productData._id);
  let serviceId = data?.state?.productData?._id;
  let bookingPageCount;
  if (data?.state?.bookingPageCount) {
    bookingPageCount = data?.state?.bookingPageCount;
  }
  // const [productionData, setProductionData] = useState(initialState)

  const navigate = useNavigate();
  const gotoadminpage = () => {
    // alert(bookingPageCount);
    // if (bookingPageCount == "c2") {
    //   navigate("/adminDashboard/Apps&More/studio");
    // } else if (bookingPageCount == "c3") {
    //   navigate("/adminDashboard/Apps&More/studio");
    // }
    navigate("/adminDashboard/Apps&More/studio");
  };

  useEffect(() => {
    setIsEditMode(data.state?.isEditMode);
    console.log("the data id  ================== >", data.state?.productData);
  }, []);

  useEffect(() => {
    if (data.state?.productData) {
      setProductionData(data.state.productData);
    } else {
      setProductionData({});
    }
  }, [data.state?.productData]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addon, setAddon] = useState();

  const [teamDetails, setTeamsDetails] = useState([
    { photo: null, name: "", profile: "", designation: "" },
  ]);

  const [service, setService] = useState([
    {
      photo_url: [],
      name: "",
      about: "",
      amenites: [],

      planId: 1,
      price: 0,
      pricing: {
        USA: {
          price: 0,
          basePrice: 0,
          discountPercentage: 0,
        },
        IN: {
          price: 0,
          basePrice: 0,
          discountPercentage: 0,
        },
        JP: {
          price: 0,
          basePrice: 0,
          discountPercentage: 0,
        },
      },
    },
  ]);

  const [discography, setDiscography] = useState([""]);

  const [images, setImages] = useState([]);
  const [productionData, setProductionData] = useState({});

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

  const [serviceData, setServiceData] = useState({
    aboutUs: "",
    amenities: [],
    userPhotos: [],
    creationTimeStamp: "",
    discography: [],
    starredReviews: [],
    fullName: "",
    service_status: 0,
    packages: [],
    price: 0,
    userReviews: {},
    servicePhotos: [],
    service_id: "",
    type: bookingPageCount,
    workDetails: [],
    // addOns: [],
  });

  const [sendataToApi, setsendataToApi] = useState({
    serviceName: "",
    startingPrice: "",
    offerings: [],
    TotalServices: 0,
    ServicePhotos: [],
    description: [],
    portfolio: [],
    userReviews: [],
    packages: [],
    type: bookingPageCount,
    isActive: 1,
  });

  useEffect(() => {
    // Check if there are packages and set the starting price from the first package
    if (serviceData.packages.length > 0) {
      const startingPrice = serviceData.packages[0].price || 0;
      setServiceData((prev) => ({
        ...prev,
        price: startingPrice,
      }));
    }
  }, [serviceData.packages]);

  useEffect(() => {
    setsendataToApi((prev) => ({
      ...prev,
      serviceName: serviceData.fullName,
      startingPrice: serviceData.price,
      offerings: serviceData.amenities,
      TotalServices: serviceData.packages.length,
      packages: serviceData.packages,
      ServicePhotos: serviceData.servicePhotos,
      description: serviceData.aboutUs,
    }));
    console.log(
      "serviceData.TotalServices----------------------------",
      serviceData.packages.length
    );
  }, [serviceData]);

  const handelSavebtn = () => {
    const updatedData = {
      ...sendataToApi,
      serviceName: serviceData.fullName,
      startingPrice: serviceData.price,
      offerings: serviceData.amenities,
      TotalServices: serviceData.packages.length,
      packages: serviceData.packages,
      ServicePhotos: images,
      description: serviceData.aboutUs,
    };

    console.log(updatedData);
    let hasError = false;

    serviceData.servicePhotos.forEach((element, index) => {
      if (typeof element === "object") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please upload SERVICE images first!",
          showConfirmButton: false,
          timer: 1800,
        });
        hasError = true;
      }
    });

    serviceData.packages.forEach((packages, roomIndex) => {
      packages.photo_url.forEach((element, photoIndex) => {
        if (typeof element === "object") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Please upload images for room  ${packages.name.toUpperCase()} first!`,
            showConfirmButton: false,
            timer: 2000,
          });
          hasError = true;
        }
      });
    });

    if (!hasError) {
      if (isEditMode) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Edit service!",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("updatedData", updatedData);
            appAndmoreApi
              .updateService(serviceId, updatedData)
              .then((response) => {
                if (response.status) {
                  Swal.fire({
                    title: "Service Updated!",
                    text: "Your Data has been saved.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1800,
                  });
                  navigate("/adminDashboard/Apps&More/studio");
                } else {
                  errorAlert(response.message);
                }
                console.log(
                  `====================> data create huaa hai  ${bookingPageCount} `,
                  response
                );
              })
              .catch((error) => {
                if (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    showConfirmButton: false,
                    timer: 1800,
                  });
                }
                console.error("Error fetching studios:", error);
              });
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
          confirmButtonText: "Yes, Create service!",
        }).then((result) => {
          if (result.isConfirmed) {
            appAndmoreApi
              .createService(updatedData)
              .then((response) => {
                if (response.status) {
                  Swal.fire({
                    title: "Service Created!",
                    text: "Your Data has been saved.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1800,
                  });
                  navigate("/adminDashboard/Apps&More/studio");
                } else {
                  errorAlert(response.message);
                }
                console.log(
                  `====================> data create huaa hai  ${bookingPageCount} `,
                  response
                );
              })
              .catch((error) => {
                if (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    showConfirmButton: false,
                    timer: 1800,
                  });
                }
                console.error("Error fetching studios:", error);
              });
          }
          console.log("updatedData", updatedData);
        });
      }
    }
  };

  // This useEffect will keep sendataToApi in sync with serviceData when serviceData changes
  useEffect(() => {
    setsendataToApi((prev) => ({
      ...prev,
      serviceName: serviceData.fullName,
      startingPrice: serviceData.price,
      offerings: serviceData.amenities,
      TotalServices: serviceData.packages.length,
      packages: serviceData.packages,
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
      prevdata.amenities = selectedItems.map((name, index) => ({
        id: index,
        name,
      }));
      return prevdata;
    });
  }, [selectedItems.length]);

  useEffect(() => {
    setServiceData((prevdata) => {
      prevdata.packages = service;
      return prevdata;
    });
  }, [service]);
  // useEffect(() => {
  //   setServiceData((prevdata) => {
  //     prevdata.addOns = addon;
  //     return prevdata;
  //   });
  // }, [addon]);
  // useEffect(() => {
  //   setServiceData((prevdata) => {
  //     prevdata.discography = discography;
  //     return prevdata;
  //   });
  // }, [discography]);

  useEffect(() => {
    console.log("service data chnage huaa hai ", serviceData);
  }, [serviceData]);

  const handleStudioDetailsChange = (event, field) => {
    setServiceData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
    console.log(field);
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
    // const updatedDiscography = [...discography];
    // updatedDiscography[index] = value;
    // setDiscography(updatedDiscography);
  };

  // const handleAddDiscography = () => {
  //   // if (discography.length < 3) {
  //   setDiscography([...discography, ""]);
  //   // }
  // };

  const handleRemoveDiscography = (index) => {
    // const updatedDiscography = [...discography];
    // updatedDiscography.splice(index, 1);
    // setDiscography(updatedDiscography);
  };
  const [tabCount, setTabCount] = useState();

  // this code is for render multiple div based on select
  const [serviceDetails, setServiceDetails] = useState([]);

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  //   setServiceDetails([]);
  // };

  const [indexofServices, setIndexofServices] = useState();

  useEffect(() => {
    if (isEditMode) {
      const tempaminities = productionData?.amenities;
      console.log("tempaminities:", tempaminities);
      if (tempaminities && tempaminities.length > 0) {
        const slectedtempaminities = tempaminities.map(
          (item) => item?.name || item
        );
        console.log("selectedDateNames:", slectedtempaminities);
        setSelectedItems(slectedtempaminities);
      } else {
        setSelectedItems([]);
      }
    }
  }, [isEditMode]);

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
          </div>
          {showServices ? (
            <AddNewServices2
              setShowServices={setShowServices}
              setIndexofServices={setIndexofServices}
              indexofServices={indexofServices}
              setService={setService}
              service={service}
              isEditMode={isEditMode}
              showMode={showMode}
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
                    {/* 
                    <div className={style.addNewStudioinputBox}>
                      <label htmlFor="Amenities">Amenities </label>
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
                  
                    </div> */}

                    <MultipleSelect
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />

                    <div className={style.addNewStudioinputBox2}>
                      <label htmlFor="About">About</label>

                      <textarea
                        type="text"
                        id="About"
                        placeholder="Enter About Services"
                        value={serviceData?.aboutUs}
                        name="aboutUs"
                        onChange={(event) =>
                          handleStudioDetailsChange(event, "aboutUs")
                        }
                      />
                    </div>
                    <div>
                      <AddmultipleServises
                        showMode={showMode}
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
                saveOnclick={showMode ? "" : handelSavebtn}
                saveDisabled={showMode}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNewProduction;
