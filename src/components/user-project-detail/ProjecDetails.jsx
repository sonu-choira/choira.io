import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import musicFolder from "../../assets/img/music-folder.svg";
import zipFile from "../../assets/img/zip_file.svg";
import rarFile from "../../assets/img/zip_file.svg";
import files from "../../assets/img/folder.svg";

function ProjecDetails({ userProjectData }) {
  const {
    TypeOfMusic,
    GenreOfMusic,
    MusicianForProject,
    Budget,
    LinksForSimilarTrack,
    DemoFiles,
    DetailsOfProject,
    ProjectDeliveryDate,
    ExtraAmountToPay,
    NameOFProject,
    ConnectedPerson,
    TimeSlots,
  } = userProjectData || {};

  useEffect(() => {
    console.log(userProjectData);
  }, []);

  const { SelectedSlots, SelectedDate, BookSessionMonth } = TimeSlots || {};

  const isYouTubeLink = (link) => {
    // Add your logic to identify YouTube links
    // For simplicity, assuming any link containing "youtube.com" or "youtu.be" is a YouTube link
    return link.includes("youtube.com") || link.includes("youtu.be");
  };

  console.log(
    "MusicianForProject:",
    MusicianForProject &&
      Array.isArray(MusicianForProject) &&
      MusicianForProject.length > 0
      ? MusicianForProject.join(",")
      : "Not available"
  );

  return (
    <>
      <div className="choira-test-project-section-main">
        <div>
          <div>
            <span>Project Name:</span>
            <h4>{NameOFProject}</h4>
          </div>
          <div className="choira-test-details">
            <span>Details:</span>
            {/* dont remove the h4  tag before removing or changeing the h4 tag please go through the css part */}
            <h4>{DetailsOfProject}</h4>
            <div>
              <div> {TypeOfMusic} </div>
              <div> {GenreOfMusic} </div>
            </div>
          </div>
          <div>
            <span>Need help with:</span>
            <h4>
              {" "}
              {MusicianForProject &&
              Array.isArray(MusicianForProject) &&
              MusicianForProject.length > 0
                ? MusicianForProject.join(",")
                : "Not available"}
            </h4>
          </div>
          <div>
            <span>Price Range:</span>
            <h4>{Budget}</h4>
          </div>
          <div>
            <span>Manager:</span>
            <h4> {ConnectedPerson} </h4>
          </div>
          <div className="choira-test-demoFile">
            <span>Demo File:</span>
            <div className="choira-test-demoFile-main">
              {DemoFiles ? (
                DemoFiles.length === 0 ? (
                  <div>Empty</div>
                ) : (
                  DemoFiles[0].split(",").map((file, index) => (
                    <div key={index}>
                      {file.trim().toLowerCase().endsWith(".mp3") && (
                        <img src={musicFolder} alt="" />
                      )}
                      {file.trim().toLowerCase().endsWith(".rar") && (
                        <img src={rarFile} alt="" />
                      )}
                      {file.trim().toLowerCase().endsWith(".zip") && (
                        <img src={zipFile} alt="" />
                      )}
                      {!file.trim().toLowerCase().endsWith(".mp3") &&
                        !file.trim().toLowerCase().endsWith(".rar") &&
                        !file.trim().toLowerCase().endsWith(".zip") && (
                          <img src={files} alt="" />
                        )}
                      {file.trim() ? <h4>{file.trim()}</h4> : <div>Empty</div>}
                    </div>
                  ))
                )
              ) : (
                <div>Empty</div>
              )}
            </div>
          </div>
          <div>
            <span>Reference Links:</span>
            {LinksForSimilarTrack && LinksForSimilarTrack[0] ? (
              LinksForSimilarTrack[0].length === 1 &&
              isYouTubeLink(LinksForSimilarTrack[0][0]) ? (
                <div className="choira-test-player">
                  <ReactPlayer
                    controls
                    url={LinksForSimilarTrack[0][0]}
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <h4>
                  {LinksForSimilarTrack[0].map((item, index) => (
                    <h4 key={index}>
                      {item}
                      {index < LinksForSimilarTrack[0].length - 1 && <br />}
                    </h4>
                  ))}
                </h4>
              )
            ) : (
              <div>No reference links provided</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjecDetails;
