import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";

import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";
import StudioFooter from "./StudioFooter";

function AddNewRoom() {
  const days = [
    { id: "Monday", label: "Monday" },
    { id: "Tuesday", label: "Tuesday" },
    { id: "wednesday", label: "wednesday" },
    { id: "thursday", label: "thursday" },
    { id: "friday", label: "friday" },
    { id: "Saturday", label: "Saturday" },
    { id: "sunday", label: "sunday" },
  ];
  const amenitiesList = [
    { id: "wifi", label: "Wifi" },
    { id: "ac", label: "AC" },
    { id: "dj", label: "DJ" },
    { id: "piano", label: "Piano" },
    { id: "drum", label: "Drum" },
    { id: "carparking", label: "Car Parking" },
    { id: "banjo", label: "Banjo" },
  ];

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
  return (
    <>
      <div className={style.addNewStudioTitle}>Add new room</div>
      <div className={style.addNewRoomPage}>
        <div>
          <div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="RoomName">Room Name</label>
              <input type="text" id="RoomName" placeholder="Enter Room Name" />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="RoomArea">Room Area</label>
              <input
                type="text"
                id="RoomArea"
                placeholder="Enter Approx. Area"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="price">Price Per Hour</label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price Per Hour"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Discount">Discount</label>
              <input type="number" id="Discount" placeholder="Enter Discount" />
            </div>

            <div className={style.defaultLabel}>Booking Days</div>
            <div className={style.amenitesCheckbox}>
              {days.map((days) => (
                <div key={days.id}>
                  <input
                    type="checkbox"
                    id={days.id}
                    value={days.id}
                    checked={selectedDate.includes(days.id)}
                    onChange={() => handledaysCheckboxChange(days.id)}
                  />
                  &nbsp;
                  <label htmlFor={days.id}>{days.label}</label>
                </div>
              ))}
            </div>

            <div className={style.addNewStudioinputBox}>
              <label>General Start Time</label>

              <select>
                <option>Select General Start Time</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className={style.addNewStudioinputBox}>
              <label>Booking Start Time</label>

              <select>
                <option>Select Booking Start Time</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div>
            <div className={style.addNewStudioimgBox}>
              <label htmlFor="selectimg">Image</label>
              <br />

              <div>
                <label className={style.abs} htmlFor="selectimg">
                  <img src={upload} alt="" />
                  <div>
                    Drag and Drop or <span>Browse</span> <br /> to upload
                  </div>
                </label>
                <input type="file" id="selectimg" />
              </div>
            </div>

            <div className={style.defaultLabel}>Amenities</div>
            <div className={style.amenitesCheckbox}>
              {amenitiesList.map((amenity) => (
                <div key={amenity.id}>
                  <input
                    type="checkbox"
                    id={amenity.id}
                    value={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => handleCheckboxChange(amenity.id)}
                  />
                  &nbsp;
                  <label htmlFor={amenity.id}>{amenity.label}</label>
                </div>
              ))}
            </div>
            <div className={style.addNewStudioinputBox2}>
              <label htmlFor="RoomDetails">Room Details</label>
              <textarea
                type="text"
                id="RoomDetails"
                placeholder="Enter Room Details"
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label>General End Time</label>

              <select>
                <option>Select General End Time</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className={style.addNewStudioinputBox}>
              <label>Booking End Time</label>

              <select>
                <option>Select Booking End Time</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <StudioFooter />
    </>
  );
}

export default AddNewRoom;
