import React, { useState } from "react";
import "../produce/dashboard.css";
import logo from "../../assets/img/logo-choira.svg";
import create from "../../assets/img/dashboard_img/create.svg";
import produce from "../../assets/img/dashboard_img/produce_selected.svg";
import community from "../../assets/img/dashboard_img/community.svg";
import tanmay from "../../assets/img/dashboard_img/tanmay.png";
import ProfileEdit from "./ProfileEdit";

function WebDashboard() {
  const [editProfile, setEditProfile] = useState(false);
  const editProfiletab = () => {
    setEditProfile(true);
  };
  return (
    <>
      <ProfileEdit editProfile={editProfile} setEditProfile={setEditProfile} />
      <div className="sidebar">
        <div className="sidebar-main">
          <div className="section1">
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="create-btn">
              <button>
                <img src={create} alt="" />
                Create
              </button>
            </div>
            <div className="community">
              <div>
                <img src={community} alt="" />
                Community
              </div>
              <div>
                <img src={produce} alt="" />
                Produce
              </div>
            </div>
          </div>

          <div
            className="section2"
            style={{ cursor: "pointer" }}
            onClick={editProfiletab}
          >
            <div className="section2-main">
              <div>
                <img src={tanmay} alt="" />
              </div>
              <div>
                <h5>Tanmay</h5>
                <h6>Music Producer</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WebDashboard;
