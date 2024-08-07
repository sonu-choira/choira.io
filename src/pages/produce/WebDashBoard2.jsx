import React, { useEffect, useState } from "react";
import style from "../produce/dashboard.module.css";
import logo from "../../assets/img/logo-choira.svg";
import create from "../../assets/img/dashboard_img/create.svg";
import produce from "../../assets/img/dashboard_img/produce_selected.svg";
import community from "../../assets/img/dashboard_img/community.svg";
import tanmay from "../../assets/img/dashboard_img/tanmay.png";
import ProfileEdit from "./ProfileEdit";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlineTeam } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useLocale } from "antd/es/locale";
import { LuHome } from "react-icons/lu";
import { TbSpeakerphone } from "react-icons/tb";
import { PiChartBarLight } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { partnerAccess } from "../../config/partnerAccess";
function WebDashboard2({ tabCount, setTabCount, navCount }) {
  const navigate = useNavigate();

  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("Overview")) {
      setTabCount(1);
    } else if (pathname.includes("User")) {
      setTabCount(2);
    } else if (pathname.includes("Teams")) {
      setTabCount(3);
    } else if (pathname.includes("Apps&More")) {
      setTabCount(4);
    } else if (pathname.includes("Bookings")) {
      setTabCount(5);
    } else if (pathname.includes("Promotions")) {
      setTabCount(6);
    }
  }, [pathname, setTabCount]);

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
    setTabCount(4);
    navigate("/adminDashboard/Apps&More/studio");
  };

  const gotoBookings = () => {
    setTabCount(5);
    navigate("/adminDashboard/Bookings/studio");
  };
  const gotoPromotions = () => {
    setTabCount(6);
    navigate("/adminDashboard/Promotions/Banner");
  };

  const gotoOverview = () => {
    setTabCount(1);
    navigate("/adminDashboard/Overview");
  };
  const gotoStudios = () => {
    setTabCount(2);
    navigate("/adminDashboard/User");
  };

  const gotoTeams = () => {
    setTabCount(3);
    navigate("/adminDashboard/Teams/StudioPartners");
  };
  let data = localStorage.getItem("adminData");
  let adminData = JSON.parse(data);

  const tabs = [
    {
      id: 1,
      icon: <LuHome style={{ fontSize: "1vmax" }} />,
      label: "DashBoard",
      onClick: gotoOverview,
    },
    {
      id: 2,
      icon: <FaRegUser style={{ fontSize: "1vmax" }} />,
      label: "User",
      onClick: gotoStudios,
    },
    {
      id: 3,
      icon: <AiOutlineTeam style={{ fontSize: "1.3vmax" }} />,
      label: "Teams",
      onClick: gotoTeams,
    },
    {
      id: 4,
      icon: <PiChartBarLight style={{ fontSize: "1.3vmax" }} />,
      label: "App & More",
      onClick: gotoAllStudioDetailPage,
    },
    {
      id: 5,
      icon: <CiCalendar style={{ fontSize: "1.3vmax" }} />,
      label: "Bookings",
      onClick: gotoBookings,
    },
    {
      id: 6,
      icon: <TbSpeakerphone style={{ fontSize: "1vmax" }} />,
      label: "Promotions",
      onClick: gotoPromotions,
    },
  ];
  const [navAccess, setnavAccess] = useState(
    partnerAccess ? Object.keys(partnerAccess) : ""
  );
  console.log("------------------------------}}}}}}}}>>");
  console.log(tabs.map((tab) => tab.label.replace(/ /g, "").toLowerCase()));

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
              {navAccess
                ? navAccess.map((data) =>
                    tabs.map(
                      (tab) =>
                        tab.label.toLowerCase().replace(/ /g, "") == data && (
                          <div
                            key={tab.id}
                            className={
                              tabCount === tab.id
                                ? style.tabActive
                                : style.padding
                            }
                            onClick={tab.onClick}
                          >
                            {tab.icon}
                            {tab.label}
                          </div>
                        )
                    )
                  )
                : tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={
                        tabCount === tab.id ? style.tabActive : style.padding
                      }
                      onClick={tab.onClick}
                    >
                      {tab.icon}
                      {tab.label}
                    </div>
                  ))}
            </div>
          </div>

          <div className={style.section2}>
            <div
              className={style.section2Main}
              style={{ cursor: "pointer" }}
              onClick={editProfiletab}
            >
              <div>
                <img src={adminData?.Image || tanmay} alt="" />
              </div>
              <div>
                <h5>{adminData?.name || "Admin"}</h5> <br />
                {/* <h6>{adminData?.role || "admin"}</h6> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WebDashboard2;
