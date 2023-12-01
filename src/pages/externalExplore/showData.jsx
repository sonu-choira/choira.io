import React, { useEffect, useRef } from 'react'
import sprite from "../../assets/icons/sprite.svg";
import './showExploreData.scss'
import featureBox from "../../assets/explore/img1.png"
import iconBox from "../../assets/explore/playButton.png"
import iconPauseBox from "../../assets/explore/pause.png"
import trackImage from "../../assets/explore/trackImage.png"
import track from "../../assets/explore/tracks.png"
import { useState } from 'react';
import axios from 'axios';
import ExploreOverlay from './exploreOverlay';

import Waveform from "./Waveform";
import { httpUrl, docServerUrl } from '../../restservice'
import './woveStyles.scss'
// import WaveSurfer from "wavesurfer.js";

var audio = null



export default function ExternalShowExploreData(props) {

    const [selectedFilter, setSelectedFilter] = useState("All")
    const [genreTable, setGenreTable] = useState([])
    const [trackTable, setTrackTable] = useState([])
    const [trackTableAll, setTrackTableAll] = useState([])
    const [featuredTrackTable, setFeaturedTrackTable] = useState([])
    const [featuredTrackTableAll, setFeaturedTrackTableAll] = useState([])
    const [openOverLay, setOpenOverLay] = useState(false)
    const [openSoundPlay, setSoundPlay] = useState(false)
    const [playingAudio, setPlayingAudio] = useState(0)

    // For triggaring event
    const [selectedPlayButton, setSelectedPlayButton] = useState("")

    const docServer = docServerUrl

    const setSelectedPage = param => {
        setSelectedFilter(param)
        if (param === "All") {
            setTrackTable(trackTableAll)
            setFeaturedTrackTable(featuredTrackTableAll)
        }
        else {
            setTrackTable(trackTableAll.filter(entry => entry.genre === param))
            setFeaturedTrackTable(featuredTrackTableAll.filter(entry => entry.genre === param))
        }
        stopSound()
    }

    useEffect(() => {
        console.log("SSSSSSSSSSSSSSSSSSSs")

        axios.get(httpUrl +  'genre')
            .then((result) => {
                let responseJson = result.data;
                setGenreTable(responseJson)
            });
        axios.get(httpUrl +  'soundTrack?status=PUBLISHED&track=NON_FEATURED')
            .then((result) => {
                let responseJson = result.data;
                console.log("responseJsonnnnnnnnnnnn",responseJson)
                setTrackTable(responseJson)
                setTrackTableAll(responseJson)
                setFeaturedTrackTable(responseJson.filter(entry => entry.tracktype === "FEATURED"))
                setFeaturedTrackTableAll(responseJson.filter(entry => entry.tracktype === "FEATURED"))
                console.log(responseJson)
            });

        // axios.get(httpUrl +  'soundTrack?status=PUBLISHED')
        //     .then((result) => {
        //         let responseJson = result.data;
        //         setTrackTable(responseJson)
        //         setTrackTableAll(responseJson)
        //         setFeaturedTrackTable(responseJson.filter(entry => entry.tracktype === "FEATURED"))
        //         setFeaturedTrackTableAll(responseJson.filter(entry => entry.tracktype === "FEATURED"))
        //     });

    }, [])

    // const wavesurferUse = (incomingPath) => {
    //     setPlay(false);

    //     if (waveformRef.current) {
    //         wavesurfer.current = WaveSurfer.create({
    //             container: waveformRef.current,
    //             waveColor: "#eee",
    //             progressColor: "OrangeRed",
    //             cursorColor: "OrangeRed",
    //             barWidth: 3,
    //             barRadius: 3,
    //             responsive: true,
    //             height: 50,
    //             normalize: true,
    //             partialRender: true
    //         });

    //         wavesurfer.current.load(docServer + incomingPath);

    //         wavesurfer.current.on("ready", function () {
    //             wavesurfer.current.play();
    //             setPlay(true);

    //         });
    //     }
    //     return () => wavesurfer.current.destroy();
    // };

    // function handlePlayPause(incomingPath, receivedId) {

    //     setPlay(!playing);
    //     if (waveformRef.current.play) {
    //         wavesurfer.current.play();
    //     } else {
    //         wavesurferUse(incomingPath)
    //     }
    // };

    const toTitleCase = (str) => {
        if (str) {
            let convertedStr = str.replaceAll("_", " ");
            return convertedStr.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
        else {
            return ""
        }
    }

    const getTheSong = () => {
        // setOpenOverLay(true)
        props.setIsExplorerOpen()
        stopSound()
    }

    const closeTheSong = () => {
        setOpenOverLay(false)
        props.changeState(2)
    }

    const onlyCloseTheSong = () => {
        setOpenOverLay(false)
    }

    const playSound = (incomingPath, receivedId) => {
        console.log(incomingPath)
        if (openSoundPlay) {
            audio.pause();
            setSoundPlay(false)
        }

        if (playingAudio !== receivedId) {
            if (incomingPath) {
                audio = new Audio(docServerUrl + incomingPath);
                audio.play();
                setSoundPlay(true)
            }
            setPlayingAudio(receivedId)
        }
        else {
            setPlayingAudio(0)
        }
    }

    const stopSound = _ => {
        
        if (audio && openSoundPlay) {
            audio.pause();
            setSoundPlay(false)
        }
    }

    const searchBox = (value) => {
        console.log(value)
        if (value === "") {
            console.log("object1")
            setTrackTable(trackTableAll)
            setFeaturedTrackTable(featuredTrackTableAll)
        }
        else {
            console.log("object")
            setFeaturedTrackTable(featuredTrackTableAll.filter(entry => entry.name.toLowerCase().search(value.toLowerCase()) !== -1))

            setTrackTable(trackTableAll.filter(entry => entry.name.toLowerCase().search(value.toLowerCase()) !== -1 || entry.genre.toLowerCase().search(value.toLowerCase()) !== -1 ||
                entry.composer.toLowerCase().search(value.toLowerCase()) !== -1))
        }
        console.log(trackTableAll)
        console.log("TTTTTTTTTTTTT:",trackTable)
    }

    const [username, userInput] = useInput({ type: "text" }, searchBox);



    return (
        <div className='e_flexSet'>
            <div className="e_searchBox">
                {userInput}
            </div>
            <div className="e_exploreBox">
                <div className="genericBox">
                    <div
                        className={"genericItemBox" + (selectedFilter === 'All' ? " activeGeneric" : "")}
                        onClick={() => { setSelectedPage("All"); }}>
                        All
                    </div>
                    {genreTable.map((entry) => {
                        return (
                            <div
                                className={"genericItemBox" + (selectedFilter === entry.genre ? " activeGeneric" : "")}
                                onClick={() => { setSelectedPage(entry.genre); }}>
                                {toTitleCase(entry.genre)}
                            </div>
                        )
                    })}
                    {/* <div className={"genericItemBox" + (selectedFilter === 'Hip Hop' ? " activeGeneric" : "")} onClick={() => { setSelectedPage('Hip Hop'); }}>Hip Hop</div>
                    <div className={"genericItemBox" + (selectedFilter === 'Bollywood' ? " activeGeneric" : "")} onClick={() => { setSelectedPage('Bollywood'); }}>Bollywood</div>
                    <div className={"genericItemBox" + (selectedFilter === 'Pop' ? " activeGeneric" : "")} onClick={() => { setSelectedPage('Pop'); }}>Pop</div>
                    <div className={"genericItemBox" + (selectedFilter === 'Rock' ? " activeGeneric" : "")} onClick={() => { setSelectedPage('Rock'); }}>Rock</div> */}
                </div>
                <div className="mainExploreBox">
                    <div className="featureBox">
                        <div className="heading">Featured songs</div>
                        <div className="songShow">
                            {featuredTrackTable.map((entry) => {
                                return (
                                    <div className="featureSong" >
                                        {entry.photo ?
                                            <img src={docServer + entry.photo.docpath} alt="img 1" onClick={() => { getTheSong() }} />
                                            :
                                            <img src={featureBox} alt="img 1" onClick={() => { getTheSong() }} />
                                        }
                                        <div className="detailBox" onClick={() => playSound(entry.track.docpath, entry.id)}>
                                            {playingAudio === entry.id ?
                                                <img src={iconPauseBox} alt="icon" />
                                                :
                                                <img src={iconBox} alt="icon" />
                                            }

                                            <div className="songName">
                                                {entry.name}
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}

                            {/* <div className="featureSong">
                                <img src={featureBox} alt="img 1" />
                                <div className="detailBox">
                                    <img src={iconBox} alt="icon" />
                                    <div className="songName">
                                        Black Pink
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="trackSong">
                        <div className="heading">Tracks</div>
                        <div className="showSongs">
                            {trackTable.map((entry) => {
                                return (
                                    <div className="trackShow" onClick={stopSound}>
                                        {/* <div className="imageTrack" onClick={() => playSound(entry.track.docpath, entry.id)} >
                                            {entry.photo ?
                                                <img src={docServer + entry.photo.docpath} alt="trackImg" className="trackImg" />
                                                :
                                                <img src={trackImage} alt="trackImg" className="trackImg" />
                                            }
                                            {playingAudio === entry.id ?
                                                <img src={iconPauseBox} alt="icon" className='upperImage' />
                                                :
                                                <img src={iconBox} alt="icon" className='upperImage' />
                                            }

                                        </div> */}
                                        <div className="buyOutbutton ">
                                            <button onClick={() => { getTheSong() }} style={{ backgroundColor: "#FFC701", color: 'white' }}>
                                                Get Song
                                            </button>
                                        </div>
                                        <div className="trackDetail" style={{ backgroundColor: 'unset !important' }}>
                                            <Waveform
                                                url1={docServer + entry.photo.docpath}
                                                url={docServer + entry.track.docpath}
                                                tracks={entry} id={entry.id}
                                                setSelectedPlayButton={setSelectedPlayButton}
                                                selectedPlayButton={selectedPlayButton}
                                            />
                                        </div>
                                        {/* <div className="trackDetail" onClick={() => playSound(entry.track.docpath, entry.id)}>
                                            <div className="trackName">{entry.name}</div>
                                            <div className="trackAuthor">{entry.composer}</div>
                                        </div> */}
                                        {/* <div className="trackShow">
                                            <Waveform url={docServer + entry.track.docpath} />
                                        </div> */}

                                        {/* <img src={track} alt="trackShow" className="trackShow" onClick={() => playSound(entry.track.docpath, entry.id)} /> */}
                                        {/* <div className="buyOutbutton">
                                            <button onClick={() => { getTheSong() }} >
                                                Get Song
                                            </button>
                                        </div> */}
                                    </div>
                                )
                            })}
                            {/* <div className="songTrack">
                                <img src={trackImage} alt="trackImg" className="trackImg" />
                                <div className="trackDetail">
                                    <div className="trackName">Come Over</div>
                                    <div className="trackAuthor">Mike Mains</div>
                                </div>
                                <img src={track} alt="trackShow" className="trackShow" />
                                <div className="buyOutButton">
                                    Get Song
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {openOverLay && <ExploreOverlay changeState={closeTheSong} onlyCloseTheSong={onlyCloseTheSong} />}
        </div>
    )
}


function useInput({ type }, keyFunction) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => { setValue(e.target.value); keyFunction(e.target.value) }} type={type} placeholder='Search by artist, songs or genre...' />;
    return [value, input];
}