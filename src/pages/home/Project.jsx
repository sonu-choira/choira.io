import React, { useState } from "react";
import "../home/project.css";
import logo from "../../assets/img/logo-choira.svg";
import o4 from "../../assets/img/o4.png";
import Slider from "../../components/project-slider/Slider";
import Menu from "../../components/project-slider/Menu";
import { useNavigate } from "react-router-dom";

// import arrow from "../../assets/img/sliderImg/arrow.png";

function Project() {
  const [combinedClasses, setCombinedClasses] = useState("list");
  const [showMenu, setShowMenu] = useState(false);
  const smallNav = () => {
    // Check if "smalllist" class is present in the current state
    if (combinedClasses.includes("smalllist")) {
      // If present, remove "smalllist"
      setCombinedClasses((prevClasses) =>
        prevClasses.replace(" smalllist", "")
      );
    } else {
      // If not present, add "smalllist"
      setCombinedClasses((prevClasses) => prevClasses + " smalllist");
    }
  };
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div
        className="wrapper"
        // style={{ backgroundImage: "url(images/image-17.png)" }}
      >
        <div className="overlay"></div>
        <div className="navbar">
          <div>
            <img src={logo} alt="Choira Logo" style={{ cursor: "pointer" }} />
          </div>
          <div className={combinedClasses}>
            <h3>Home</h3>
            <h3>Soundtracks</h3>
            <h3>Jam</h3>
            <h3 onClick={gotoDashboard}>Projects</h3>
            <h3>Signin</h3>

            <img className="o4" src={o4} alt="" onClick={smallNav} />
          </div>
        </div>
        <div className="main-div">
          <div className="main">
            {showMenu ? (
              <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
            ) : (
              <Slider showMenu={showMenu} setShowMenu={setShowMenu} />
            )}

            {/* <Menu /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
