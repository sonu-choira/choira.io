import React, { useState } from "react";
import { MdAddAPhoto, MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";

function AddNewStudio() {
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

  const handleCheckboxChange = (id) => {
    const updatedAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter((amenity) => amenity !== id)
      : [...selectedAmenities, id];

    setSelectedAmenities(updatedAmenities);
    console.log(selectedAmenities);
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

  const [teams, setTeams] = useState([]);

  const handleAddTeamDetail = () => {
    const newTeam = {
      photo: null,
      name: "",
      profile: "",
    };
    setTeams([...teams, newTeam]);
  };

  const handlePhotoChange = (event, index) => {
    const newTeams = [...teams];
    newTeams[index].photo = event.target.files[0];
    setTeams(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...teams];
    newTeams[index][field] = event.target.value;
    setTeams(newTeams);
  };
  return (
    <>
      <div className="addNewStudioTitle">Add new studio</div>
      <div className="addNewStudioPage">
        <div>
          <div>
            <div className="addNewStudioinputBox">
              <label htmlFor="studioName">Studio Name</label>
              <input
                type="text"
                id="studioName"
                placeholder="Enter Studio Area"
              />
            </div>

            <div className="addNewStudioinputBox">
              <label htmlFor="area">Total Area</label>
              <input type="text" id="area" placeholder="Enter Approx. Area" />
            </div>
            <div className="addNewStudioinputBox">
              <label htmlFor="rooms">Rooms</label>

              <select id="rooms">
                <option>Select No. of Rooms</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="addNewStudioinputBox">
              <label htmlFor="pincode">Studio Pincode</label>
              <input type="text" id="pincode" placeholder="Enter Pincode" />
            </div>

            <div className="addNewStudioinputBox">
              <label htmlFor="addcity">Studio city</label>
              <input list="city" id="addcity" placeholder="Select city Name" />
              <datalist id="city">
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bombay">Bombay</option>
              </datalist>
            </div>
            <div className="amenitesCheckbox">
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
          </div>
          <div>
            <div className="addNewStudioimgBox">
              <label htmlFor="selectimg">Image</label>
              <br />

              <div>
                <label className="abs" htmlFor="selectimg">
                  <img src={upload} alt="" />
                  <div>
                    Drag and Drop or <span>Browse</span> <br /> to upload
                  </div>
                </label>
                <input type="file" id="selectimg" />
              </div>
            </div>
            <div className="addNewStudioinputBox" style={{ paddingTop: "2%" }}>
              <label htmlFor="guest">Max Guests</label>

              <select id="guest">
                <option>Select Maximum Guest allowed</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div className="addNewStudioinputBox">
              <label htmlFor="addstate">Select State</label>
              <input
                list="state"
                id="addstate"
                placeholder="Select state Name"
              />
              <datalist id="state">
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bombay">Bombay</option>
              </datalist>
            </div>

            <div className="addNewStudioinputBox">
              <label
                htmlFor="iframeCode"
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}
              >
                Google Maps Embed Code
              </label>
              <input
                type="text"
                id="iframeCode"
                placeholder="Paste Google Maps Embed Code here"
                value={iframeCode}
                onChange={handleIframeCodeChange}
              />
            </div>
            <div style={{ fontSize: "1vmax", fontWeight: "600" }}>Location</div>
            <div
              className="showlocationDiv"
              style={{
                width: "100%",
                height: "100%",

                overflow: "hidden",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              {hasContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: iframeCode }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <span style={{ fontSize: "18px", color: "#888" }}>
                    Location will be visible here
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="addNewStudioinputBox2">
              <label htmlFor="aboutStudio">About Studio</label>
              <textarea
                type="text"
                id="aboutStudio"
                placeholder="Enter Studio Details"
              />
            </div>
            <div className="addNewStudioinputBox2">
              <label htmlFor="studioService">Studio Services</label>
              <textarea
                type="text"
                id="studioService"
                placeholder="Enter Studio Services"
              />
            </div>
            <div className="addNewStudioinputBox2">
              <label htmlFor="area">Total Area</label>
              <textarea
                type="text"
                id="area"
                placeholder="Enter Approx. Area"
              />
            </div>
            <div className="roomAndClassSection">
              <div>
                <div className="addNewStudioinputBox3">
                  <label htmlFor="pincode">Rooms</label>
                  <input type="text" id="pincode" placeholder="Enter Pincode" />
                </div>
              </div>
              <div>
                <div className="addTeamDetailDiv">
                  <label htmlFor="Teams">Teams</label>
                  <span
                    className="addTeamDetailbtn"
                    onClick={handleAddTeamDetail}
                  >
                    <IoMdAddCircle />
                  </span>

                  <div className="addTeamDetailDynamicDiv">
                    {teams.map((team, index) => (
                      <div key={index} className="addTeamDetailMainDiv">
                        <div>
                          <label htmlFor={`uploadteamPhoto-${index}`}>
                            <MdAddAPhoto />
                          </label>
                          <input
                            type="file"
                            id={`uploadteamPhoto-${index}`}
                            style={{ display: "none" }}
                            onChange={(event) =>
                              handlePhotoChange(event, index)
                            }
                          />
                          {team.photo && (
                            <div>
                              <img
                                src={URL.createObjectURL(team.photo)}
                                alt={`Team ${index} Photo`}
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                }}
                              />
                              <span className="cancelUpload">
                                <MdCancel />
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Name"
                            value={team.name}
                            onChange={(event) =>
                              handleInputChange(event, index, "name")
                            }
                          />
                          <input
                            type="text"
                            placeholder="Profile"
                            value={team.profile}
                            onChange={(event) =>
                              handleInputChange(event, index, "profile")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewStudio;
