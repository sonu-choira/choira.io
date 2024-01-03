import React from "react";
import user from "../../assets/img/dashboard_img/user.jfif";

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
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Message;
