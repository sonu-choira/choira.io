import React, { useEffect, useRef, useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { FaPencilAlt } from "react-icons/fa";
import upload from "../../assets/upload.svg";
import Button from "../../pages/admin/layout/Button";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { MdDragHandle } from "react-icons/md";
import {
  confirmAlret,
  errorAlert,
  sucessAlret,
} from "../../pages/admin/layout/Alert";
import AddNewBanner from "./AddNewBanner";
import { set } from "react-ga";
import { RxDotFilled } from "react-icons/rx";
import { BiSolidPencil } from "react-icons/bi";
import { Skeleton } from "antd";
import { update } from "firebase/database";
import promotionApi from "../../services/promotionApi";
import { clearEmptyField } from "../../utils/helperFunction";
import CopyToClipboard from "../../pages/admin/layout/CopyToClipboard ";
import noDataFound from "../../components/loader/nodataFound.png";
let bannerLength = 0;
function Banner({
  setProducts,
  products,
  showAddPage,
  setShowAddPage,
  handleBanner,
}) {
  const [mainBannerData, setMainBannerData] = useState([]);
  const [exclusiveBannerData, setExclusiveBannerData] = useState([]);
  const [newMainBannerUrl, setNewMainBannerUrl] = useState("");
  const [newMainBannerImg, setNewMainBannerImg] = useState("");
  const [newExclusiveBannerUrl, setNewExclusiveBannerUrl] = useState("");
  const [newExclusiveBannerImg, setNewExclusiveBannerImg] = useState("");

  const [mainBannerEdit, setMainBannerEdit] = useState(false);
  const [exclusiveBannerEdit, setExclusiveBannerEdit] = useState(false);

  const [isMainBannerValidUrl, setIsMainBannerValidUrl] = useState(true); // Define state for URL validity
  const [isExclusiveValidUrl, setIsExclusiveValidUrl] = useState(true);

  const [reorder, setReorder] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let t = setTimeout(() => {
      setLoader(false);
    }, 5000);
    return () => {
      clearTimeout(t);
    };
  });

  useEffect(() => {
    if (products) {
      //
      const exbanners = products.filter((type) => type.type === "ExcBanner");
      const exsortedData = exbanners.sort((a, b) => a.stage - b.stage);
      setExclusiveBannerData(exsortedData);

      //
      const mainbanners = products.filter((prod) => prod.type === "AdBanner");

      bannerLength = mainbanners.length + 1;
      console.log("==============<> ", bannerLength);
      const sortedData = mainbanners.sort((a, b) => a.stage - b.stage);
      setMainBannerData(sortedData);
      setReorder(true);
    }
  }, [products]);

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
      const photoURL = URL.createObjectURL(file);
      setImage(photoURL);
    }
  };

  const handleEditBannerFileUpload = (event, index, type) => {
    const setData =
      type === "main" ? setMainBannerData : setExclusiveBannerData;
    handleFileUpload(event, (photoURL) => {
      const newData = [...setData];
      newData[index].photoURL = photoURL;
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
      setNewData([...newData, { photoURL: newImg, url: newUrl }]);
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

  const handleDragStart = (event, index, type, id) => {
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("id", id);
  };
  const handelUpdateBanner = (updatedData) => {
    promotionApi
      .updateBanner(updatedData)
      .then((res) => {
        console.log(res);
        if (res.status) {
          sucessAlret("Banner stage Updated Successfully");
          handleBanner();
          setReorder(true);
        } else {
          errorAlert(res.message || "Error in updating banner stage");
        }
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Error in updating banner");
      });
  };
  const handleDrop = (event, index, type, id) => {
    const draggedIndex = event.dataTransfer.getData("index");
    const draggedType = event.dataTransfer.getData("type");
    const draggedId = event.dataTransfer.getData("id");

    if (draggedType !== type) return;

    let updatedData;
    if (type === "main") {
      updatedData = [...mainBannerData];
    } else if (type === "exclusive") {
      updatedData = [...exclusiveBannerData];
    }
    const [draggedItem] = updatedData.splice(draggedIndex, 1);
    updatedData.splice(index, 0, draggedItem);
    console.log(draggedItem, "draggedItem");
    draggedItem.stage = index + 1;
    clearEmptyField(draggedItem);
    handelUpdateBanner(draggedItem);

    // console.log(updatedData, "updatedData");
    // console.log(draggedItem, "draggedItem");

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

  const [pageType, setPageType] = useState("");
  let editMode = useRef(false);
  const [editData, setEditData] = useState({});
  const gotoEditPage = (id) => {
    console.log(id);
    let datatosend = products.filter((item) => item.id === id)[0];
    datatosend.bannerCount = products.length + 1;
    // console.log(products.length);
    setEditData(datatosend);
  };

  const handelDeleteBanner = (id) => {
    confirmAlret("Are you sure you want to delete this banner?").then(
      (result) => {
        if (result.isConfirmed) {
          promotionApi
            .deleteBanner(id)
            .then((res) => {
              console.log(res);

              if (res.status) {
                sucessAlret("Banner stage Deleted Successfully");
                handleBanner();
              } else {
                errorAlert(res.message || "Error in deleting banner stage");
              }
            })
            .catch((err) => {
              console.log(err);
              errorAlert("Error in deleting banner");
            });
        }
      }
    );
  };

  return (
    <>
      {showAddPage ? (
        <AddNewBanner
          setShowAddPage={setShowAddPage}
          pageType={pageType}
          editMode={editMode}
          editData={editData}
          setEditData={setEditData}
          bannerLength={bannerLength}
        />
      ) : (
        <div className={style.bannerPage}>
          <div>
            <span>
              Main Banner:
              <div className={style.bannerBtnDiv}>
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
                  style={{ height: "90%", gap: "5px" }}
                  onClick={() => {
                    if (mainBannerData.length < 4) {
                      setShowAddPage(true);
                      setPageType("AdBanner");
                    } else {
                      errorAlert("You can only add four main banner");
                    }
                  }}
                />
              </div>
            </span>
            <br />
            <br />

            {mainBannerData.length > 0 ? (
              <div className={style.bannerMain}>
                {mainBannerData.map((data, index) => (
                  <div
                    className={style.bannerMainContent}
                    key={index}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, index, "main", data.id)
                    }
                    onDrop={(event) =>
                      handleDrop(event, index, "main", data.id)
                    }
                    onDragOver={(event) => event.preventDefault()}
                  >
                    <div>
                      <img src={data.photoURL} alt="" />
                    </div>
                    <div
                      style={{
                        border: mainBannerEdit ? "2px solid #e2e2e2" : "none",
                        display: "flex",
                      }}
                    >
                      {data.banner_redirect && (
                        <span title={data.banner_redirect}>
                          <RxDotFilled />
                          {data.stage}
                          &nbsp;
                          <CopyToClipboard
                            textToCopy={data?.banner_redirect}
                            textLength={20}
                          />
                        </span>
                      )}

                      {data.for && (
                        <span title={data.for}>
                          <RxDotFilled />
                          &nbsp;{" "}
                          <CopyToClipboard
                            textToCopy={data?.for}
                            textLength={20}
                          />
                        </span>
                      )}

                      {data.name && (
                        <span title={data.name}>
                          <RxDotFilled />
                          &nbsp;{" "}
                          <CopyToClipboard
                            textToCopy={data?.name}
                            textLength={20}
                          />
                        </span>
                      )}

                      {data.redirectURL && (
                        <span title={data.redirectURL}>
                          <RxDotFilled />
                          &nbsp;
                          <CopyToClipboard
                            textToCopy={data?.redirectURL}
                            textLength={20}
                          />
                        </span>
                      )}

                      {/* <input
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
                      /> */}
                    </div>
                    <div>
                      {mainBannerEdit ? (
                        <>
                          <BiSolidPencil
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setShowAddPage(true);
                              setPageType("AdBanner");
                              setMainBannerEdit(false);
                              gotoEditPage(data.id);
                              editMode.current = true;
                            }}
                          />
                          &nbsp;&nbsp;&nbsp;
                          <RxCross2
                            style={{ cursor: "pointer" }}
                            onClick={() => handelDeleteBanner(data.id)}
                          />
                        </>
                      ) : (
                        <MdDragHandle />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Skeleton active />
            )}
            <br />
            <br />
          </div>
          <br />
          <div>
            <span>
              Exclusive Banner:
              <div className={style.bannerBtnDiv}>
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
                <Button
                  name={"Add"}
                  style={{ height: "90%", gap: "5px" }}
                  onClick={() => {
                    if (exclusiveBannerData.length < 4) {
                      setShowAddPage(true);
                      setPageType("ExcBanner");
                    } else {
                      errorAlert("You can only add up to 4 banners");
                    }
                  }}
                />
              </div>
            </span>
            <br />
            <br />
            {exclusiveBannerData.length > 0 ? (
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
                        {data.photoURL ? (
                          <img src={data.photoURL} alt="" />
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
                        <img src={data.photoURL} alt="" />
                      </div>
                    )}
                    <div
                      style={{
                        border: exclusiveBannerEdit
                          ? "2px solid #e2e2e2"
                          : "none",
                        display: "flex",

                        alignItems: "center",
                      }}
                    >
                      {data.banner_redirect && (
                        <span title={data.banner_redirect}>
                          <RxDotFilled />
                          &nbsp;{" "}
                          <CopyToClipboard
                            textToCopy={data?.banner_redirect}
                            textLength={20}
                          />
                        </span>
                      )}

                      {data.for && (
                        <span title={data.for}>
                          <RxDotFilled />
                          &nbsp;{" "}
                          <CopyToClipboard
                            textToCopy={data?.for}
                            textLength={20}
                          />
                        </span>
                      )}

                      {data.name && (
                        <span title={data.name}>
                          <RxDotFilled />
                          &nbsp;{" "}
                          <CopyToClipboard
                            textToCopy={data?.name}
                            textLength={20}
                          />
                        </span>
                      )}

                      {data.redirectURL && (
                        <span title={data.redirectURL}>
                          <RxDotFilled />
                          &nbsp;{" "}
                          <CopyToClipboard
                            textToCopy={data?.redirectURL}
                            textLength={20}
                          />
                        </span>
                      )}

                      {/* <input
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
                      /> */}
                    </div>
                    <div>
                      {exclusiveBannerEdit ? (
                        <>
                          <BiSolidPencil
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setShowAddPage(true);
                              setPageType("ExcBanner");
                              setMainBannerEdit(false);
                              gotoEditPage(data.id);
                              editMode.current = true;
                            }}
                          />
                          &nbsp;&nbsp;&nbsp;
                          <RxCross2
                            style={{ cursor: "pointer" }}
                            onClick={() => handelDeleteBanner(data.id)}
                          />
                        </>
                      ) : (
                        <MdDragHandle />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : loader ? (
              <Skeleton active />
            ) : (
              // <img
              //   src={noDataFound}
              //   alt="No Data Found"
              //   style={{ width: "10%", height: "30%" }}
              // />
              <h3>No Data Found</h3>
            )}
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
