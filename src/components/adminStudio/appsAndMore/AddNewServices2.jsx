import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import { MdAddAPhoto } from "react-icons/md";
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

  useEffect(() => {
    if (isEditMode) {
      setSelectedItems(
        currentServiceData?.amenites?.map((item) => item.name) || []
      );
    }
  }, [currentServiceData?.amenites]);

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

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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

  return (
    <>
      <div className={style.addNewStudioTitle}>Add New Services</div>
      <div className={style.addNewStudioPage}>
        <div style={{ height: "90%" }}>
          <div>
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

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="startingPrice">Price Starting From</label>
              <input
                type="text"
                id="startingPrice"
                placeholder="Enter price"
                value={currentServiceData.price}
                onChange={handlePriceChange}
              />
            </div>

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
