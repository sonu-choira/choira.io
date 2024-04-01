import React, { useEffect, useState } from "react";
import upload from "../../../assets/upload.svg";
import cross from "../../../assets/cross.svg";
import style from "../studios/studio.module.css";
import Button from "./Button";
import { MdOutlineCloudUpload } from "react-icons/md";
import imageUploadapi from "../../../services/imageUploadapi";
import Swal from "sweetalert2";
import ChoiraLoder2 from "../../../components/loader/ChoiraLoder2";
import loder from "../../../assets/gifs/loading.gif";

function DragAndDropImageDiv({
  images,
  setImages,
  isEditMode,
  getimgUrl,
  setGetimgUrl,
}) {
  // to use this drag and drop component please pass a prop of use state
  // const [images, setImages] = useState([]);
  // const [getimgUrl, setGetimgUrl] = useState([]);

  // and isEditMode

  // useEffect(() => {
  //   setShouldUpload(true);
  // }, [images.length]);
  const [showloader, setshowloader] = useState(false);

  const uploadimagetoDataBase = (e) => {
    e.preventDefault();
    console.log("Data being sent:", images);
    if (images.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select images!",
        showConfirmButton: false,
        timer: 1800,
      });
    } else {
      setshowloader(true);
      imageUploadapi
        .multipleImgUpload(images)
        .then((response) => {
          console.log("Image links created:", response.images);
          if (response.images) {
            setshowloader(false);
            setGetimgUrl(response.images);
            Swal.fire({
              title: "Images uploaded!",
              text: "Images uploaded!",
              icon: "success",
              showConfirmButton: false,
              timer: 1800,
            });
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };
  useEffect(() => {
    console.log("getimgUrl", getimgUrl);
  }, [getimgUrl]);
  useEffect(() => {
    console.log("images chmaghe huaa hai ", images);
  }, [images]);
  const [isOver, setIsOver] = useState(false);
  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    const newImages = [
      ...images,
      ...selectedImages.slice(0, 5 - images.length),
    ];
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsOver(false);

    const draggedIndex = event.dataTransfer.getData("text/plain");
    const droppedIndex = images.length;

    // Prevent dropping the item back into its original position
    if (draggedIndex === droppedIndex.toString()) {
      return;
    }

    const draggedImage = images[draggedIndex];
    const newImages = [...images];
    newImages.splice(draggedIndex, 1);
    newImages.splice(droppedIndex, 0, draggedImage);

    setImages(newImages);
  };
  return (
    <>
      <form
        className={style.addNewStudioimgBox}
        action="/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <label htmlFor="selectimg">Image</label>
        <br />
        <div>
          {showloader ? (
            <>
              <span className={style.loderdiv}>
                <img src={loder} />
              </span>
            </>
          ) : (
            <label className={style.abs} htmlFor="">
              {images?.length === 0 ? (
                <div>
                  <label htmlFor="selectimg">
                    <img src={upload} alt="" />
                    <div>
                      Drag and Drop or <span>Browse</span> <br /> to upload
                    </div>
                  </label>
                </div>
              ) : (
                <div
                  className={`${style.showMultipleStudioImage} ${
                    isOver ? "drag-over" : ""
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {isEditMode ? (
                    <div>
                      {images?.map((imageUrl, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", index);
                          }}
                        >
                          <img
                            // src={imageUrl}
                            src={
                              typeof imageUrl === "string" &&
                              imageUrl.startsWith("http")
                                ? imageUrl
                                : typeof imageUrl === "object" // Check if it's an object (e.g., File or Blob)
                                ? URL.createObjectURL(imageUrl)
                                : undefined // Default to undefined if imageUrl is not a string or object
                            }
                            alt={`Uploaded Image ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                          <span
                            className={style.cancelImageUpload}
                            style={{ right: "-10%" }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <img src={cross} alt="" />
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {images?.map((image, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", index);
                          }}
                        >
                          <img
                            src={
                              typeof image === "string" &&
                              image.startsWith("http")
                                ? image
                                : typeof image === "object" // Check if it's an object (e.g., File or Blob)
                                ? URL.createObjectURL(image)
                                : undefined // Default to undefined if imageUrl is not a string or object
                            }
                            alt={`Uploaded Image ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                          <span
                            className={style.cancelImageUpload}
                            style={{ right: "-10%" }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <img src={cross} alt="" />
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {images?.length <= 4 && (
                    <div>
                      <label
                        htmlFor="selectimg"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "15%",
                        }}
                      >
                        <img src={upload} alt="" /> Upload
                      </label>
                    </div>
                  )}
                </div>
              )}
            </label>
          )}

          <input
            type="file"
            multiple
            accept=".jpeg,.png,.svg,.webp,.jpg,.jfif"
            id="selectimg"
            onChange={handleImageChange}
          />
        </div>
        <span className={style.imageuploadspan}>
          <Button
            icon={<MdOutlineCloudUpload />}
            type={"save"}
            style={{
              width: "15%",
              height: "80%",
            }}
            onClick={uploadimagetoDataBase}
          />
        </span>
      </form>
    </>
  );
}

export default DragAndDropImageDiv;
