import React, { useEffect, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import Swal from "sweetalert2";
// import FormProject from "../produce/project/FormProject";
// import InstagramIcon from "../../../assets/foldericon.jpg";
// import folderIcon from "../../../assets/foldershow.png";
import folderIcon from "../../../assets/foldershow1.jpg";
// import folderIcon from "../../../assets/material-design-folder-icon-0.jpeg";
// import image25 from "../../../assets/image25.png";
// import vector from "../../../assets/Vector.png";
import image25 from "../../../assets/musicicon3.png";
import arrow from "../../../assets/arrow.png";
import searchbar from "../../../assets/searchbar.png";
import { httpUrl } from '../../../restservice'
import axios from 'axios';
import "./manageProject.scss"

import { ChoiraLoader } from "../../../components/loader/ChoiraLoader";
// import TrackShow from "./trackShow";
export default function ManageProject(props) {

    const { closeModelfunction } = props
    const [searchterm, setsearchterm] = useState('');
    const [data, setData] = useState([]);
    const [seardata, setsearchdata] = useState([]);
    const { backmanagepage } = props
    // const [username, userInput] = useInput({ type: "text" }, searchBox);

    const submitStyle = {
        marginBottom: '30px'
    };

    // const showAlert = () => {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: "Not Allowed!",
    //         text: "You have already created a project. And currently, we only allow one project",
    //         showConfirmButton: false,
    //         timer: 5500
    //     });
    // }

    useEffect(() => {
        loadData1()
    }, []);



    const loadData1 = () => {
        let userid = JSON.parse(localStorage.getItem("userData")).id;
        const url = httpUrl + 'project?customer=' + userid;
        axios.get(url)
            .then(response => {
                setData([...response.data])
                setsearchdata([...response.data])
            });
    }

    const chnageproject = (id) => {
        backmanagepage(id)
        console.log("okk", id)
    }

    return (
        <>
            <div className="content__heading">
                <h1>
                    <svg>
                        <use href={sprite + "#icon-folder"}></use>
                    </svg>
                    Produce
                </h1>
            </div>

            <p style={{ textAlign: "left" }}>
                Get a team of the world’s best mixing &amp; mastering engineers,
                singers, songwriters, producers and studio musicians for your
                project
            </p>

            <button onClick={closeModelfunction} className="btn-primary" style={submitStyle}>
                <svg>
                    <use href={sprite + "#icon-folder-plus"}></use>
                </svg>
                New Project
            </button>

{/* test */}

            <div style={{ marginTop: "43px" }}>
                <div className="bigdata2">
                    <input className="inputbox" type="text" onChange={(e) => { setsearchterm(e.target.value); }} />

                    <img src={arrow} width="15px" height="15px" alt="arrow" />&nbsp;&nbsp;
                    <img src={searchbar} width="15px" height="15px" alt="search" />

                </div>
                
                {
                    
                    data.filter((val) => {
                        if (searchterm === '') {
                            return true;

                        }
                        else if (
                            val.name.toLowerCase().includes(searchterm.toLowerCase())
                        ) {
                            return true;
                        }

                        else return false

                    }).map(((entry) => (

                        <div key={entry.id} className="rowshow" style={{ cursor: "pointer" }} onClick={() => { chnageproject(entry.id) }}>
                            <div className="columnshow">
                                <div className="textstyle">
                                    <div className="textcontext">
                                        <img src={image25} alt="image" />

                                        <label style={{ cursor: "pointer" }}>{entry.name}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="linecontent"> </div>
                            <div className="columnshow">
                                <div className="textstyle">
                                    <div className="textcontext1">
                                        {
                                            entry.details?
                                            (entry.details.length < 20 ?
                                                <label style={{ cursor: "pointer" }}>{entry.details}</label>
                                                :
                                                <label style={{ cursor: "pointer" }}>{entry.details.substring(0, 20)}...<a style={{ color: "#9e9ea5" }}>Read More</a></label>)
                                                :
                                                <label style={{ cursor: "pointer" }}>- - -</label>

                                        }
                                    </div>
                                </div>

                            </div>

                        </div>

                    )))}
            </div>

            {/* <div className="linecontent"> </div>
          <div>
          {data.map(entry => (
            <div className="contentheading">
            <img src={vector} alt="image" className="contentimage"/>
            <img src={image25} alt="image" className="contentimage1"/>
            {entry.name}
            </div>

          ))} 
          </div> */}





            {/* <div className='trackMainBox'>
                <div className="showMasterFolder">
                    {data.map(entry => (
                        <div key={entry.id} className="folderHover" onClick={() => { chnageproject(entry.id) }}>
                            <h4>
                                <img src={folderIcon} alt="folder" className='iconFolder' />
                            </h4>
                            <label>{entry.name}</label>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* <FormProject /> */}

            {/* <TrackShow setOpenDetailsBox={props.setOpenDetailsBox} setStoreTracksFolderSection={props.setStoreTracksFolderSection} /> */}

        </>
    )
}








//for checkin
