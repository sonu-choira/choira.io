import React from "react";
import { MdAddAPhoto } from "react-icons/md";

export default function Team() {
  return (
    <div key={index} className="addTeamDetailMainDiv">
      <div>
        <label htmlFor={`uploadteamPhoto-${index}`}>
          <MdAddAPhoto />
        </label>
        <input
          type="file"
          id={`uploadteamPhoto-${index}`}
          style={{ display: "none" }}
          onChange={(event) => handlePhotoChange(event, index)}
        />
        {team.photo && (
          <img
            src={URL.createObjectURL(team.photo)}
            alt={`Team ${index} Photo`}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
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
          onChange={(event) => handleInputChange(event, index, "profile")}
        />
      </div>
    </div>
  );
}
