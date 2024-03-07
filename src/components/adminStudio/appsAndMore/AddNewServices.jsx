import React, { useState, useRef } from "react";
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
let index = 0;

function AddNewServices({
  setShowServices,
  addNewServicesformData,
  setAddNewServicesformData,
}) {
  console.log(addNewServicesformData);
  const [items, setItems] = useState([
    "Wifi",
    "AC",
    "DJ",
    "Piano",
    "Drum",
    "Banjo",
    "Car Parking",
  ]);

  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    const newImages = [
      ...addNewServicesformData.images,
      ...selectedImages.slice(0, 5 - addNewServicesformData.images.length),
    ];
    setAddNewServicesformData({ ...addNewServicesformData, images: newImages });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...addNewServicesformData.images];
    newImages.splice(index, 1);
    setAddNewServicesformData({ ...addNewServicesformData, images: newImages });
  };

  const handleAmenitiesChange = (selectedAmenities) => {
    setAddNewServicesformData({
      ...addNewServicesformData,
      amenities: selectedAmenities,
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
                value={addNewServicesformData.serviceName}
                onChange={(e) =>
                  setAddNewServicesformData({
                    ...addNewServicesformData,
                    serviceName: e.target.value,
                  })
                }
              />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="startingPrice">Price Starting From</label>
              <input
                type="text"
                id="startingPrice"
                placeholder="Enter price"
                value={addNewServicesformData.startingPrice}
                onChange={(e) =>
                  setAddNewServicesformData({
                    ...addNewServicesformData,
                    startingPrice: e.target.value,
                  })
                }
              />
            </div>

            <div className={style.addNewStudioinputBox2}>
              <label htmlFor="serviceDetails">Service Details</label>
              <textarea
                type="text"
                id="serviceDetails"
                placeholder="Enter Service Details"
                value={addNewServicesformData.serviceDetails}
                onChange={(e) =>
                  setAddNewServicesformData({
                    ...addNewServicesformData,
                    serviceDetails: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <div className={style.addNewStudioimgBox}>
              <label htmlFor="selectimg">Image</label>
              <br />
              <div>
                <label className={style.abs} htmlFor="">
                  {addNewServicesformData.images?.length === 0 ? (
                    <div>
                      <label htmlFor="selectimg">
                        <img src={upload} alt="" />
                        <div>
                          Drag and Drop or <span>Browse</span> <br /> to upload
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className={style.showMultipleStudioImage}>
                      <div>
                        {addNewServicesformData.images.map((image, index) => (
                          <div
                            key={index}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", index);
                            }}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded Image ${index + 1}`}
                              style={{ width: "100%", height: "100%" }}
                            />
                            <span
                              className={style.cancelImageUpload}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <img src={cross} alt="" />
                            </span>
                          </div>
                        ))}
                      </div>
                      {addNewServicesformData.images.length <= 4 && (
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
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Amenities">Amenities</label>
              <Select
                id="Amenities"
                mode="multiple"
                style={{
                  width: "100%",
                  height: "80%",
                  outline: "none",
                  border: "none",
                }}
                placeholder="Select or type Amenities"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                        style={{
                          outline: "none",
                          border: "none",
                        }}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={items.map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={addNewServicesformData.amenities}
                onChange={handleAmenitiesChange}
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

export default AddNewServices;
