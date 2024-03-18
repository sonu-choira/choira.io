import React, { useEffect, useState } from "react";
import cross from "../../../assets/cross.svg";
import style from "../studios/studio.module.css";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function AddmultipleServises({
  service: initialService,
  setService,
  data,
  isEditMode,
  setShowServices,
  setIndexofServices,
}) {
  const [service, setLocalService] = useState([]);

  useEffect(() => {
    if (data?.state?.productData?.service?.length) {
      setLocalService(data.state.productData.service);
    } else if (initialService && initialService.length) {
      setLocalService(initialService);
    }
  }, [data?.state?.productData?.service?.length, initialService]);

  useEffect(() => {
    console.log("Service:", service);
  }, [service]);

  const handleAddTeamDetail = () => {
    const newTeam = {
      photo: null,
      name: "",
      about: "",
      amenities: [],
      price: "",
    };
    setLocalService([...service, newTeam]);
  };

  const handlePhotoChange = (event, index) => {
    const newTeams = [...service];
    newTeams[index].photo = event.target.files[0];
    setLocalService(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...service];
    newTeams[index][field] = event.target.value;
    setLocalService(newTeams);
  };

  const handleCancelImage = (index) => {
    const newTeams = [...service];
    newTeams[index].photo = null;
    setLocalService(newTeams);
  };

  const handleCancelTeam = (index) => {
    if (service.length > 1) {
      const newTeams = [...service];
      newTeams.splice(index, 1);
      setLocalService(newTeams);
    }
  };

  const handleEditService = (index) => {
    setShowServices(true);
    setIndexofServices(index);
  };

  const hideAddPhotoIcon = (team) => {
    return team.photo ? { display: "none" } : {};
  };

  return (
    <div className={style.addTeamDetailDiv}>
      <label htmlFor="Teams">Teams</label>
      {isEditMode ? (
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
                <input
                  type="file"
                  id={`uploadteamPhoto-${index}`}
                  style={{ display: "none" }}
                  onChange={(event) => handlePhotoChange(event, index)}
                />
                {team.photo && (
                  <div>
                    <img
                      // src={URL.createObjectURL(team.photo)}
                      alt={`Team ${index} Photo`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                      }}
                    />
                    <span
                      className={style.cancelImageUpload}
                      onClick={() => handleCancelImage(index)}
                    >
                      <img src={cross} alt="" />
                    </span>
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
                <input
                  type="text"
                  placeholder="Designation"
                  value={team.price}
                  onChange={(event) => handleInputChange(event, index, "price")}
                />
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
                <input
                  type="file"
                  id={`uploadteamPhoto-${index}`}
                  style={{ display: "none" }}
                  onChange={(event) => handlePhotoChange(event, index)}
                />
                {team.photo && (
                  <div>
                    <img
                      // src={URL.createObjectURL(team.photo)}
                      alt={`Team ${index} Photo`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                      }}
                    />
                    <span
                      className={style.cancelImageUpload}
                      onClick={() => handleCancelImage(index)}
                    >
                      <img src={cross} alt="" />
                    </span>
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
