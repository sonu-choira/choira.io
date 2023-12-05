import React from "react";
import "../produce/newproject.css";
import logo from "../../assets/img/logo-choira.svg";

import { useNavigate } from "react-router-dom";
import CreateNewProject from "../../components/chooseProject/CreateNewProject";
import ChooseType from "../../components/chooseProject/ChooseType";
import ChooseGenre from "../../components/chooseProject/ChooseGenre";
import ChooseMusicians from "../../components/chooseProject/ChooseMusicians";

function NewProject() {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
  };
  return (
    <>
      <form>
        <div className="project-wrapper">
          <div className="project-navbar">
            <img src={logo} onClick={gotoHome} alt="" />
          </div>
          <div className="project-main">
            {/* <CreateNewProject /> */}
            {/* <ChooseType /> */}
            {/* <ChooseGenre /> */}
            <ChooseMusicians />
          </div>
        </div>
      </form>
    </>
  );
}

export default NewProject;
