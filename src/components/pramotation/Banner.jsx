import React, { useEffect, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { FaPencilAlt } from "react-icons/fa";
import upload from "../../assets/upload.svg";
import Button from "../../pages/admin/layout/Button";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { MdDragHandle } from "react-icons/md";

function Banner() {
  const [mainBannerData, setMainBannerData] = useState([]);
  const [exclusiveBannerData, setExclusiveBannerData] = useState([]);
  const [newMainBannerUrl, setNewMainBannerUrl] = useState("");
  const [newMainBannerImg, setNewMainBannerImg] = useState("");
  const [newExclusiveBannerUrl, setNewExclusiveBannerUrl] = useState("");
  const [newExclusiveBannerImg, setNewExclusiveBannerImg] = useState("");

  const [mainBannerEdit, setMainBannerEdit] = useState(false);
  const [exclusiveBannerEdit, setExclusiveBannerEdit] = useState(false);

  // Function to handle drag start
  const handleDragStart = (event, index, type) => {
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("type", type);
  };

  // Function to handle drop
  const handleDrop = (event, targetIndex, targetType) => {
    const index = event.dataTransfer.getData("index");
    const type = event.dataTransfer.getData("type");

    if (type === targetType) {
      let newData =
        targetType === "main" ? [...mainBannerData] : [...exclusiveBannerData];
      const item = newData.splice(index, 1)[0];
      newData.splice(targetIndex, 0, item);

      targetType === "main"
        ? setMainBannerData(newData)
        : setExclusiveBannerData(newData);
    } else {
      console.warn(
        "Dragging between main and exclusive banners is not implemented."
      );
    }
  };

  const handleEditMainBannerFileUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImg = [...mainBannerData];
      newImg[index].imgUrl = URL.createObjectURL(file);
      setMainBannerData(newImg);
    }
  };

  const handleEditExclusiveBannerFileUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImg = [...exclusiveBannerData];
      newImg[index].imgUrl = URL.createObjectURL(file);
      setExclusiveBannerData(newImg);
    }
  };

  const handleMainBannerFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setNewMainBannerImg(imgUrl);
    }
  };

  const handleExclusiveBannerFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setNewExclusiveBannerImg(imgUrl);
    }
  };

  const handleAddMainBanner = () => {
    if (newMainBannerImg && newMainBannerUrl) {
      setMainBannerData([
        ...mainBannerData,
        { imgUrl: newMainBannerImg, url: newMainBannerUrl },
      ]);
      setNewMainBannerImg("");
      setNewMainBannerUrl("");
      document.getElementById("mainBanner").value = "";
    }
  };

  const handleAddExclusiveBanner = () => {
    if (newExclusiveBannerImg && newExclusiveBannerUrl) {
      setExclusiveBannerData([
        ...exclusiveBannerData,
        { imgUrl: newExclusiveBannerImg, url: newExclusiveBannerUrl },
      ]);
      setNewExclusiveBannerImg("");
      setNewExclusiveBannerUrl("");
      document.getElementById("exclusiveBanner").value = "";
    }
  };

  return (
    <div className={style.bannerPage}>
      <div>
        <span>
          Main Banner:
          {mainBannerEdit ? (
            <Button
              name={"Save"}
              icon={<HiOutlineCheckCircle />}
              style={{ height: "90%", gap: "5px" }}
              onClick={() => setMainBannerEdit(false)}
            />
          ) : (
            <FaPencilAlt
              onClick={() => setMainBannerEdit(true)}
              style={{ cursor: "pointer" }}
            />
          )}
        </span>
        {mainBannerData.length > 0 && (
          <div className={style.bannerMain}>
            {mainBannerData.map((data, index) => (
              <div
                className={style.bannerMainContent}
                key={index}
                draggable
                onDragStart={(event) => handleDragStart(event, index, "main")}
                onDrop={(event) => handleDrop(event, index, "main")}
                onDragOver={(event) => event.preventDefault()}
              >
                {mainBannerEdit ? (
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                    }}
                  >
                    {data.imgUrl ? (
                      <img src={data.imgUrl} alt="" />
                    ) : (
                      <img
                        src={upload}
                        alt=""
                        style={{ width: "50%", height: "50%" }}
                      />
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) =>
                        handleEditMainBannerFileUpload(event, index)
                      }
                    />
                  </label>
                ) : (
                  <div>
                    <img src={data.imgUrl} alt="" />
                  </div>
                )}
                <div
                  style={{
                    border: mainBannerEdit ? "2px solid #e2e2e2" : "none",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type your URL"
                    value={data.url}
                    readOnly={!mainBannerEdit}
                    onChange={(e) => {
                      const newData = [...mainBannerData];
                      newData[index].url = e.target.value;
                      setMainBannerData(newData);
                    }}
                  />
                </div>
                <div>
                  {mainBannerEdit ? (
                    <RxCross2
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const newData = [...mainBannerData];
                        newData.splice(index, 1);
                        setMainBannerData(newData);
                      }}
                    />
                  ) : (
                    <MdDragHandle />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <br />
        <br />
        <div
          className={style.bannerMainContent}
          style={{ width: "95%" }}
          onDrop={(event) => handleDrop(event, mainBannerData.length, "main")}
          onDragOver={(event) => event.preventDefault()}
        >
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
            {newMainBannerImg ? (
              <img src={newMainBannerImg} alt="" />
            ) : (
              <img
                src={upload}
                alt=""
                style={{ width: "50%", height: "50%" }}
              />
            )}
            <input
              type="file"
              id="mainBanner"
              style={{ display: "none" }}
              onChange={handleMainBannerFileUpload}
            />
          </label>
          <div>
            <input
              type="text"
              placeholder="Type your URL"
              value={newMainBannerUrl}
              onChange={(e) => setNewMainBannerUrl(e.target.value)}
            />
          </div>
          <div>
            <Button name={"Add"} onClick={handleAddMainBanner} />
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <span>
          Exclusive Banner:
          {exclusiveBannerEdit ? (
            <Button
              name={"Save"}
              icon={<HiOutlineCheckCircle />}
              style={{ height: "90%", gap: "5px" }}
              onClick={() => setExclusiveBannerEdit(false)}
            />
          ) : (
            <FaPencilAlt
              onClick={() => setExclusiveBannerEdit(true)}
              style={{ cursor: "pointer" }}
            />
          )}
        </span>
        {exclusiveBannerData.length > 0 && (
          <div className={style.bannerMain}>
            {exclusiveBannerData.map((data, index) => (
              <div
                className={style.bannerMainContent}
                key={index}
                draggable
                onDragStart={(event) =>
                  handleDragStart(event, index, "exclusive")
                }
                onDrop={(event) => handleDrop(event, index, "exclusive")}
                onDragOver={(event) => event.preventDefault()}
              >
                {exclusiveBannerEdit ? (
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                    }}
                  >
                    {data.imgUrl ? (
                      <img src={data.imgUrl} alt="" />
                    ) : (
                      <img
                        src={upload}
                        alt=""
                        style={{ width: "50%", height: "50%" }}
                      />
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) =>
                        handleEditExclusiveBannerFileUpload(event, index)
                      }
                    />
                  </label>
                ) : (
                  <div>
                    <img src={data.imgUrl} alt="" />
                  </div>
                )}
                <div
                  style={{
                    border: exclusiveBannerEdit ? "2px solid #e2e2e2" : "none",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type your URL"
                    value={data.url}
                    readOnly={!exclusiveBannerEdit}
                    onChange={(e) => {
                      const newData = [...exclusiveBannerData];
                      newData[index].url = e.target.value;
                      setExclusiveBannerData(newData);
                    }}
                  />
                </div>
                <div>
                  {exclusiveBannerEdit ? (
                    <RxCross2
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const newData = [...exclusiveBannerData];
                        newData.splice(index, 1);
                        setExclusiveBannerData(newData);
                      }}
                    />
                  ) : (
                    <MdDragHandle />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <br />
        <br />
        <div
          className={style.bannerMainContent}
          style={{ width: "95%" }}
          onDrop={(event) =>
            handleDrop(event, exclusiveBannerData.length, "exclusive")
          }
          onDragOver={(event) => event.preventDefault()}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px solid #ccc",
            }}
            htmlFor="exclusiveBanner"
          >
            {newExclusiveBannerImg ? (
              <img src={newExclusiveBannerImg} alt="" />
            ) : (
              <img
                src={upload}
                alt=""
                style={{ width: "50%", height: "50%" }}
              />
            )}
            <input
              type="file"
              id="exclusiveBanner"
              style={{ display: "none" }}
              onChange={handleExclusiveBannerFileUpload}
            />
          </label>
          <div>
            <input
              type="text"
              placeholder="Type your URL"
              value={newExclusiveBannerUrl}
              onChange={(e) => setNewExclusiveBannerUrl(e.target.value)}
            />
          </div>
          <div>
            <Button name={"Add"} onClick={handleAddExclusiveBanner} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
