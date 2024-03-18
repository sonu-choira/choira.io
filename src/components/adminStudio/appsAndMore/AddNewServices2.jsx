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

function AddNewServices2({
  setShowServices,
  indexofServices,
  service,
  setService,
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

  const onNameChange = (event) => {
    const { value } = event.target;
    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices].name = value;
      return updatedService;
    });
  };

  const addItem = () => {
    setItems([...items, currentServiceData.name]);
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setService((prevService) => {
      const updatedService = Array.isArray(prevService) ? [...prevService] : [];
      updatedService[indexofServices] = {
        ...updatedService[indexofServices],
        photo: [
          ...(updatedService[indexofServices]?.photo || []),
          ...selectedImages.slice(0, 5), // Limit to 5 images
        ],
      };
      return updatedService;
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...currentServiceData.photo];
    newImages.splice(index, 1);

    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices].photo = newImages;
      return updatedService;
    });
  };

  const handleAmenitiesChange = (selectedAmenities) => {
    setService((prevService) => {
      const updatedService = [...prevService];
      updatedService[indexofServices] = {
        ...updatedService[indexofServices],
        amenites: selectedAmenities,
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
              <label htmlFor="name">Service Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Service Name"
                value={currentServiceData.name}
                onChange={onNameChange}
              />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="price">Price Starting From</label>
              <input
                type="text"
                id="price"
                placeholder="Enter price"
                value={currentServiceData.price}
                onChange={(e) =>
                  setService({
                    ...service,
                    [indexofServices]: {
                      ...currentServiceData,
                      price: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className={style.addNewStudioinputBox2}>
              <label htmlFor="about">Service Details</label>
              <textarea
                type="text"
                id="about"
                placeholder="Enter Service Details"
                value={currentServiceData.about}
                onChange={(e) =>
                  setService({
                    ...service,
                    [indexofServices]: {
                      ...currentServiceData,
                      about: e.target.value,
                    },
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
                  {currentServiceData.photo?.length === 0 ? (
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
                        {currentServiceData.photo.map((image, index) => (
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
                      {currentServiceData.photo.length <= 4 && (
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
                        value={currentServiceData.name}
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
                value={currentServiceData.amenites}
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

export default AddNewServices2;
