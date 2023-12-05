import React from "react";
import dancer from "../../assets/img/dashboard_img/dance.gif";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function CreateNewProject() {
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div className="project-div1">
        <div>
          <h3>Create your dream project in just 5 minutes</h3>
        </div>
        <div>
          <p>
            Let's begin! We'll guide you step-by-step to create the perfect
            song. Just pick & fill in some details, and click "continue." You
            can go <br />
            "back" to make changes any time, before checking out.
          </p>
        </div>
        <div>
          <img src={dancer} alt="" />
        </div>
        <div>
          <button onClick={gotoDashboard}>
            <FaAngleLeft /> Back
          </button>
          <button>
            Continue
            <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
