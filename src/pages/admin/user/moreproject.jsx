import React, { useEffect, useState } from "react";
// import folderIcon from "../../../assets/material-design-folder-icon-0.jpeg";
import folderIcon from "../../../assets/material-design-folder-icon-0.jpeg";

import axios from 'axios';
import "./project.scss"
export default function Moreproject(props) {

    const [data, setData] = useState([]);
    const {backmanagepage}=props
   
    useEffect(() => {
        loadData1()
    }, []);

    const loadData1 = () => {
        let userid = this.props.custid;
        axios.get(httpUrl +  'project?customer=' + userid)
            .then(responce => {
                setData([...responce.data])
                console.log(responce.data)
            });
    }

    const chnageproject = (id) => {
        backmanagepage(id)
    }

    return (
        <>
           <div className='trackMainBox'>
            <div className="showMasterFolder">
            {data.map(entry => (
                <div key={entry.id}  className="content__heading folderHover" onClick={()=>{chnageproject(entry.id)}}>
                    <h1 style={{textAlign:"left"}}>
                      <img src={folderIcon} alt="folder" className='iconFolder' />
                        {entry.name}
                    </h1>
                </div>
            ))}
            </div>
            </div>
        </>
    )
}
