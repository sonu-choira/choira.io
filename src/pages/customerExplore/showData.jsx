import React, { useEffect, useRef, useState } from "react";
import sprite from "../../assets/icons/sprite.svg";
import './showExploreData.scss'
import featureBox from "../../assets/explore/img1.png"
import iconBox from "../../assets/explore/playButton.png"
import iconPauseBox from "../../assets/explore/pause.png"
import trackImage from "../../assets/explore/trackImage.png"
import track from "../../assets/explore/tracks.png"
import axios from 'axios';
import ExploreOverlay from './exploreOverlay';
import { httpUrl, docServerUrl } from '../../restservice'
import Waveform from "./Waveform";
// import WaveSurfer from "wavesurfer.js";
import "./woveStyles.scss"

var audio = null

export default function ShowExploreData(props) {

    const [selectedFilter, setSelectedFilter] = useState("All")
    const [genreTable, setGenreTable] = useState([])
    const [trackTable, setTrackTable] = useState([])
    const [trackTableAll, setTrackTableAll] = useState([])
    const [featuredTrackTable, setFeaturedTrackTable] = useState([])
    const [composername, setcomposer] = useState([])
    const [featuredTrackTableAll, setFeaturedTrackTableAll] = useState([])
    const [openOverLay, setOpenOverLay] = useState(false)
    const [openSoundPlay, setSoundPlay] = useState(false)
    const [playingAudio, setPlayingAudio] = useState(0)
    const [selectedPrice, setSelectedPrice] = useState(0)
    const [selectedTrack, setSelectedTrack] = useState(0)
    const [selectedLicenseType, setSelectedLicenseType] = useState('')
    const [selectednametrack, setselectedname] = useState('')

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
        axios.get(httpUrl +  'genre')
            .then((result) => {
                let responseJson = result.data;
                setGenreTable(responseJson)
            });
        // axios.get(httpUrl +  'soundTrack?status=PUBLISHED&track=NON_FEATURED')
        axios.get(httpUrl +  'soundTrack')
            .then((result) => {
                let responseJson = result.data;
                if(responseJson){
                    setTrackTable(responseJson)
                    setTrackTableAll(responseJson)
                    setcomposer(responseJson)
                    setFeaturedTrackTable(responseJson.filter(entry => entry.tracktype === "FEATURED"))
                    setFeaturedTrackTableAll(responseJson.filter(entry => entry.tracktype === "FEATURED"))
                    console.log(responseJson)
                }
            });
        // httpUrl + 'soundTrack?status=PUBLISHED&track=NON_FEATURED
        axios.get(httpUrl +  'soundTrack?status=PUBLISHED')
            .then((result) => {
                let responseJson = result.data;
                setTrackTable(responseJson)
                setTrackTableAll(responseJson)
                setFeaturedTrackTable(responseJson.filter(entry => entry.tracktype === "FEATURED"))
                setFeaturedTrackTableAll(responseJson.filter(entry => entry.tracktype === "FEATURED"))
                console.log("track")
                console.log(result.data)
            });
        console.log("ShowExploreData:==")
    }, [])

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

    const lastpagego=()=>{
        setOpenOverLay(false)
    }
    const getTheSong = (selectedEntry) => {
        setSelectedPrice(selectedEntry.price)
        setSelectedTrack(selectedEntry.id)
        setSelectedLicenseType(selectedEntry.tracktype)
        setselectedname(selectedEntry.name)
        setOpenOverLay(true)
        stopSound()
    }

    const closeTheSong = () => {
        setOpenOverLay(false)
        props.setSelectedPrice(selectedPrice)
        props.setSelectedTrackId(selectedTrack)
        props.setSelectedLicense(selectedLicenseType)
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
            setcomposer(composername)
        }
        else {
            console.log("object")
            setFeaturedTrackTable(featuredTrackTableAll.filter(entry => entry.name.toLowerCase().search(value.toLowerCase()) !== -1))

            setTrackTable(trackTableAll.filter(entry => entry.name.toLowerCase().search(value.toLowerCase()) !== -1 || entry.genre.toLowerCase().search(value.toLowerCase()) !== -1 ||
                entry.composer.toLowerCase().search(value.toLowerCase()) !== -1))
        }
        console.log(trackTableAll)
        console.log(trackTable)
        console.log("composer")
        console.log(composername)
    }

    const [username, userInput] = useInput({ type: "text" }, searchBox);


    return (
        <div className='flexSet'>
            <div className="content__heading upperSectionShowData" onClick={() => { searchBox() }}>
                <h1>
                    <svg>
                        <use href={sprite + "#icon-music"}></use>
                    </svg>
                    Explore
                </h1>
            </div>
            <div className="searchBox">
                {userInput}
            </div>
            <div className="exploreBox">
                <div className="genericBox">
                    <div
                        className={"genericItemBox" + (selectedFilter === 'All' ? " activeGeneric" : "")}
                        onClick={() => { setSelectedPage("All"); }}>
                        All
                    </div>
                    {genreTable.map((entry) => {
                        return (
                            <div
                                key={entry.id}
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
                                    <div key={entry.id} className="featureSong" >
                                        {entry.photo ?
                                            <img src={docServer + entry.photo.docpath} alt="img 1" onClick={() => { getTheSong(entry) }} />
                                            :
                                            <img src={featureBox} alt="img 1" onClick={() => { getTheSong(entry) }} />
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
                            {trackTable?trackTable.map((entry) => {
                                return (
                                    <div key={entry.id} className="trackShow" >
                                        {/* <div className="imageTrack" onClick={() => playSound(entry.track.docpath, entry.id)} >
                                    <div className="songTrack" >
                                        <div className="imageTrack" onClick={() => playSound(entry.track.docpath, entry.id)} >
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


                                        </div>
                                        <div className="trackDetail" onClick={() => playSound(entry.track.docpath, entry.id)}>
                                            <div className="trackName">{entry.name}</div>
                                            <div className="trackAuthor">{entry.composer},{entry.genre}</div>
                                        </div>
                                        
                                        <Waveform url={docServer + entry.track.docpath} tracks={entry} id={entry.id} />
                                         <img src={track} alt="trackShow" className="trackShow" onClick={() => playSound(entry.track.docpath, entry.id)} /> 
                                        <div className="buyOutButton" onClick={() => { getTheSong(entry) }}>
                                            Get Song
                                        </div> */}

                                        <div className="buyOutbutton">
                                            <button onClick={() => { getTheSong(entry) }} style={{ backgroundColor: "#FFC701", color: 'white' }}>
                                                Get Song
                                            </button>
                                        </div>
                                        <div className="trackDetail" onClick={stopSound}>
                                            <Waveform
                                                url1 = {docServer + entry.photo.docpath}
                                                url={docServer + entry.track.docpath}
                                                tracks={entry} id={entry.id}
                                                setSelectedPlayButton={setSelectedPlayButton}
                                                selectedPlayButton={selectedPlayButton}
                                            />
                                        </div>

                                    </div>
                                )
                            }):null}
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

            {openOverLay && <ExploreOverlay goback={lastpagego} changeState={closeTheSong} selectednametrack={selectednametrack} selectedTrack={selectedTrack} onlyCloseTheSong={onlyCloseTheSong} selectedPrice={selectedPrice} />}
        </div>
    )
}

function useInput({ type }, keyFunction) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => { setValue(e.target.value); keyFunction(e.target.value) }} type={type} placeholder='Search by artist, songs or genre...' />;
    return [value, input];
}