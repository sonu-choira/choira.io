import React, { useEffect, useState } from "react";
import style from "../produce/dashboard.module.css";
import logo from "../../assets/img/logo-choira.svg";
import create from "../../assets/img/dashboard_img/create.svg";
import produce from "../../assets/img/dashboard_img/produce_selected.svg";
import community from "../../assets/img/dashboard_img/community.svg";
import tanmay from "../../assets/img/dashboard_img/tanmay.png";
import ProfileEdit from "./ProfileEdit";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineTeam } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

function WebDashboard2({ tabCount, setTabCount, navCount }) {
  const navigate = useNavigate();
  let { navOption: pageData } = useParams();

  useEffect(() => {
    if (pageData === "User") {
      setTabCount(1);
    } else if (pageData === "Teams") {
      setTabCount(2);
    } else if (pageData === "Apps&More") {
      setTabCount(3);
    } else if (pageData === "Bookings") {
      setTabCount(4);
    }
  }, [pageData, setTabCount]);

  useEffect(() => {
    if (navCount) {
      setTabCount(navCount);
    }
  }, [navCount, setTabCount]);

  const [editProfile, setEditProfile] = useState(false);
  const editProfiletab = () => {
    setEditProfile(true);
  };

  const gotoAllStudioDetailPage = () => {
    setTabCount(3);
    navigate("/adminDashboard/Apps&More/studio");
  };

  const gotoBookings = () => {
    setTabCount(4);
    navigate("/adminDashboard/Bookings/studio");
  };

  const gotoStudios = () => {
    setTabCount(1);
    navigate("/adminDashboard/User");
  };

  const gotoTeams = () => {
    setTabCount(2);
    navigate("/adminDashboard/Teams/StudioPatners");
  };

  return (
    <>
      <ProfileEdit editProfile={editProfile} setEditProfile={setEditProfile} />
      <div className={style.sidebar}>
        <div className={style.sidebarMain}>
          <div className={style.section1}>
            <div>
              <img src={logo} alt="" />
            </div>
            <div className={style.community}>
              <div
                className={tabCount === 1 ? style.tabActive : style.padding}
                onClick={gotoStudios}
              >
                <FaRegUser style={{ fontSize: "1vmax" }} />
                User
              </div>
              <div
                className={tabCount === 2 ? style.tabActive : style.padding}
                onClick={gotoTeams}
              >
                <AiOutlineTeam style={{ fontSize: "1.3vmax" }} />
                Teams
              </div>
              <div
                className={tabCount === 3 ? style.tabActive : style.padding}
                onClick={gotoAllStudioDetailPage}
              >
                <img src={produce} alt="" />
                App & More
              </div>
              <div
                className={tabCount === 4 ? style.tabActive : style.padding}
                onClick={gotoBookings}
              >
                <img src={produce} alt="" />
                Bookings
              </div>
            </div>
          </div>

          <div className={style.section2}>
            <div
              className={style.section2Main}
              style={{ cursor: "pointer" }}
              onClick={editProfiletab}
            >
              <div>
                <img src={tanmay} alt="" />
              </div>
              <div>
                <h5>Tanmay</h5> <br />
                <h6>Music Producer</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WebDashboard2;
