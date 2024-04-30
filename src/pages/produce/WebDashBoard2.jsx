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

function WebDashboard2({ tabCount, setTabCount, navCount }) {
  let { navOption: pageData } = useParams();

  useEffect(() => {
    if (pageData == "Studios") {
      setTabCount(1);
    } else if (pageData == "Teams") {
      setTabCount(2);
    } else if (pageData == "Apps&More") {
      setTabCount(3);
    } else if (pageData == "Bookings") {
      setTabCount(4);
    }
  }, [pageData]);

  if (navCount) {
    setTabCount(navCount);
    // alert(navCount);
  }

  const [editProfile, setEditProfile] = useState(false);
  const editProfiletab = () => {
    setEditProfile(true);
  };
  const navigate = useNavigate();
  const gotoAllStudioDetailPage = () => {
    // navigate("/allStudioPageDetailsPage");
    if (navCount) {
      navigate("/adminDashboard/Apps&More/studio");
    } else {
      setTabCount(3);
      navigate("/adminDashboard/Apps&More/studio");
    }
  };
  const gotoBookings = () => {
    if (navCount) {
      navigate("/adminDashboard/Bookings/studio");
    } else {
      setTabCount(4);
      navigate("/adminDashboard/Bookings/studio");
    }
  };
  const gotoStudios = () => {
    // navigate("/studios");
    if (navCount) {
      navigate("/adminDashboard/Studios");
    } else {
      setTabCount(1);
      navigate("/adminDashboard/Studios");
    }
  };

  // useEffect(() => {
  // if(tabCount)
  // }, [tabCount])

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
                <img src={community} alt="" />
                Studios
              </div>
              <div
                className={tabCount === 2 ? style.tabActive : style.padding}
                onClick={() => {
                  if (navCount) {
                    navigate("/adminDashboard/Teams/Arm");
                  } else {
                    setTabCount(2);
                    navigate("/adminDashboard/Teams/Arm");
                  }
                }}
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
