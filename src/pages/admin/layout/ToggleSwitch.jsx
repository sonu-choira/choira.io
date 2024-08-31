import React, { useState } from "react";
import "./ToggleSwitch.css"; // Import the CSS for styling

const ToggleSwitch = ({ userType = "admin", setUserType }) => {
  // const [active, setActive] = useState("admin");

  const toggleSwitch = (option) => {
    setUserType(option);
  };

  return (
    <div className={`toggle-container ${userType}`}>
      <div className="toggle-active"></div>
      <div className="toggle-option" onClick={() => toggleSwitch("admin")}>
        Admin
      </div>
      <div className="toggle-option" onClick={() => toggleSwitch("sub-admin")}>
        Sub-Admin
      </div>
    </div>
  );
};

export default ToggleSwitch;