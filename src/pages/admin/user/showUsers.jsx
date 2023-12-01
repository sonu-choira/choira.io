import React, { useState } from 'react'
import DetailsUser from './detailsUser'
import ManageUser from './manageUser'
import Swal from "sweetalert2"; 
import Projectmanage from './projectmanage';
import Adduser from './Adduser';
import Edituser from './Edituser';

let userId = 0;
let username

export default function ShowUsers() {

    const [pageSelection, setPageSelection] = useState(1)

    const showDetailsPage = receiveId => {
        if(receiveId > 0) {
            userId = receiveId;
            setPageSelection(2)
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

    const showManagePage = () => {
        setPageSelection(1)
    }

    const showpage = (receiveId,name) => {
        if(receiveId > 0) {
            userId = receiveId;
            username = name;
            setPageSelection(4)
            // alert(username)
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

    const showuseredit = receiveId => {
        if(receiveId > 0) {
            userId = receiveId;
            setPageSelection(5)
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

    const showaddpage = ()=> {
        setPageSelection(3)
    }

    return (
        <>

        {
            pageSelection === 1?
            <ManageUser showDetailsPage={showDetailsPage} showpage={showpage} showuseredit={showuseredit} showaddpage={showaddpage}/>
            :
            pageSelection === 2?
            <DetailsUser userId={userId} goBack={showManagePage}/>
            :
            pageSelection === 3?
            <Adduser goBack={showManagePage}/>
            :
            pageSelection === 4?
            <Projectmanage userId={userId} goBack={showManagePage} username={username} />
            :
            <Edituser userId={userId} goBack={showManagePage} />
        }
        
            {/* {pageSelection === 1 ?
                (<ManageUser showDetailsPage={showDetailsPage} showpage={showpage} showuseredit={showuseredit} showaddpage={showaddpage}/>)
                 :
                 pageSelection === 2 ?
                 (<DetailsUser userId={userId} goBack={showManagePage}/>)
                 :
                 pageSelection === 3 ?
                (<Projectmanage userId={userId} goBack={showManagePage} />)
                :
                pageSelection === 4 ?
                <Adduser goBack={showManagePage}/>
                :
                pageSelection === 5 ?
                <Edituser userId={userId} goBack={showManagePage} />

                
            :null} */}
        </>
    )
}
