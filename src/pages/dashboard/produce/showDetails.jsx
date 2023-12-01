import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import sprite from "../../../assets/icons/sprite.svg";
import featureBox from "../../../assets/explore/img1.png"
import iconPauseBox from "../../../assets/explore/pause.png"
import iconBox from "../../../assets/explore/playButton.png"
import iconDown from "../../../assets/down-arrow.png"
import './trackShow.scss'
import { httpUrl, docServerUrl } from '../../../restservice'

var audio = null

export default function ShowDetails(props) {

    const [trackData, setTrackData] = useState([])
    const [openSoundPlay, setSoundPlay] = useState(false)
    const [playingAudio, setPlayingAudio] = useState(0)
  
    // const [checkdata,setcheckdata]=useState(false)
   
    const docServer = docServerUrl

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData"))) {
            let userId = JSON.parse(localStorage.getItem("userData")).id
            axios.get(httpUrl +  'soundTrack/license?customer=' + userId)
                .then(function (response) {
                    if (props.param === "NON_EXCLUSIVE") {
                        console.log("NON_EXCLUSIVE")
                        setTrackData(response.data.filter(entry => entry.licensetype === "NON_EXCLUSIVE"))
                    } else {
                        console.log("EXCLUSIVE")
                        setTrackData(response.data.filter(entry => entry.licensetype !== "NON_EXCLUSIVE"))
                    }
                    console.log(response)
                    
                   
                   
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unable to get data.',
                        showConfirmButton: false,
                        timer: 3500
                    })
                });
        }
        stopSound();
    }, []);

    //     componentDidMount() {
    //     audio.addEventListener('ended', () => this.setState({ play: false }));
    //   }
    // componentWillUnmount() {
    //     audio.removeEventListener('ended', () => this.setState({ play: false }));  
    //   }
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

    return (

        <div>
            <div className='content' style={{ height: 'auto', overflowX: 'auto' }}>
                <h2 style={{ textAlign: "right", padding: "10px", cursor: "pointer" }} onClick={() => { props.goback(); stopSound() }}>Back</h2>
                <div className="content__heading">
                    <h1>
                        <svg>
                            <use href={sprite + "#icon-folder"}></use>
                        </svg>
                        {props.param === "NON_EXCLUSIVE" ? `Non Exclusive Tracks` : `Licensed Tracks`}
                    </h1>
                </div>
                <div className="showFolder">
                    {trackData.map(entry => {
                        return <div className="featureSong" key={entry.id}>
                            {entry.data.photo ?
                                <img src={docServer + entry.data.photo.docpath} alt="img 1" />
                                :
                                <img src={featureBox} alt="img 1" />
                            }
                            <div className="detailBox">
                                {playingAudio === entry.id ?
                                    <img src={iconPauseBox} alt="icon" onClick={() => playSound(entry.data.track.docpath, entry.id)} />
                                    :
                                    <img src={iconBox} alt="icon" onClick={() => playSound(entry.data.track.docpath, entry.id)} />
                                }

                                <div className="songName" style={{ marginBottom: '-30px' }} >
                                    {entry.data.name}
                                </div>

                                <div style={{ textAlign: 'right' }} >
                                    <a href={docServer + entry.data.track.docpath} target="_blank" className="download">
                                        <img src={iconDown} alt="icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    })}

                </div>
            </div>


        </div>

    )
}
