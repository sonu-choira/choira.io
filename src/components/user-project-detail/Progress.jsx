import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiRecordCircleFill } from "react-icons/ri";
import tickbtn from "../../assets/img/tickbtn.png";
import { useLocation, useNavigate } from "react-router-dom";

const CountdownTimer = ({ projectDeliveryDate }) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const deliveryDate = new Date(projectDeliveryDate).getTime();
    const timeRemaining = deliveryDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
      days: days < 10 ? `0${days}` : days,
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="progress_main_div_timer">
      <div>
        <b>{timeRemaining.days}</b>
        <div>Days</div>
      </div>
      |
      <div>
        <b>{timeRemaining.hours}</b>
        <div>Hours</div>
      </div>
      |
      <div>
        <b>{timeRemaining.minutes}</b>
        <div>Minutes</div>
      </div>
      |
      <div>
        <b>{timeRemaining.seconds}</b>
        <div>Seconds</div>
      </div>
    </div>
  );
};

function Progress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { userProjectData } = state || {};
  const { ProjectDeliveryDate } = userProjectData || {};
  // project status
  const [created, setCreated] = useState(true);
  const [production, setProdection] = useState(true);
  const [review, setReview] = useState(false);
  const [complete, setComplete] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Initial");
  useEffect(() => {
    if (complete && review && production && created == true) {
      setCurrentStatus("completed");
    } else if (review && production && created == true) {
      setCurrentStatus("review");
    } else if (production && created == true) {
      setCurrentStatus("under production");
    } else if (created == true) {
      setCurrentStatus("created");
    } else {
      setCurrentStatus("Initial");
    }
  }, []);

  const getColorStyle = (isActive) => {
    return isActive
      ? { color: window.innerWidth >= 768 ? "black" : "white" }
      : {};
  };

  return (
    <>
      <div className="choira-test-project-section-main-2">
        <div className="progress-div">
          <div className="progress_main_div">
            <div>
              <div>Progress</div>
              <div>Time left:</div>
            </div>
            <div>
              <div> {currentStatus} </div>
              <CountdownTimer projectDeliveryDate={ProjectDeliveryDate} />
            </div>
          </div>

          {/* timer mobile view  */}
          <div className="mob_progress_main_div">
            <div>
              <div>Time left:</div>
              <CountdownTimer projectDeliveryDate={ProjectDeliveryDate} />
            </div>
            <div>
              <div>Progress</div>
              <div> {currentStatus} </div>
            </div>
          </div>
          <div className="progress_main_div_content">
            <div>
              <div>
                <div>
                  <div>
                    {created ? (
                      <div>
                        <FaCheckCircle style={{ color: "#ffc701" }} />{" "}
                      </div>
                    ) : (
                      <RiRecordCircleFill style={{ color: "#ffc701" }} />
                    )}
                  </div>
                  <div style={getColorStyle(created)}>Created</div>
                </div>
                <div
                  style={{
                    borderLeft: created ? "5px solid #ffc701" : "",
                    color: created
                      ? window.innerWidth >= 768
                        ? "black"
                        : "white"
                      : "",
                  }}
                >
                  This is the initial stage where you create a new project and
                  add the details such as project name, genre, and other project
                  specifications. You will also have the option to select from
                  our team of music professionals to work with you.
                </div>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <div>
                    {created && production ? (
                      <FaCheckCircle style={{ color: "#ffc701" }} />
                    ) : created ? (
                      <RiRecordCircleFill style={{ color: "#ffc701" }} />
                    ) : (
                      <RiRecordCircleFill />
                    )}
                  </div>
                  <div style={getColorStyle(production)}>Under Production</div>
                </div>
                <div
                  style={{
                    borderLeft: production ? "5px solid #ffc701" : "",
                    color: production
                      ? window.innerWidth >= 768
                        ? "black"
                        : "white"
                      : "",
                  }}
                >
                  Once you have created the project, our team of music
                  professionals will start working on it. During this phase,
                  they will produce the music, mix and master it, and make
                  necessary edits to create the final version of your music.
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    {created && production && review ? (
                      <FaCheckCircle style={{ color: "#ffc701" }} />
                    ) : production ? (
                      <RiRecordCircleFill style={{ color: "#ffc701" }} />
                    ) : (
                      <RiRecordCircleFill />
                    )}
                  </div>
                  <div style={getColorStyle(review)}>Ready for Review</div>
                </div>
                <div
                  style={{
                    borderLeft: review ? "5px solid #ffc701" : "",
                    color: review
                      ? window.innerWidth >= 768
                        ? "black"
                        : "white"
                      : "",
                  }}
                >
                  After the production is completed, your project will move to
                  the review phase. Here, you can listen to the final version of
                  your music and provide feedback or suggestions for any changes
                  you want to make. <br />
                  {review ? (
                    <button>
                      Request Revision <img src={tickbtn} alt="" />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    {created && production && review && complete ? (
                      <FaCheckCircle style={{ color: "#ffc701" }} />
                    ) : review ? (
                      <RiRecordCircleFill style={{ color: "#ffc701" }} />
                    ) : (
                      <RiRecordCircleFill />
                    )}
                  </div>
                  <div style={getColorStyle(complete)}>Completed</div>
                </div>
                <div
                  style={{
                    borderLeft: complete ? "5px solid #ffc701" : "",
                    color: complete
                      ? window.innerWidth >= 768
                        ? "black"
                        : "white"
                      : "",
                  }}
                >
                  Once you have reviewed and approved the final version of your
                  music, the project will be marked as completed. You can then
                  download the final version and use it for your intended
                  purpose.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Progress;
