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
  const [addMultiplePriceDiv, setAddMultiplePriceDiv] = useState([[]]);
  const [filteredCountryData, setFilteredCountryData] = useState([
    { "India(₹)": "" },
    { "USA($)": "" },
    { "Japan(¥)": "" },
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
  // Function to handle country selection
  const handleCountrySelect = (selectedCountry) => {
    // Update filteredCountryData with non-selected countries
    console.log(selectedCountry);
    const updatedFilteredData = countryWithPrice.filter(
      (country) => Object.keys(country)[0] !== selectedCountry
    );
    setFilteredCountryData(updatedFilteredData);
    console.log(updatedFilteredData);
  };
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

            {/* <div className={style.addNewStudioinputBox}>
              <label htmlFor="startingPrice">Price Starting From</label>
              <input
                type="text"
                id="startingPrice"
                placeholder="Enter price"
                value={currentServiceData.price}
                onChange={handlePriceChange}
              />
            </div> */}
            {addMultiplePriceDiv.map((el, index) => (
              <div className={style.addPriceAndCountryInput}>
                <div>
                  <select
                    name="price"
                    id=""
                    onChange={(e) => handleCountrySelect(e.target.value)}
                    // value={}
                  >
                    <option value="" default>
                      select County{" "}
                    </option>
                    {filteredCountryData.map((country, index) => {
                      const countryName = Object.keys(country)[0];
                      return (
                        <option key={index} value={countryName}>
                          {countryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div></div>
              </div>
            ))}

            {addMultiplePriceDiv.length <= 2 && (
              <span
                className={style.addTeamDetailbtn}
                onClick={handelMultipleCountryPriceDiv}
              >
                <MdOutlineAddBox /> &nbsp;<div>Add new Rooms</div>
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
