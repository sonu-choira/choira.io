import React from "react";
import "../produce/newproject.css";
import logo from "../../assets/img/logo-choira.svg";

import { useNavigate } from "react-router-dom";
import CreateNewProject from "../../components/chooseProject/CreateNewProject";
import ChooseType from "../../components/chooseProject/ChooseType";
import ChooseGenre from "../../components/chooseProject/ChooseGenre";
import ChooseMusicians from "../../components/chooseProject/ChooseMusicians";
import ChooseBudget from "../../components/chooseProject/ChooseBudget";
import ShareLink from "../../components/chooseProject/ShareLink";
import ProjectDelivery from "../../components/chooseProject/ProjectDelivery";
import GoodName from "../../components/chooseProject/GoodName";
import AlmostDone from "../../components/chooseProject/AlmostDone";

import BookSession from "../../components/chooseProject/BookSession";
import ConnectInFewSecond from "../../components/chooseProject/ConnectInFewSecond";
import { useState } from "react";

function NewProject() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    // Increment the current step when the user clicks "Continue"
    setCurrentStep(currentStep + 1);
  };
  // const [userProjectData, setUserProjectData] = useState({});

  const gotoHome = () => {
    navigate("/");
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="project-wrapper">
          <div className="project-navbar">
            <img src={logo} onClick={gotoHome} alt="" />
          </div>
          <div className="new-project-main">
            {currentStep === 0 && <CreateNewProject onNext={handleNext} />}
            {currentStep === 1 && <ChooseType onNext={handleNext} />}
            {currentStep === 2 && <ChooseGenre onNext={handleNext} />}
            {currentStep === 3 && <ChooseMusicians onNext={handleNext} />}
            {currentStep === 4 && <ChooseBudget onNext={handleNext} />}
            {currentStep === 5 && <ShareLink onNext={handleNext} />}
            {currentStep === 6 && <ProjectDelivery onNext={handleNext} />}
            {currentStep === 7 && <GoodName onNext={handleNext} />}
            {currentStep === 8 && <AlmostDone onNext={handleNext} />}
            {currentStep === 9 && <BookSession onNext={handleNext} />}
            {currentStep === 10 && <ConnectInFewSecond onNext={handleNext} />}
          </div>
        </div>
      </form>
    </>
  );
}

export default NewProject;
