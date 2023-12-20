import React, { useState } from "react";
import "../NewLandingPage/LandingPage.css";
import logo from "../../assets/img/logo-choira.svg";
import o4 from "../../assets/img/o4.png";
import page1footer from "../../assets/img/company-footer.svg";
import stripe from "../../assets/img/stripe.svg";
import phonepay from "../../assets/img/phonepe.svg";
import nbc from "../../assets/img/nbc.svg";
import cbs from "../../assets/img/cbs.svg";
import nasa from "../../assets/img/nasa.svg";
import primeVideo from "../../assets/img/prime-video.svg";
import display from "../../assets/img/landingPageImg/future_of_music.png";
import talented from "../../assets/img/landingPageImg/talented.svg";
import trusted from "../../assets/img/landingPageImg/trusted.png";
import best from "../../assets/img/landingPageImg/best.png";
import produce from "../../assets/img/landingPageImg/Produce.png";
import ai from "../../assets/img/landingPageImg/AI.png";
// import ai from "../../assets/img/landingPageImg/AI.png";;sonu333
import jamming from "../../assets/img/landingPageImg/Jamming.png";
import studio from "../../assets/img/landingPageImg/studio.png";

import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [combinedClasses, setCombinedClasses] = useState("list");

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
      <div id="landing-page1">
        <div className="navbar">
          <div>
            <img src={logo} alt="Choira Logo" style={{ cursor: "pointer" }} />
          </div>
          <div className={combinedClasses}>
            <h3>Home</h3>
            <h3>Studio</h3>
            <h3>Jamming</h3>
            <h3 onClick={gotoDashboard}>AI Music Gen</h3>
            <h3>Signin</h3>

            <img
              className="o4"
              style={{ cursor: "pointer" }}
              src={o4}
              alt=""
              onClick={smallNav}
            />
          </div>
        </div>
        <div className="page1-main">
          <div>
            <div className="page1-main-content">
              <div>
                <h1>
                  <span>Music</span> Ecosystem <br />
                  for the <span>Digital</span> Age
                </h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Metus diam eget mollis
                  eget in dignissim nibh. In nibh lectus enim eu adipiscing eget
                  pulvinar.
                </p>
              </div>
              <div>
                <button>Get Started</button>
                <p style={{ cursor: "pointer" }}>watch video {">"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page1-footer">
          <div></div>
          <div>
            <div>
              <img src={stripe} alt="" />
            </div>
            <div>
              <img src={phonepay} alt="" />
            </div>
            <div>
              <img src={nbc} alt="" />
            </div>
            <div>
              <img src={cbs} alt="" />
            </div>
            <div>
              <img src={nasa} alt="" />
            </div>
            <div>
              <img src={primeVideo} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="landing-page-2">
        <div className="landing-page-2-main">
          <div>
            <div>
              <div className="landing-page-2-content">
                <div>
                  <span>Choira create</span>
                </div>
                <div>
                  <p>
                    Sound like a pro. Create <br />
                    Commercial quality tracks.
                  </p>
                </div>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Sed id id eget
                    volutpat. Mauris amet leo vulputate massa ultrices velit.
                    Vel sed quam mattis integer consequat. Consectetur odio
                    risus venenatis urna non nulla sed. Ultrices tincidunt magna
                    ut lacus enim ac consequat. Vivamus vel massa elit gravida
                    hendrerit mi posuere velit. Suspendisse risu.
                  </p>
                </div>
                <div>
                  <button>create</button>
                </div>
              </div>
            </div>
            <div className="landing-page-2-img">
              <img src={produce} alt="" />
            </div>
          </div>
          <div className="landing-page2-bullets">
            <input type="radio" id="radioButton" name="radioGroup" />
          </div>
        </div>
      </div>
      <div className="landing-page-3">
        <div className="landing-page-3-main">
          <div>
            <h2>The Future of Music</h2>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
              mi tempor ut. Posuere nunc adipiscing fermentum br in. Sem
              ullamcorper venenatis ut metus.
            </p>
          </div>
          <div>
            <img src={display} alt="" />
          </div>
          <div>
            <button>open</button>
          </div>
        </div>
      </div>
      <div className="landing-page-4">
        <div className="landing-page-4-main">
          <div>
            <div>
              <div>
                <img src={talented} alt="" />
              </div>
              <div>
                <h3>Top talents</h3>
              </div>
            </div>
            <div>
              Work with award winning talents across the globe, we deliver an
              unparalleled combination of timeless expertise, proven results,
              long-term stability and trust.
            </div>
          </div>
          <div>
            <div>
              <div>
                <img src={trusted} alt="" />
              </div>
              <div>
                <h3>Trusted Studio Profiles</h3>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
                mi tempor ut. Posuere nunc adipiscing fermentum in. Sem
                ullamcorper venenatis ut metus. Leo tempor pellentesque eu.
              </p>
            </div>
          </div>
          <div>
            <div>
              <div>
                <img src={best} alt="" />
              </div>
              <div>
                <h3>Create the best</h3>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
                mi tempor ut. Posuere nunc adipiscing fermentum in. Sem
                ullamcorper venenatis ut metus. Leo tempor pellentesque eu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;