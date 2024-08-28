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
import { MdAccessTime } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineRateReview } from "react-icons/md";
function WebDashboard2({ tabCount, setTabCount, navCount }) {
  const navigate = useNavigate();

  let { pathname } = useLocation();

  useEffect(() => {
    if (!navAccess) {
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
    } else if (navAccess) {
      if (pathname.includes("Overview")) {
        setTabCount(1);
      } else if (pathname.includes("MyStudio")) {
        setTabCount(2);
      } else if (pathname.includes("Bookings/AddSlotBooking")) {
        setTabCount(4);
      } else if (pathname.includes("/adminDashboard/Bookings")) {
        setTabCount(3);
      } else if (pathname.includes("ManageSlots")) {
        setTabCount(4);
      } else if (pathname.includes("Transactions")) {
        setTabCount(5);
      } else if (pathname.includes("Reviews")) {
        setTabCount(6);
      }
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

  const goToPage = (tab, mainPage, subPage = "") => {
    let subPagelink = subPage ? `/${subPage}` : "";
    setTabCount(tab);
    navigate(`/adminDashboard/${mainPage}${subPagelink}`);
  };
  let data = localStorage.getItem("adminData");
  let adminData = JSON.parse(data);

  const tabs = [
    {
      id: 1,
      icon: <LuHome style={{ fontSize: "1vmax" }} />,
      label: "DashBoard",
      onClick: () => goToPage(1, "Overview"),
    },
    {
      id: 2,
      icon: <FaRegUser style={{ fontSize: "1vmax" }} />,
      label: "User",
      onClick: () => goToPage(2, "User"),
    },
    {
      id: 3,
      icon: <AiOutlineTeam style={{ fontSize: "1.3vmax" }} />,
      label: "Teams",
      onClick: () => goToPage(3, "Teams", "StudioPartners"),
    },
    {
      id: 4,
      icon: <PiChartBarLight style={{ fontSize: "1.3vmax" }} />,
      label: "App & More",
      onClick: () => goToPage(4, "Apps&More", "studio"),
    },
    {
      id: 5,
      icon: <CiCalendar style={{ fontSize: "1.3vmax" }} />,
      label: "Bookings",
      onClick: () => goToPage(5, "Bookings", "studio"),
    },
    {
      id: 6,
      icon: <TbSpeakerphone style={{ fontSize: "1vmax" }} />,
      label: "Promotions",
      onClick: () => goToPage(6, "Promotions", "Banner"),
    },
  ];
  const [navAccess, setnavAccess] = useState(
    partnerAccess ? Object.keys(partnerAccess) : ""
  );
  console.log("------------------------------}}}}}}}}>>", partnerAccess);
  console.log(tabs.map((tab) => tab.label.replace(/ /g, "").toLowerCase()));

  let partnersTabs = [
    {
      id: 1,
      icon: <LuHome style={{ fontSize: "1vmax" }} />,
      label: "DashBoard",
      onClick: () => goToPage(1, "Overview"),
    },
    {
      id: 2,
      icon: <PiChartBarLight style={{ fontSize: "1.3vmax" }} />,
      label: "My Studio",
      onClick: () => goToPage(2, "MyStudio"),
    },
    {
      id: 3,
      icon: <CiCalendar style={{ fontSize: "1.3vmax" }} />,
      label: "Bookings",
      onClick: () => goToPage(3, "Bookings", "studio"),
    },
    {
      id: 4,
      icon: <MdAccessTime style={{ fontSize: "1.3vmax" }} />,
      label: "Manage Slots",
      onClick: () => goToPage(4, "ManageSlots"),
    },
    {
      id: 5,
      icon: <CiCreditCard1 style={{ fontSize: "1.3vmax" }} />,
      label: "Transactions",
      onClick: () => goToPage(5, "Transactions"),
    },

    {
      id: 6,
      icon: <MdOutlineRateReview style={{ fontSize: "1.3vmax" }} />,
      label: "Reviews",
      onClick: () => goToPage(6, "Reviews"),
    },
  ];
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
                ? navAccess.map((data, index) =>
                    partnersTabs.map(
                      (tab) =>
                        tab.label.toLowerCase().replace(/ /g, "") ==
                          data.toLowerCase().replace(/ /g, "") && (
                          <div
                            key={index}
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
