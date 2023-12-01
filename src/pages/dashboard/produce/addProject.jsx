import React, { useState } from 'react';

import sprite from "../../../assets/icons/sprite.svg";
import ShowDetails from './showDetails';
import TrackShow from './trackShow';
// import folderIcon from "../../../assets/foldershow.png";

export default function AddProject(props) {
    const { closeModelFunction } = props


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

            <p style={{textAlign:"left"}}>
                Get a team of the world’s best mixing &amp; mastering engineers,
                singers, songwriters, producers and studio musicians for your
                project
            </p>

            <button onClick={closeModelFunction} className="btn-primary">
                <svg>
                    <use href={sprite + "#icon-folder-plus"}></use>
                </svg>
                New Project
            </button>

            {/* <TrackShow setOpenDetailsBox={props.setOpenDetailsBox} setStoreTracksFolderSection={props.setStoreTracksFolderSection} /> */}
            
        </>
    )
}
