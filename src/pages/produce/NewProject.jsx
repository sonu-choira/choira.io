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
  const [connectedPersonName, setConnectedPersonName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userProjectData, setUserProjectData] = useState({
    TypeOfMusic: "",
    GenreOfMusic: "",
    MusicianForProject: [],
    Budget: "",
    LinksForSimilarTrack: [],
    DemoFiles: [],
    DetailsOfProject: "",
    ProjectDeliveryDate: "",
    ExtraAmountToPay: "",
    NameOFProject: "",
    ConnectedPerson: connectedPersonName,
    TimeSlots: {
      SelectedSlots: "",
      SelectedDate: "",
      BookSessionMonth: "",
    },
  });

  const handleNext = () => {
    // Increment the current step when the user clicks "Continue"
    setCurrentStep(currentStep + 1);
    // alert(JSON.stringify(userProjectData, null, 2));
  };
  // const [userProjectData, setUserProjectData] = useState({});
  const handleUserProjectDataUpdate = () => {
    // This function will be called by the child component
    // when userProjectData is updated
    navigate("/choiratest", { state: { userProjectData } });
  };
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
            {currentStep === 0 && (
              <CreateNewProject
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 1 && (
              <ChooseType
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 2 && (
              <ChooseGenre
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 3 && (
              <ChooseMusicians
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 4 && (
              <ChooseBudget
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 5 && (
              <ShareLink
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 6 && (
              <ProjectDelivery
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 7 && (
              <GoodName
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 8 && (
              <AlmostDone
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 9 && (
              <BookSession
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 10 && (
              <ConnectInFewSecond
                onNext={handleNext}
                setUserProjectData={setUserProjectData}
                userProjectData={userProjectData}
                onUserProjectDataUpdate={handleUserProjectDataUpdate}
                setConnectedPersonName={setConnectedPersonName}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default NewProject;
