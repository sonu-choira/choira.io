import React, { useEffect, useState } from "react";
import cross from "../../../assets/cross.svg";
import style from "../studios/studio.module.css";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function AddMultipleRooms({
  rooms,
  setrooms,
  data,
  isEditMode,
  setshowRoomsDetails,
  setIndexofrooms,
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
      roomArea: "",
      pricePerHour: "",
      discount: "",
      bookingDays: [],
      generalStartTime: "",
      generalEndTime: "",
      bookingStartTime: [],
      bookingEndTime: [],
      photo: [],
      amenities: [],
      roomDetails: "",
    };
    setrooms([...rooms, newTeam]);
  };

  const handlePhotoChange = (event, index) => {
    const newTeams = [...rooms];
    newTeams[index].photo = event.target.files[0];
    setrooms(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...rooms];
    newTeams[index][field] = event.target.value;
    setrooms(newTeams);
  };

  const handleCancelImage = (index) => {
    const newTeams = [...rooms];
    newTeams[index].photo = null;
    setrooms(newTeams);
  };

  const handleCancelTeam = (index) => {
    if (rooms.length > 1) {
      const newTeams = [...rooms];
      newTeams.splice(index, 1);
      setrooms(newTeams);
    }
  };

  const handleEditService = (index) => {
    setshowRoomsDetails(true);
    setIndexofrooms(index);
  };

  const hideAddPhotoIcon = (team) => {
    console.log("team--------", team);
    var send = team.photo.length ? { display: "none" } : {};
    console.log("send", send);

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
                <label htmlFor={`uploadteamPhoto-${index}`}>
                  <MdAddAPhoto style={hideAddPhotoIcon(team)} />
                </label>

                {team.photo.length ? (
                  <div>
                    <img
                      src={
                        team.photo.length
                          ? URL.createObjectURL(team.photo[0])
                          : ""
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
                    pricePerHour ₹
                  </small>
                  <input
                    style={{ paddingLeft: "55%" }}
                    type="text"
                    placeholder=""
                    value={team.pricePerHour}
                    onChange={(event) =>
                      handleInputChange(event, index, "pricePerHour")
                    }
                  />
                </div>
                <div className={style.editpencil}>
                  <FaPencilAlt onClick={() => handleEditService(index)} />
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
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor={`uploadteamPhoto-${index}`}
                >
                  <MdAddAPhoto style={hideAddPhotoIcon(team)} />
                </label>
                {/* <input
                  type="file"
                  id={`uploadteamPhoto-${index}`}
                  style={{ display: "none" }}
                  onChange={(event) => handlePhotoChange(event, index)}
                /> */}
                {team.photo && (
                  <div>
                    <img
                      src={
                        team.photo.length > 0
                          ? URL.createObjectURL(team.photo[0])
                          : ""
                      }
                      // alt={`Team ${index} Photo`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                      }}
                    />
                    {/* <span
                      className={style.cancelImageUpload}
                      onClick={() => handleCancelImage(index)}
                    >
                      <img src={cross} alt="" />
                    </span> */}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="roomName"
                  value={team.roomName}
                  onChange={(event) =>
                    handleInputChange(event, index, "roomName")
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
                <div className={style.editpencil}>
                  <FaPencilAlt onClick={() => handleEditService(index)} />
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
            <MdOutlineAddBox /> &nbsp;<div>Add Person</div>
          </span>
        </div>
      )}
    </div>
  );
}

export default AddMultipleRooms;
