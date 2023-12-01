import React, { useState,useEffect } from 'react'
// import './trackShow.scss'
// import sprite from "../../../assets/icons/sprite.svg";
// import folderIcon from "../../../assets/material-design-folder-icon-0.jpeg";
// import folderIcon from "../../../assets/foldershow.png";
import folderIcon from "../../../assets/foldershow1.jpg";
// import folderIcon from "../../../assets/foldershow.png";
import axios from 'axios';
import sprite from "../../../assets/icons/sprite.svg";
import Swal from 'sweetalert2';
// import Folder2 from "../../../assets/folder2.jpg"
// import Folder3 from "../../../assets/folder3.jpg"
// import Folder4 from "../../../assets/folder4.jpg"
import ShowDetails from './showDetails';
import { httpUrl } from '../../../restservice'

export default function TrackShow(props) {

    const [trackData, setTrackData] = useState([])
    const [featuredTrackData, setFeaturedTrackData] = useState([])
    const [nonFeaturedTrackData, setNONFeaturedTrackData] = useState([])
    const {trackshowdetails} = props
   
  
   

   
    // const [backpagescreen,setbackpagescreen]=useState()

   

    useEffect(() => {
        // alert('its work')
        if (JSON.parse(localStorage.getItem("userData"))) {
            let userId = JSON.parse(localStorage.getItem("userData")).id
            axios.get(httpUrl +  'soundTrack/license?customer=' + userId)
                .then(function (response) {
                    setTrackData(response.data)
                    setFeaturedTrackData(response.data.filter(entry => entry.licensetype === "NON_EXCLUSIVE"))
                    setNONFeaturedTrackData(response.data.filter(entry => entry.licensetype !== "NON_EXCLUSIVE"))
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
    }, []);

   
    const changePage = (getParam)=> {
        trackshowdetails(getParam)
        
        // props.setOpenDetailsBox(false)
        // props.setStoreTracksFolderSection(getParam)
    }

    


    return (
        <div>
           <div className="content__heading" style={{marginLeft:"42px"}}>
                <h1>
                    <svg>
                        <use href={sprite + "#icon-folder"}></use>
                    </svg>
                    Tracks
                </h1>
            </div>
        <div className='trackMainBox'>
            <div className="showMasterFolder1">
                <div className=" folderHover" onClick={() => changePage("EXCLUSIVE")}>
                    <h4>
                        <img src={folderIcon} alt="folder" className='iconFolder' />
                    
                    </h4>
                    <label>Licensed<br/>Tracks</label>
                </div>
                <div  className=" folderHover1"  onClick={() => changePage("NON_EXCLUSIVE")}>
                    <h4>
                        {/* <img src={Folder4} alt="folder" className='iconFolder' /> */}
                        <img src={folderIcon} alt="folder" className='iconFolder' />
                        {/* Non-Exclusive<br/>Tracks */}
                    </h4>
                    <label>Non-Exclusive<br/>Tracks</label>
                </div>
            </div>
            {/* <div className="content__heading">
                <h1>
                    <img src={folderIcon} alt="folder" className='iconFolder' />
                    Licensed Tracks
                </h1>
            </div>
            <div className="showFolder">
                {featuredTrackData.map(entry => {
                    return <div className="folderBox">
                        <svg>
                            <use href={sprite + "#icon-folder"}></use>
                        </svg>
                        {entry.name}
                    </div>
                })}

            </div>

            <div className="content__heading">
                <h1>
                    <svg>
                        <use href={sprite + "#icon-folder"}></use>
                    </svg>
                    Non Exclusive Tracks
                </h1>
            </div>
            <div className="showFolder">
                {nonFeaturedTrackData.map(entry => {
                    return <div className="folderBox">
                        <svg>
                            <use href={sprite + "#icon-folder"}></use>
                        </svg>
                        {entry.name}
                    </div>
                })}

            </div> */}

            <div className="showDetailsOfTrack">
            {/* <ShowDetails /> */}
            </div>
        </div>
        </div>
    )
}
