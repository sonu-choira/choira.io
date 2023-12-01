import React, { useEffect, useRef, useState } from "react";
import PauseIcon from "../../assets/pause-circle-fill.svg";
import PlayIcon from "../../assets/play-circle-fill.svg";

import "./video-player.scss";
import "./seek-bar.scss";

export default function VideoPlayer() {
  const videoRef = useRef();
  const videoPlayerRef = useRef();
  const controlsRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [seekBarValue, setSeekBarValue] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  useEffect(() => {
    const value = (100 / videoRef.current.duration) * currentTime;
    setSeekBarValue(value);
  }, [currentTime]);

  const onTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const onVideoClick = () => {
    const { current: video } = videoRef;
    const { current: controls } = controlsRef;
    if (video.paused) {
      video.play();
      setIsVideoPaused(false);
      controls.classList.remove("paused");
    } else {
      video.pause();
      setIsVideoPaused(true);
      controls.classList.add("paused");
    }
  };

  const seekVideo = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    const { current: video } = videoRef;
    const newTime = (video.duration / 100) * value;
    video.currentTime = newTime;
  };

  return (
    <div ref={videoPlayerRef} className="video-player">
      <video
        ref={videoRef}
        // src="video.mkv"
        width="100%"
        onTimeUpdate={onTimeUpdate}
        onClick={onVideoClick}
        poster="images/video-thumbnail.png"
      ></video>
      {/* <div ref={controlsRef} className="controls paused" onClick={onVideoClick}>
        {isVideoPaused ? (
          <img className="play-icon" src={PlayIcon} alt="" />
        ) : (
          <img className="pause-icon" src={PauseIcon} alt="" />
        )}

        <input
          type="range"
          id="seek-bar"
          value={seekBarValue || 0}
          onChange={seekVideo}
        />
      </div> */}
    </div>
  );
}
