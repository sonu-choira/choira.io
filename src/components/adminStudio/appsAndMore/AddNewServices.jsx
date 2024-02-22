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
function AddNewServices({ setSelectTab }) {
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

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  const handleCheckboxChange = (id) => {
    const updatedAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter((amenity) => amenity !== id)
      : [...selectedAmenities, id];

    setSelectedAmenities(updatedAmenities);
    console.log(selectedAmenities);
  };
  const handledaysCheckboxChange = (id) => {
    const updaeddays = selectedDate.includes(id)
      ? selectedDate.filter((day) => day !== id)
      : [...selectedDate, id];

    setSelectedDate(updaeddays);
    console.log(selectedDate);
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
  return (
    <>
      <div className={style.addNewStudioTitle}>Add New Services</div>
      <div className={style.addNewStudioPage}>
        <div style={{ height: "90%" }}>
          <div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="UserName">User Name</label>
              <input type="text" id="UserName" placeholder="Enter User Name" />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Mobilenumber">Mobile number</label>
              <input
                type="text"
                id="Mobilenumber"
                placeholder="Enter Mobile number"
              />
            </div>

            <div className={style.addNewStudioinputBox2}>
              <label htmlFor="About">About</label>

              <textarea
                type="text"
                id="About"
                placeholder="Enter About Services"
              />
            </div>
          </div>
          {/* secod side  */}
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
                          Drag and Drop or <span>Browse</span> <br /> to upload
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
                      <div>
                        {images.map((image, index) => (
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
                              style={{ right: "-10%" }}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <img src={cross} alt="" />
                            </span>
                          </div>
                        ))}
                      </div>
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
              />
            </div>
          </div>
        </div>
      </div>
      <StudioFooter setSelectTab={setSelectTab} />
    </>
  );
}

export default AddNewServices;
