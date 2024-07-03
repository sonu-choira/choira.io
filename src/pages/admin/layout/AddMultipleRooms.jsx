import React, { useEffect, useState } from "react";
import cross from "../../../assets/cross.svg";
import style from "../studios/studio.module.css";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function AddMultipleRooms({
  rooms,
  setrooms,
  data,
  isEditMode,
  setshowRoomsDetails,
  setIndexofrooms,
  showMode,
}) {
  // useEffect(() => {
  //   console.log("ho raha hai change ", rooms);
  // }, [rooms]);
  // useEffect(() => {
  //   if (data?.state?.productData?.rooms?.length) {
  //     console.log(typeof data.state.productData.rooms);
  //     setrooms(data.state.productData.rooms);
  //   }
  //   //  else if (initialService && initialService.length) {
  //   //   setrooms(initialService);
  //   // }
  // }, [data?.state?.productData?.rooms?.length]);

  useEffect(() => {
    console.log("-------------------------------------", rooms);
  }, [rooms]);

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>", rooms);
  }, []);

  const handleAddTeamDetail = () => {
    const newTeam = {
      roomName: "",

      pricePerHour: "",
      discount: "",
      bookingDays: [],

      generalTime: {
        startTime: "",
        endTime: "",
      },
      bookingStartTime: [],
      bookingEndTime: [],
      roomPhotos: [],
      amenities: [],
      roomDetails: "",
    };
    setrooms([...rooms, newTeam]);
  };

  const handlePhotoChange = (event, index) => {
    const newTeams = [...rooms];
    newTeams[index].roomPhotos = event.target.files[0];
    setrooms(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...rooms];
    newTeams[index][field] = event.target.value;
    setrooms(newTeams);
  };

  const handleCancelImage = (index) => {
    const newTeams = [...rooms];
    newTeams[index].roomPhotos = null;
    setrooms(newTeams);
  };

  const handleCancelTeam = (index) => {
    if (rooms.length > 1) {
      const newTeams = [...rooms];
      newTeams.splice(index, 1);
      setrooms(newTeams);
    }
  };

  const handelEditRooms = (index) => {
    setshowRoomsDetails(true);
    setIndexofrooms(index);
  };

  const hideAddPhotoIcon = (team) => {
    // console.log("team--------", team);
    var send = team?.roomPhotos?.length ? { display: "none" } : {};
    // console.log("send", send);

    return send;
  };

  return (
    <div className={style.addTeamDetailDiv}>
      <label htmlFor="Rooms">Rooms</label>
      {isEditMode ? (
        <div className={style.addTeamDetailDynamicDiv} id="Rooms">
          {rooms?.map((team, index) => (
            <div key={index} className={style.addTeamDetailMainDiv}>
              <div>
                <label>
                  <MdAddAPhoto style={hideAddPhotoIcon(team)} />
                </label>

                {team?.roomPhotos?.length ? (
                  <div>
                    <img
                      src={
                        team.roomPhotos.length
                          ? typeof team.roomPhotos[0] === "string" &&
                            team.roomPhotos[0].startsWith("http")
                            ? team.roomPhotos[0] // If `team.roomPhotos[0]` is a string URL
                            : team.roomPhotos[0] instanceof Blob
                            ? URL.createObjectURL(team.roomPhotos[0]) // If `team.roomPhotos[0]` is a Blob, create a URL for it
                            : undefined // Default to undefined if `team.roomPhotos[0]` is not a string URL or a Blob
                          : undefined // Default to undefined if `team.roomPhotos` is an empty array
                      }
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Rooms Name"
                  value={team.roomName}
                  onChange={(event) =>
                    handleInputChange(event, index, "roomName")
                  }
                />

                <div style={{ display: "flex", alignItems: "center" }}>
                  <small
                    style={{
                      position: "absolute",
                      left: "40%",
                      fontSize: "1vmax",
                    }}
                  >
                    BasePrice ₹
                  </small>
                  <input
                    style={{ paddingLeft: "55%" }}
                    type="text"
                    placeholder=""
                    value={team.basePrice}
                    onChange={(event) =>
                      handleInputChange(event, index, "basePrice")
                    }
                  />
                </div>
                <div className={style.editpencil}>
                  {showMode ? (
                    <FaEye onClick={() => handelEditRooms(index)} />
                  ) : (
                    <FaPencilAlt onClick={() => handelEditRooms(index)} />
                  )}
                </div>
              </div>
              {rooms.length > 1 && (
                <span
                  style={{ cursor: "pointer" }}
                  className={style.cancelTeamDetailUpload}
                  onClick={() => handleCancelTeam(index)}
                >
                  <img src={cross} alt="" />
                </span>
              )}
            </div>
          ))}
          <span
            className={style.addTeamDetailbtn}
            onClick={handleAddTeamDetail}
          >
            <MdOutlineAddBox /> &nbsp;<div>Add new Rooms</div>
          </span>
        </div>
      ) : (
        <div className={style.addTeamDetailDynamicDiv}>
          {rooms.map((team, index) => (
            <div key={index} className={style.addTeamDetailMainDiv}>
              <div>
                <label>
                  <MdAddAPhoto style={hideAddPhotoIcon(team)} />
                </label>

                {team.roomPhotos.length ? (
                  <div>
                    <img
                      src={
                        team.roomPhotos.length
                          ? typeof team.roomPhotos[0] === "string" &&
                            team.roomPhotos[0].startsWith("http")
                            ? team.roomPhotos[0] // If `team.roomPhotos[0]` is a string URL
                            : team.roomPhotos[0] instanceof Blob
                            ? URL.createObjectURL(team.roomPhotos[0]) // If `team.roomPhotos[0]` is a Blob, create a URL for it
                            : undefined // Default to undefined if `team.roomPhotos[0]` is not a string URL or a Blob
                          : undefined // Default to undefined if `team.roomPhotos` is an empty array
                      }
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="RoomName"
                  value={team.roomName}
                  onChange={(event) =>
                    handleInputChange(event, index, "roomName")
                  }
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <small
                    style={{
                      position: "absolute",
                      left: "40%",
                      fontSize: "1vmax",
                    }}
                  >
                    Base Price ₹
                  </small>
                  <input
                    style={{ paddingLeft: "55%" }}
                    type="text"
                    placeholder=""
                    value={team.basePrice}
                    onChange={(event) =>
                      handleInputChange(event, index, "basePrice")
                    }
                  />
                </div>
                <div className={style.editpencil}>
                  <FaPencilAlt onClick={() => handelEditRooms(index)} />
                </div>
              </div>

              {rooms.length > 1 && (
                <span
                  style={{ cursor: "pointer" }}
                  className={style.cancelTeamDetailUpload}
                  onClick={() => handleCancelTeam(index)}
                >
                  <img src={cross} alt="" />
                </span>
              )}
            </div>
          ))}
          <span
            className={style.addTeamDetailbtn}
            onClick={handleAddTeamDetail}
          >
            <MdOutlineAddBox /> &nbsp;<div>Add Rooms</div>
          </span>
        </div>
      )}
    </div>
  );
}

export default AddMultipleRooms;
