import React, { useEffect, useState } from "react";
import cross from "../../../assets/cross.svg";
import style from "../studios/studio.module.css";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function AddmultipleServises({
  service,
  setService,
  data,
  isEditMode,
  setShowServices,
  setIndexofServices,
}) {
  useEffect(() => {
    console.log("ho raha hai change ", service);
  }, [service]);
  useEffect(() => {
    if (data?.state?.productData?.service?.length) {
      console.log(typeof data.state.productData.service);
      setService(data.state.productData.service);
    }
    //  else if (initialService && initialService.length) {
    //   setService(initialService);
    // }
  }, [data?.state?.productData?.service?.length]);

  useEffect(() => {
    console.log("-------------------------------------", service);
  }, [service]);

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>", service);
  }, []);

  const handleAddTeamDetail = () => {
    const newTeam = {
      photo_url: [],
      name: "",
      about: "",
      amenities: [],
      price: "",
    };
    setService([...service, newTeam]);
  };

  const handlePhotoChange = (event, index) => {
    const newTeams = [...service];
    newTeams[index].photo_url = event.target.files[0];
    setService(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...service];
    newTeams[index][field] = event.target.value;
    setService(newTeams);
  };

  const handleCancelImage = (index) => {
    const newTeams = [...service];
    newTeams[index].photo_url = null;
    setService(newTeams);
  };

  const handleCancelTeam = (index) => {
    if (service.length > 1) {
      const newTeams = [...service];
      newTeams.splice(index, 1);
      setService(newTeams);
    }
  };

  const handleEditService = (index) => {
    setShowServices(true);
    setIndexofServices(index);
  };

  const hideAddPhotoIcon = (team) => {
    // console.log("team--------", team);
    var send = team?.photo_url?.length ? { display: "none" } : {};
    // console.log("send", send);

    return send;
  };

  return (
    <div className={style.addTeamDetailDiv}>
      <label htmlFor="Services">Services</label>
      {isEditMode ? (
        <div className={style.addTeamDetailDynamicDiv} id="Services">
          {service?.map((team, index) => (
            <div key={index} className={style.addTeamDetailMainDiv}>
              <div>
                <label htmlFor={`uploadteamPhoto-${index}`}>
                  <MdAddAPhoto style={hideAddPhotoIcon(team)} />
                </label>

                {team?.photo_url?.length ? (
                  <div>
                    <img
                    // src={
                    //   team.photo_url.length
                    //     ? URL.createObjectURL(team.photo_url[0])
                    //     : ""
                    // }
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Services Name"
                  value={team.name}
                  onChange={(event) => handleInputChange(event, index, "name")}
                />

                <div style={{ display: "flex", alignItems: "center" }}>
                  <small
                    style={{
                      position: "absolute",
                      left: "40%",
                      fontSize: "1vmax",
                    }}
                  >
                    Starting Price ₹
                  </small>
                  <input
                    style={{ paddingLeft: "55%" }}
                    type="text"
                    placeholder=""
                    value={team.price}
                    onChange={(event) =>
                      handleInputChange(event, index, "price")
                    }
                  />
                </div>
                <div className={style.editpencil}>
                  <FaPencilAlt onClick={() => handleEditService(index)} />
                </div>
              </div>
              {service.length > 1 && (
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
            <MdOutlineAddBox /> &nbsp;<div>Add new Services</div>
          </span>
        </div>
      ) : (
        <div className={style.addTeamDetailDynamicDiv}>
          {service.map((team, index) => (
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
                {team.photo_url && (
                  <div>
                    <img
                      // src={
                      //   team.photo_url.length > 0
                      //     ? URL.createObjectURL(team.photo_url[0])
                      //     : ""
                      // }
                      // alt={`Team ${index} photo_url`}
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
                  placeholder="Name"
                  value={team.name}
                  onChange={(event) => handleInputChange(event, index, "name")}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <small
                    style={{
                      position: "absolute",
                      left: "40%",
                      fontSize: "1vmax",
                    }}
                  >
                    Starting Price ₹
                  </small>
                  <input
                    style={{ paddingLeft: "55%" }}
                    type="text"
                    placeholder=""
                    value={team.price}
                    onChange={(event) =>
                      handleInputChange(event, index, "price")
                    }
                  />
                </div>
                <div className={style.editpencil}>
                  <FaPencilAlt onClick={() => handleEditService(index)} />
                </div>
              </div>

              {service.length > 1 && (
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

export default AddmultipleServises;
