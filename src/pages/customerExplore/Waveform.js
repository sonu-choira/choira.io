import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import iconBox from "../../assets/explore/playButton.png"
import iconPauseBox from "../../assets/explore/pause.png"
import trackImage from "../../assets/explore/trackImage.png"
// import trackImage from "../../assets/explore/trackImage.png"
import './woveStyles.scss';
import { docServerUrl } from '../../restservice'

const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "#f0f0f0",
    progressColor: "#fcfbfb",
    cursorColor: "#4e4e50",
    barWidth: 2,
    barRadius: 1,
    responsive: true,
    height: 20,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    xhr: {
        cache: "default",
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: [
            { key: "cache-control", value: "no-cache" },
            { key: "pragma", value: "no-cache" }
        ]
    }
});
let oldtrackid = null;
let oldplayingAudio = null;
export default function Waveform({ url, url1, tracks, id, setSelectedPlayButton, selectedPlayButton }) {
    const waveformRef = useRef(null);
    // const wavesurfer = useRef(null);
    var wavesurfer = [];
    // var playingAudio = []
    const [waveform, setWaveform] = useState(null)
    const [playing, setPlay] = useState(false);
    const [openSoundPlay, setSoundPlay] = useState(false)
    const [playingAudio, setPlayingAudio] = useState(0)
    const [audioContext, setAudioContext] = useState(new AudioContext())

    const docServer = docServerUrl

    var wave = 'waveform';
    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
        setPlay(false);
        if (waveformRef.current) {
            wavesurfer[id] = WaveSurfer.create({
                // audioContext: audioContext,
                container: waveformRef.current,
                waveColor: "#f0f0f0",
                progressColor: "#fcc12e",
                cursorColor: "#f0f0f0",
                barWidth: 0,
                barRadius: 1,
                responsive: true,
                hideScrollbar: true,
                height: 20,
                normalize: true,
                partialRender: true,
                pixelRatio: window.devicePixelRatio = 1,

            });

            // wavesurfer[id].on('finish', handlePlayPause)
            wavesurfer[id].load(url)
            setWaveform(wavesurfer[id])
        }

        return () => wavesurfer[id].destroy();
        
    }, [url]);



    const handlePlayPause = () => {

        if (oldtrackid === null) {
            waveform.play();
            setPlay(true);
        } else if (oldtrackid !== waveform) {
            if (oldtrackid.backend !== null) {
                oldtrackid.stop();
            }
            waveform.play();
            setPlay(true);
        } else if (oldtrackid === waveform) {
            oldtrackid.stop();
            setPlay(false);
            if (playing) {
                setPlay(false);
            } else {
                waveform.play();
                setPlay(true);
            }
        } else {
            waveform.play();
        }

        oldtrackid = waveform;
        setSelectedPlayButton(tracks.name)
    };

    return (
        <div className="songTracks" >

            <div className="controls">
                {url1 ?
                    <img src={url1} alt="trackI1mg" width="57px" className="trackImg" />
                    :
                    <img src={trackImage} alt="trackImg" width="57px" className="trackImg" />
                }

                <div onClick={handlePlayPause} className="play">
                    {selectedPlayButton===tracks.name && playing ?
                        <img src={iconPauseBox} alt="icon" width="20px" className='upImage' />
                        :
                        <img src={iconBox} alt="icon" className='upImage' />
                    }
                </div>
            </div>
            <div className="trackDetail" >
                <div className="trackName">{tracks.name}</div>
                <div className="trackComposer">{tracks.composer},{tracks.genre}</div>
            </div>
            <div id={wave + id} ref={waveformRef} style={{ zIndex: '0' }} className="wavehiden" />
        </div>

    );
}
