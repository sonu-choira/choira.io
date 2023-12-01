import React, { useState } from 'react'
import Swal from "sweetalert2"; 
import ManageEmployees from "./employee";
import Addemployee from "./Addemployee"
import Editemp from './Editemp';
import Adetails from './Adetails';
// import Adduser from '../user/Adduser';

let empid = 0
export default function ShowEmployeePage() {

    const [employeepage, setemployee] = useState(1)
    
    const showaddpage = () => {
        setemployee(2)
    }

    const showManagepage = () => {
        setemployee(1)
    }

    // const showPageemployee = receiveId => {
    //     if(receiveId > 0) {
    //         empid = receiveId;
    //         setemployee(2)
    //     }
    //     else {
    //         Swal.fire({   
    //             icon: 'warning',  
    //             title: "Something Happen",  
    //             text: "Please try again after some time.",  
    //             showConfirmButton: false,  
    //             timer: 5500  
    //         });  
    //     }
    // }  

    const showdetailpage = receiveId => {
        if(receiveId > 0) {
            empid = receiveId;
            setemployee(4)
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
    const displayedit = receiveId => {
        if(receiveId > 0) {
            empid = receiveId;
            setemployee(3)
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

    return (
        <>

        {
            employeepage === 1?
            <ManageEmployees  displayedit={displayedit} showaddpage={showaddpage}  showdetailpage={showdetailpage}/>
            :
            employeepage === 2?
            <Addemployee goBack={showManagepage}/>
            :
            employeepage === 3?
            <Editemp empid={empid}   goBack={showManagepage}/>
            :
            <Adetails empid={empid}   goBack={showManagepage}/>
        }
            {/* {employeepage === 1 ?
                (<ManageEmployees showPageEmployee={showPageemployee} showeditpage={showeditpage}  showdetailpage={showdetailpage} />)
                :
                employeepage === 2 ?
                (<Editemp empid={empid}   goBack={showaddpage}/>)
                :
                employeepage === 3 ?
                <Adetails empid={empid}   goBack={showaddpage} />
                :
                employeepage === 4 ?
                (<Addemployee  goBack={showaddpage}/>)
            :null} */}
        </>
    )
}
