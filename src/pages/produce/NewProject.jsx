import React, { useEffect } from "react";
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
  // all cards states are managed here
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardGenre, setSelectedCardGenre] = useState(null);
  const [selectedFullProductionTeam, setSelectedFullProductionTeam] =
    useState(false);
  const [selectedMusicians, setSelectedMusicians] = useState([]);
  const [minRange, setMinRange] = useState(1000);
  const [maxRange, setMaxRange] = useState(500000);
  const [checkIfBudgetIsSelected, setCheckIfBudgetIsSelected] = useState(false);
  const [links, setLinks] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [projectDetails, setProjectDetails] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDatesAndPrices, setSelectedDatesAndPrices] = useState([]);

  // all cards states are ends here

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
  useEffect(() => {
    const storedData = localStorage.getItem("userProjectData");
    const storedStep = localStorage.getItem("currentStep");

    if (storedData) {
      setUserProjectData(JSON.parse(storedData));
    }

    if (storedStep) {
      setCurrentStep(parseInt(storedStep, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userProjectData", JSON.stringify(userProjectData));
    localStorage.setItem("currentStep", currentStep.toString());
  }, [userProjectData, currentStep]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handelBack = () => {
    setCurrentStep(currentStep - 1);
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
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            )}
            {currentStep === 2 && (
              <ChooseGenre
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                setSelectedCardGenre={setSelectedCardGenre}
                selectedCardGenre={selectedCardGenre}
              />
            )}
            {currentStep === 3 && (
              <ChooseMusicians
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                selectedFullProductionTeam={selectedFullProductionTeam}
                setSelectedFullProductionTeam={setSelectedFullProductionTeam}
                selectedMusicians={selectedMusicians}
                setSelectedMusicians={setSelectedMusicians}
              />
            )}
            {currentStep === 4 && (
              <ChooseBudget
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                minRange={minRange}
                maxRange={maxRange}
                setMinRange={setMinRange}
                setMaxRange={setMaxRange}
                checkIfBudgetIsSelected={checkIfBudgetIsSelected}
                setCheckIfBudgetIsSelected={setCheckIfBudgetIsSelected}
              />
            )}
            {currentStep === 5 && (
              <ShareLink
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                links={links}
                setLinks={setLinks}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                projectDetails={projectDetails}
                setProjectDetails={setProjectDetails}
              />
            )}
            {currentStep === 6 && (
              <ProjectDelivery
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedDatesAndPrices={selectedDatesAndPrices}
                setSelectedDatesAndPrices={setSelectedDatesAndPrices}
              />
            )}
            {currentStep === 7 && (
              <GoodName
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
              />
            )}
            {currentStep === 8 && (
              <AlmostDone
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 9 && (
              <BookSession
                onNext={handleNext}
                onBack={handelBack}
                setUserProjectData={setUserProjectData}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 10 && (
              <ConnectInFewSecond
                onNext={handleNext}
                onBack={handelBack}
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
