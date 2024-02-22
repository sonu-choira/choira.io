import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import iconBox from "../../assets/explore/playButton.png"
import iconPauseBox from "../../assets/explore/pause.png"
import trackImage from "../../assets/explore/trackImage.png"
import { docServerUrl } from '../../restservice';

const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "#4e4e50",
    progressColor: "#3e3e40",
    cursorColor: "#4e4e50",
    barWidth: 2,
    barRadius: 1,
    responsive: true,
    height: 20,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    xhr: { cache: "default", mode: "cors", method: "GET", credentials: "include", headers: [{ key: "cache-control", value: "no-cache" }, { key: "pragma", value: "no-cache" }] },
    xhr1 : { cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [{ key: 'Authorization', value: 'my-token' }] }
});

let oldtrackid = null;
let oldplayingAudio = null;

export default function Waveform({ url, url1, tracks, id, setSelectedPlayButton, selectedPlayButton }) {
    const waveformRef = useRef(null);
    var wavesurfer = [];
    const [waveform, setWaveform] = useState(null)
    const [playing, setPlay] = useState(false);
    const [audioContext, setAudioContext] = useState(new AudioContext())

    const docServer = docServerUrl

    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
        setPlay(false);
        if (waveformRef.current) {
            wavesurfer[id] = WaveSurfer.create({
                // audioContext: audioContext,
                container: waveformRef.current,
                waveColor: "#4e4e50",
                progressColor: "#fcc12e",
                cursorColor: "#4e4e50",
                barWidth: 0,
                barRadius: 1,
                responsive: true,
                hideScrollbar: true,
                height: 20,
                // normalize: true,
                partialRender: true,
                pixelRatio: window.devicePixelRatio = 1,

            });

            wavesurfer[id].on('finish', handlePlayPause)
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
        <div className="songTracks">

            <div className="controls">
                {url1 ?
                    <img src={url1} alt="trackI1mg" width="57px" className="trackImg" />
                    :
                    <img src={trackImage} alt="trackImg" width="57px" className="trackImg" />
                }
                {/* <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>                 */}

                <div onClick={handlePlayPause} className="play">{selectedPlayButton===tracks.name && playing ?
                    <img src={iconPauseBox} alt="icon" className='upImage' />
                    :
                    <img src={iconBox} alt="icon" className='upImage' />
                }</div>
            </div>
            <div className="trackDetail" >
                <div className="trackName">{tracks.name}</div>
                <div className="trackComposer">{tracks.composer},{tracks.genre}</div>
            </div>
            <div id="waveform" ref={waveformRef} style={{ zIndex: '1' }} className="wavehiden" />
        </div>

    );
}
