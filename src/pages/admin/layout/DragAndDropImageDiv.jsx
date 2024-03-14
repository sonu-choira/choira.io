import React, { useState } from "react";
import upload from "../../../assets/upload.svg";
import cross from "../../../assets/cross.svg";
import style from "../studios/studio.module.css";

function DragAndDropImageDiv({ images, setImages, isEditMode }) {
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
      <div className={style.addNewStudioimgBox}>
        <label htmlFor="selectimg">Image</label>
        <br />
        <div>
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
                    {images.map((imageUrl, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", index);
                        }}
                      >
                        <img
                          src={imageUrl}
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
                          src={URL.createObjectURL(image)}
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
          <input
            type="file"
            multiple
            accept=".jpeg,.png,.svg,.webp,.jpg,.jfif"
            id="selectimg"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
}

export default DragAndDropImageDiv;
