import React from "react";
import user from "../../assets/img/dashboard_img/user.jfif";
import clip from "../../assets/img/dashboard_img/clip.svg";
import smile from "../../assets/img/dashboard_img/smile.svg";
import plane from "../../assets/img/dashboard_img/plane.svg";

function Message() {
  return (
    <>
      <div className="choira-test-project-section-main-2">
        <div className="message_section">
          <div>
            <div>
              <img src={user} alt="" />
            </div>
            <div>
              <h2>Jackson</h2>
              <h6>Artist Relationship Manager</h6>
            </div>
          </div>
          <div></div>
          <div>
            <input type="text" placeholder="Write your message..." />
            <div>
              <img src={smile} alt="" />
              <img src={clip} alt="" />
              <img src={plane} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
