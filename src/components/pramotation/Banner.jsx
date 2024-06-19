import React, { useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { RiDragMove2Fill } from "react-icons/ri";
import test from "../../assets/img/herobg2.png";
import upload from "../../assets/upload.svg";
import Button from "../../pages/admin/layout/Button";

function Banner() {
  const [mainBannerData, setMainBannerData] = useState([
    {
      imgUrl: test,
      url: "www.sonu.com",
    },
    {
      imgUrl: test,
      url: "www.sonu.com",
    },
    {
      imgUrl: test,
      url: "www.sonu.com",
    },
  ]);
  return (
    <>
      <div className={style.bannerPage}>
        <div>
          <span>
            Main Banner: <FaPencilAlt />
          </span>
          <div className={style.bannerMain}>
            {mainBannerData.map((data, index) => (
              <div className={style.bannerMainContent} key={index}>
                <div>
                  <img src={data.imgUrl} alt="" />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Type your URL"
                    value={data.url}
                  />
                </div>
                <div>
                  <RiDragMove2Fill />
                </div>
              </div>
            ))}
          </div>
          <br />
          <br />
          <div className={style.bannerMainContent} style={{ width: "95%" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
              htmlFor="mainBanner"
            >
              <label htmlFor="mainBanner">
                <img
                  src={upload}
                  alt=""
                  // style={{ width: "50%", height: "50%" }}
                />
              </label>
              <input type="file" id="mainBanner" style={{ display: "none" }} />
            </label>
            <div>
              <input type="text" placeholder="Type your URL" />
            </div>
            <div>
              <Button name={"Add"} />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <span>
            Exclusive Banner: <FaPencilAlt />
          </span>
          <div className={style.bannerMain}>
            <div className={style.bannerMainContent}>
              <div>
                <img src={test} alt="" />
              </div>
              <div>
                <input type="text" placeholder="Type your URL" />
              </div>
              <div>
                <RiDragMove2Fill />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className={style.bannerMainContent} style={{ width: "95%" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
              htmlFor="mainBanner"
            >
              <label htmlFor="mainBanner">
                <img
                  src={upload}
                  alt=""
                  // style={{ width: "50%", height: "50%" }}
                />
              </label>
              <input type="file" id="mainBanner" style={{ display: "none" }} />
            </label>
            <div>
              <input type="text" placeholder="Type your URL" />
            </div>
            <div>
              <Button name={"Add"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
