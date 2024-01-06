import React from "react";

const AlmostDone = ({ onNext, setUserProjectData, setCurrentStep }) => {
  const ConnectNow = () => {
    setCurrentStep(10);
  };
  const ShedualLater = () => {
    setCurrentStep(9);
  };
  return (
    <>
      <div className="project-div2">
        <div className="mob-awsome">
          <h2> Awesome! We are almost done</h2>
        </div>
        <div className="almostDone-div">
          <div>
            <p>
              {"{Project name}"} has been initialised and our Artist
              Relationship Manager (ARM) will get in touch with you for more
              updates regarding your project. Would you prefer joining now? If
              yes, <br /> we can schedule one in the next 60 seconds. <br />
              <br />
              Alternatively, you can also pick a preferred slot as per your
              <br />
              convenience.
            </p>
          </div>
        </div>

        <div className="almostDone-btn">
          <button className="almostDone-btn1" onClick={ShedualLater}>
            Schedule for later
          </button>
          <button onClick={ConnectNow}>Connect now</button>
        </div>
      </div>
    </>
  );
};

export default AlmostDone;
