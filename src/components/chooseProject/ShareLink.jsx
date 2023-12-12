import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import upload from "../../assets/img/chooseType-img/upload.svg";
import music from "../../assets/img/chooseType-img/Music.svg";
import cross from "../../assets/img/chooseType-img/cross.svg";

export default function ShareLink({ onNext }) {
  const handleContinue = () => {
    // Perform any necessary actions in this component
    // ...

    // Call the callback to trigger navigation to the next component
    onNext();
  };
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [is6FileUploaded, setIs6FileUploaded] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length === 6) {
      setIs6FileUploaded(true);
      alert("completeddd");
    } else {
      setIs6FileUploaded(false);
    }
  }, [uploadedFiles]);

  const [getLink, setGetLink] = useState("");
  const [links, setLinks] = useState([]);

  const addLink = () => {
    // Simplified URL validation
    const urlPattern = /^(ftp|http|https):\/\/.+/;

    if (
      (urlPattern.test(getLink) || getLink.trim() === "") &&
      getLink.trim() !== ""
    ) {
      setLinks([...links, getLink]);
      setGetLink("");
    } else {
      alert("Invalid link Please enter valid link");
      // console.log("Invalid link");
    }
  };

  const deleteLink = (index) => {
    const updatedLink = links.filter((elem, id) => {
      return id !== index;
    });
    setLinks(updatedLink);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    if (uploadedFiles.length + selectedFiles.length <= 6) {
      if (uploadedFiles.length < 6) {
        setUploadedFiles((prevFiles) => [
          ...prevFiles,
          ...Array.from(selectedFiles),
        ]);
        console.log("Selected Files:", selectedFiles);
      } else {
        console.log("You can upload a maximum of six files.");
      }
    } else {
      console.log("File limit reached. You can upload a maximum of six files.");
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const displayFileName = (fileName) => {
    const truncatedName =
      fileName.length > 5 ? fileName.substring(0, 5) : fileName;
    const fileExtension = fileName.split(".").pop();
    return `${truncatedName}.${fileExtension}`;
  };

  const divideFilesIntoSections = () => {
    const sections = [];
    for (let i = 0; i < uploadedFiles.length; i += 3) {
      sections.push(uploadedFiles.slice(i, i + 3));
    }
    return sections;
  };

  // Calculate the number of divs needed based on the number of links
  const linkDivs = Math.ceil(links.length / 3);

  return (
    <>
      <div className="project-div2">
        <div
          className={
            links.length > 0 || uploadedFiles.length > 0
              ? ""
              : "sharelink-title"
          }
        >
          <h2>
            Share links of similar tracks for inspiration &nbsp;
            <span className="optional">(Optional)</span>
          </h2>
        </div>
        <div
          className={
            links.length > 0 || uploadedFiles.length > 0
              ? "attach-demo"
              : "attach-demo newattach-demo "
          }
        >
          <div className="reference-link">
            <div
              className={
                links.length > 0 || uploadedFiles.length > 0
                  ? "reference-link-div1"
                  : "reference-link-div1 newreference-link-div1 "
              }
            >
              <input
                type="text"
                placeholder="Enter reference links"
                value={getLink}
                onChange={(e) => {
                  setGetLink(e.target.value);
                }}
              />
              {links.length < 6 && (
                <div className="add-attach-demo-link" onClick={addLink}>
                  Add
                </div>
              )}
            </div>

            <div
              className={
                links.length > 0 ? "all-reference-links" : "displayNone"
              }
            >
              {/* Loop through the number of linkDivs and render a div for every 3 links */}
              {[...Array(linkDivs)].map((_, divIndex) => (
                <div key={divIndex} className="add-attach-demo-link-main">
                  {links
                    .slice(divIndex * 3, divIndex * 3 + 3)
                    .map((elem, index) => (
                      <div key={index}>
                        &nbsp;&nbsp;
                        {elem.length > 15
                          ? `${elem.substring(0, 15)}...`
                          : elem}
                        <img
                          src={cross}
                          alt=""
                          onClick={() => {
                            deleteLink(divIndex * 3 + index);
                          }}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>
              Attach demo files <span className="optional">(Optional)</span>
            </h3>
          </div>
          <div
            className={
              uploadedFiles.length > 0 ? "uploaded-file" : "displayNone"
            }
          >
            {divideFilesIntoSections().map((section, sectionIndex) => (
              <div key={sectionIndex} className="uploaded-file-section">
                {section.map((file, fileIndex) => (
                  <div key={fileIndex} className={`file${fileIndex + 1}`}>
                    <img src={music} alt="" />
                    {displayFileName(file.name)}
                    <img
                      src={cross}
                      alt=""
                      onClick={() =>
                        handleRemoveFile(fileIndex + sectionIndex * 3)
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={`${is6FileUploaded ? "displayNone" : ""}`}>
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              accept=".mp3,.zip,.rar"
              onChange={handleFileChange}
              multiple
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput">
              <div
                className={`${is6FileUploaded ? "displayNone" : "demo-upload"}`}
              >
                <img src={upload} alt="" /> Attach
              </div>
            </label>
          </div>
          <div>
            <h2>Tell us more about the project</h2>
          </div>
          <div>
            <textarea
              placeholder="Enter text here..."
              draggable="false"
              style={{ resize: "none" }}
            ></textarea>
          </div>
        </div>

        <div className="project-div2-btn">
          <button onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
