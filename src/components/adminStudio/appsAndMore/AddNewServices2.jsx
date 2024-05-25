import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../../assets/img/upload.png";
import style from "../../../pages/admin/studios/studio.module.css";

import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";
import StudioFooter from "../StudioFooter";
import cross from "../../../assets/cross.svg";
import DragAndDropImageDiv from "../../../pages/admin/layout/DragAndDropImageDiv";
import { MdCancel } from "react-icons/md";

function AddNewServices2({
  setShowServices,
  service,
  setService,
  indexofServices,
  isEditMode,
  showMode,
}) {
  const [items, setItems] = useState([
    "Wifi",
    "AC",
    "DJ",
    "Piano",
    "Drum",
    "Banjo",
    "Car Parking",
  ]);

  const inputRef = useRef(null);

  const currentServiceData = service[indexofServices] || {};
  useEffect(() => {
    console.log("currentServiceData-------->", currentServiceData);
  }, [currentServiceData]);

  const OPTIONS = ["Wifi", "AC", "DJ", "Piano", "Drum", "Banjo", "Car Parking"];
  const [selectedItems, setSelectedItems] = useState([]);

  // useEffect(() => {
  //   if (isEditMode) {
  //     setSelectedItems(
  //       currentServiceData?.amenites?.map((item) => item?.name) || []
  //     );
  //   }
  // }, [isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      const tempaminities = currentServiceData?.amenites;
      console.log("tempaminities:", tempaminities);
      if (tempaminities && tempaminities.length > 0) {
        const selectedtempaminities = tempaminities.map(
          (item) => item?.name || item
        );
        console.log("selectedDateNames:", selectedtempaminities);
        setSelectedItems(selectedtempaminities);
      } else {
        setSelectedItems([]);
      }
    }
  }, [isEditMode]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [images, setImages] = useState(
    currentServiceData ? currentServiceData.photo_url : []
  );
  const onNameChange = (event) => {
    setService((prevService) => {
      const updatedService = [...prevService]; // Copy the existing service array
      updatedService[indexofServices] = {
        ...updatedService[indexofServices], // Copy the existing object
        name: event.target.value, // Update the 'name' property
      };
      return updatedService; // Return the updated array
    });
  };

  // useEffect(() => {
  //   if()

  // }, [images])

  useEffect(() => {
    setService((prerooms) => {
      prerooms.map((rm, idex) => {
        if (idex === indexofServices) {
          rm.photo_url = images;
        }
      });
      return prerooms;
    });
  }, [images]);
  useEffect(() => {
    setService((prerooms) => {
      prerooms.map((rm, idex) => {
        if (idex === indexofServices) {
          rm.amenites = selectedItems;
        }
      });
      return prerooms;
    });
  }, [selectedItems.length]);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    const newImages = [
      ...currentServiceData.photo_url,
      ...selectedImages.slice(0, 5 - currentServiceData.photo_url.length),
    ];

    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices] = {
        ...currentServiceData,
        photo_url: newImages,
      };
      return updatedService;
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...currentServiceData.photo_url];
    newImages.splice(index, 1);

    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices] = {
        ...currentServiceData,
        photo_url: newImages,
      };
      return updatedService;
    });
  };

  const handlePriceChange = (event) => {
    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices] = {
        ...updatedService[indexofServices],
        price: event.target.value,
      };
      return updatedService;
    });
  };

  const handleAboutChange = (event) => {
    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices] = {
        ...updatedService[indexofServices],
        about: event.target.value,
      };
      return updatedService;
    });
  };

  const handleAmenitiesChange = (selectedAmenities) => {
    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices] = {
        ...updatedService[indexofServices],
        amenities: selectedAmenities,
      };
      return updatedService;
    });
  };

  const [countryWithPrice, setCountryWithPrice] = useState([
    { "India(₹)": "" },
    { "USA($)": "" },
    { "Japan(¥)": "" },
  ]);

  let apiCountryPrice = currentServiceData?.pricing;
  console.log("apiCountryPrice", apiCountryPrice);

  // Function to handle country selection
  const [selectedCountry, setSelectedCountry] = useState(
    isEditMode && apiCountryPrice ? Object.keys(apiCountryPrice) : []
  );

  const [countryPrice, setCountryPrice] = useState(
    isEditMode && apiCountryPrice
      ? Object.values(apiCountryPrice).map((country) => country.price)
      : []
  );

  const [addMultiplePriceDiv, setAddMultiplePriceDiv] = useState(
    isEditMode && selectedCountry.length > 0
      ? Array(selectedCountry.length).fill([])
      : [[]]
  );

  useEffect(() => {
    console.log("selectedCountry");
    console.log(selectedCountry);
  }, [selectedCountry]);

  const [filteredCountryData, setFilteredCountryData] = useState([
    "IN",
    "USA",
    "JP",
  ]);

  const [countryWithPrice2, setCountryWithPrice2] = useState([
    { "India(₹)": "" },
    { "USA($)": "" },
    { "Japan(¥)": "" },
  ]);

  const handelMultipleCountryPriceDiv = () => {
    setAddMultiplePriceDiv((prev) => {
      return [...prev, []];
    });
  };
  useEffect(() => {
    console.log(addMultiplePriceDiv);
  }, [addMultiplePriceDiv]);

  const handleCountrySelect = (fnselectedCountry, index) => {
    console.log("------------");
    setSelectedCountry((prev) => {
      prev[index] = fnselectedCountry;
      return [...prev];
    });
  };

  // const selectedCountry = Object.keys(apiCountryPrice);

  // // Extracting countryPrice from apiCountryPrice
  // const countryPrice = Object.values(apiCountryPrice).map(
  //   (country) => country.price
  // );

  const handleCancelcountry = (index) => {
    if (addMultiplePriceDiv.length > 1) {
      const newdata = [...addMultiplePriceDiv];
      newdata.splice(index, 1);
      setAddMultiplePriceDiv(newdata);
      let newCountyData = [...selectedCountry];
      newCountyData.splice(index, 1);
      setSelectedCountry(newCountyData);

      let newPrice = [...countryPrice];
      newPrice.splice(index, 1);
      setCountryPrice(newPrice);
    }
  };
  const handelCountryPrice = (value, index) => {
    setCountryPrice((prev) => {
      prev[index] = value;
      return [...prev];
    });
  };
  useEffect(() => {
    console.log("countryPrice", countryPrice);
  }, [countryPrice]);
  let countryWithPriceobj = {};
  useEffect(() => {
    selectedCountry.map((name, index) => {
      return (countryWithPriceobj[name] = countryPrice[index]);
    });
  }, [countryPrice, selectedCountry]);

  useEffect(() => {
    console.log("countryWithPriceobj", countryWithPriceobj);
  }, [countryWithPriceobj]);

  useEffect(() => {
    if (countryWithPriceobj && Object.keys(countryWithPriceobj).length > 0) {
      console.log("---------------------checking");

      setService((prevService) => {
        return prevService.map((item, index) => {
          if (index === indexofServices) {
            console.log("---------------------checking222");

            return {
              ...item,
              pricing: {
                ...(item.pricing || {}), // Ensure pricing object is defined
                USA: {
                  ...(item.pricing?.USA || {}), // Ensure USA object is defined
                  basePrice: countryWithPriceobj["USA"] || 0,
                },
                IN: {
                  ...(item.pricing?.IN || {}), // Ensure IN object is defined
                  basePrice: countryWithPriceobj["IN"] || 0,
                },
                JP: {
                  ...(item.pricing?.JP || {}), // Ensure JP object is defined
                  basePrice: countryWithPriceobj["JP"] || 0,
                },
              },
            };
          } else {
            return { ...item };
          }
        });
      });
    }
  }, [countryPrice, selectedCountry]);

  return (
    <>
      <div className={style.addNewStudioTitle}>Add New Services</div>
      <div className={style.addNewStudioPage}>
        <div style={{ height: "90%" }}>
          <div
            style={{
              position: showMode ? "relative" : "",
              overflow: "hidden",
            }}
          >
            {showMode ? <p className={style.showmode}></p> : ""}
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="serviceName">Service Name</label>
              <input
                type="text"
                id="serviceName"
                placeholder="Enter Service Name"
                value={currentServiceData.name}
                onChange={onNameChange}
              />
            </div>

            {addMultiplePriceDiv.map((el, index) => (
              <div className={style.addPriceAndCountryInput}>
                <div>
                  <select
                    name="price"
                    id=""
                    onChange={(e) => handleCountrySelect(e.target.value, index)}
                    value={selectedCountry[index]}
                    style={{
                      color: selectedCountry[index] ? "black" : "#757575",
                    }}
                  >
                    {selectedCountry[index] ? (
                      <option value={selectedCountry[index]}>
                        {selectedCountry[index] == "IN"
                          ? "India(₹)"
                          : selectedCountry[index] == "USA"
                          ? "USA($)"
                          : "Japan(¥)"}
                      </option>
                    ) : (
                      <option value="" default>
                        select County
                      </option>
                    )}

                    {filteredCountryData.map((country, index) => {
                      if (!selectedCountry.includes(country)) {
                        return (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                {countryPrice.map((price, index) => {})}

                <div>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    onChange={(event) => {
                      handelCountryPrice(event.target.value, index);
                    }}
                    value={countryPrice[index]}
                  />
                </div>
                {addMultiplePriceDiv.length > 1 && (
                  <span
                    style={{ cursor: "pointer", top: "-15%", right: "-1.5%" }}
                    className={style.cancelTeamDetailUpload}
                    onClick={() => handleCancelcountry(index)}
                  >
                    <MdCancel
                      style={{ fontSize: "1.2vmax", color: "#7575759a" }}
                    />
                  </span>
                )}
              </div>
            ))}

            {addMultiplePriceDiv.length <= 2 && (
              <span
                className={style.addTeamDetailbtn}
                onClick={handelMultipleCountryPriceDiv}
              >
                <MdOutlineAddBox /> &nbsp;<div>Add new country</div>
              </span>
            )}

            <div className={style.addNewStudioinputBox2}>
              <label htmlFor="serviceDetails">Service Details</label>
              <textarea
                type="text"
                id="serviceDetails"
                placeholder="Enter Service Details"
                value={currentServiceData.about}
                onChange={handleAboutChange}
              />
            </div>
          </div>

          <div>
            <DragAndDropImageDiv
              images={images}
              setImages={setImages}
              isEditMode={isEditMode}
            />
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Amenities">Amenities</label>

              <Select
                id="Amenities"
                mode="multiple"
                placeholder="Select one or more Amenities"
                value={selectedItems}
                onChange={setSelectedItems}
                // style={customStyles}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
      <StudioFooter
        backOnclick={() => {
          setShowServices(false);
        }}
      />
    </>
  );
}

export default AddNewServices2;
