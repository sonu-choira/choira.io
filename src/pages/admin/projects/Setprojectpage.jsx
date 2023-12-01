import React, { useState } from 'react'
import Editpage from './Editpage'
import Swal from "sweetalert2";
import ManageProjects from './project';
import DetailsFormProject from './detailsProject';


let projectId = 0;
let username

export default function Setprojectpage() {

    const [projectSelection, setprojectelection] = useState(1)

    const showeditpage = (receiveId,name) => {
        if (receiveId > 0) {
            projectId = receiveId;
            username = name;
            setprojectelection(2)
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: "Something Happen",
                text: "Please try again after some time.",
                showConfirmButton: false,
                timer: 5500
            });
        }
    }

    const showproject = () => {
        setprojectelection(1)
    }

    const showDetailsProject = (receivedId) => {
        projectId = receivedId
        setprojectelection(3)
    }



    return (
        <>
            {projectSelection === 1 ?
                (<ManageProjects showeditpage={showeditpage}  showDetails={showDetailsProject}/>)
                : projectSelection === 2 ?
                    (<Editpage projectId={projectId} username={username} Back={showproject} />)
                    : (<DetailsFormProject projectId={projectId} Back={showproject} showDetails={showDetailsProject}/>)
            }
        </>
    )
}
