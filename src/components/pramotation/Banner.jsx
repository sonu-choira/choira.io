import React, { useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { FaPencilAlt } from "react-icons/fa";
import upload from "../../assets/upload.svg";
import Button from "../../pages/admin/layout/Button";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { MdDragHandle } from "react-icons/md";
import { errorAlert } from "../../pages/admin/layout/Alert";
import AddNewBanner from "./AddNewBanner";
import { set } from "react-ga";

function Banner() {
  const [mainBannerData, setMainBannerData] = useState([]);
  const [exclusiveBannerData, setExclusiveBannerData] = useState([]);
  const [newMainBannerUrl, setNewMainBannerUrl] = useState("");
  const [newMainBannerImg, setNewMainBannerImg] = useState("");
  const [newExclusiveBannerUrl, setNewExclusiveBannerUrl] = useState("");
  const [newExclusiveBannerImg, setNewExclusiveBannerImg] = useState("");

  const [mainBannerEdit, setMainBannerEdit] = useState(false);
  const [exclusiveBannerEdit, setExclusiveBannerEdit] = useState(false);

  const [isMainBannerValidUrl, setIsMainBannerValidUrl] = useState(true); // Define state for URL validity
  const [isExclusiveValidUrl, setIsExclusiveValidUrl] = useState(true); // Define state for URL validity

  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate the scheme
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // domain name
        "localhost|" + // localhost
        "\\d{1,3}\\.(\\d{1,3}\\.){2}\\d{1,3}|" + // OR ipv4
        "\\[([a-fA-F\\d:]+)\\])" + // OR ipv6
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-zA-Z\\d_]*)?$", // fragment locator
      "i"
    );
    return urlPattern.test(url);
  };

  const handleFileUpload = (event, setImage, data, setData) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        errorAlert("File size should be less than 1MB");
        event.target.value = "";
        return;
      }
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
    }
  };

  const handleEditBannerFileUpload = (event, index, type) => {
    const setData =
      type === "main" ? setMainBannerData : setExclusiveBannerData;
    handleFileUpload(event, (imgUrl) => {
      const newData = [...setData];
      newData[index].imgUrl = imgUrl;
      setData(newData);
    });
  };

  const handleBannerFileUpload = (event, setImage) => {
    handleFileUpload(event, setImage);
  };

  const handleAddBanner = (type) => {
    const newData = type === "main" ? mainBannerData : exclusiveBannerData;
    const setNewData =
      type === "main" ? setMainBannerData : setExclusiveBannerData;
    const newImg = type === "main" ? newMainBannerImg : newExclusiveBannerImg;
    const newUrl = type === "main" ? newMainBannerUrl : newExclusiveBannerUrl;

    if (newImg && isValidUrl(newUrl)) {
      setNewData([...newData, { imgUrl: newImg, url: newUrl }]);
      if (type === "main") {
        setNewMainBannerImg("");
        setNewMainBannerUrl("");
        setIsMainBannerValidUrl(true); // Reset URL validity state
      } else {
        setNewExclusiveBannerImg("");
        setNewExclusiveBannerUrl("");
        setIsExclusiveValidUrl(true); // Reset URL validity state
      }
      document.getElementById(`${type}Banner`).value = "";
    } else {
      errorAlert("Please provide a valid URL");
      if (type === "main") {
        setIsMainBannerValidUrl(false); // Set URL validity state
      } else {
        setIsExclusiveValidUrl(false); // Set URL validity state
      }
    }
  };

  const handleDragStart = (event, index, type) => {
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("type", type);
  };

  const handleDrop = (event, index, type) => {
    const draggedIndex = event.dataTransfer.getData("index");
    const draggedType = event.dataTransfer.getData("type");

    if (draggedType !== type) return;

    let updatedData;
    if (type === "main") {
      updatedData = [...mainBannerData];
    } else if (type === "exclusive") {
      updatedData = [...exclusiveBannerData];
    }
    const [draggedItem] = updatedData.splice(draggedIndex, 1);
    updatedData.splice(index, 0, draggedItem);

    if (type === "main") {
      setMainBannerData(updatedData);
    } else if (type === "exclusive") {
      setExclusiveBannerData(updatedData);
    }
  };

  const checkUrlEdit = (e, setValidUrl) => {
    if (!isValidUrl(e.target.value)) {
      e.target.style.border = "2px solid red";
      setValidUrl(false);
    } else {
      e.target.style.border = "none";
      setValidUrl(true);
    }
  };

  const handleSave = (isValidUrl, setEdit, errorMessage) => {
    if (isValidUrl) {
      setEdit(false);
    } else {
      errorAlert(errorMessage);
    }
  };
  const [showAddPage, setShowAddPage] = useState(false);

  return (
    <>
      {showAddPage ? (
        <AddNewBanner setShowAddPage={setShowAddPage} />
      ) : (
        <div className={style.bannerPage}>
          <div>
            <span>
              Main Banner:
              <div>
                {mainBannerEdit ? (
                  <Button
                    name={"Save"}
                    icon={<HiOutlineCheckCircle />}
                    style={{ height: "90%", gap: "5px" }}
                    onClick={() =>
                      handleSave(
                        isMainBannerValidUrl,
                        setMainBannerEdit,
                        "Please enter a valid URL"
                      )
                    }
                  />
                ) : (
                  <FaPencilAlt
                    onClick={() => setMainBannerEdit(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <Button
                  name={"Add"}
                  icon={<HiOutlineCheckCircle />}
                  style={{ height: "90%", gap: "5px" }}
                  onClick={() => setShowAddPage(true)}
                />
              </div>
            </span>
            <br />
            <br />

            {mainBannerData.length > 0 && (
              <div className={style.bannerMain}>
                {mainBannerData.map((data, index) => (
                  <div
                    className={style.bannerMainContent}
                    key={index}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, index, "main")
                    }
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
                            handleEditBannerFileUpload(event, index, "main")
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
                        onKeyUp={(e) => {
                          checkUrlEdit(e, setIsMainBannerValidUrl);
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
              onDrop={(event) =>
                handleDrop(event, mainBannerData.length, "main")
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
                  onChange={(event) =>
                    handleBannerFileUpload(event, setNewMainBannerImg)
                  }
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
                <Button name={"Add"} onClick={() => handleAddBanner("main")} />
              </div>
            </div>
          </div>
          <br />
          <div>
            <span>
              Exclusive Banner:
              {exclusiveBannerEdit ? (
                <Button
                  name={"Save"}
                  icon={<HiOutlineCheckCircle />}
                  style={{ height: "90%", gap: "5px" }}
                  onClick={() =>
                    handleSave(
                      isExclusiveValidUrl,
                      setExclusiveBannerEdit,
                      "Please enter a valid URL"
                    )
                  }
                />
              ) : (
                <FaPencilAlt
                  onClick={() => setExclusiveBannerEdit(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </span>
            <br />
            <br />
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
                            handleEditBannerFileUpload(
                              event,
                              index,
                              "exclusive"
                            )
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
                        border: exclusiveBannerEdit
                          ? "2px solid #e2e2e2"
                          : "none",
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
                        onKeyUp={(e) => {
                          checkUrlEdit(e, setIsExclusiveValidUrl);
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
                  onChange={(event) =>
                    handleBannerFileUpload(event, setNewExclusiveBannerImg)
                  }
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
                <Button
                  name={"Add"}
                  onClick={() => handleAddBanner("exclusive")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
