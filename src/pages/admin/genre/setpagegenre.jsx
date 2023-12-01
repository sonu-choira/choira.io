import React, { useState } from 'react'
import Addgenre from './Addgenre'
import Editgenre from './Editgenre'
import Managegenre from './managegenre'
import Swal from "sweetalert2"; 

let genreid = 0
export default function Setpagegenre(){
    const [genrepage, setgenrepage] = useState(1)

    const showaddgenre = () => {
        setgenrepage(2)
    }

    const showmanagegenre = () => {
        setgenrepage(1)
    }

    const showEditgenre = (receiveId) => {
        if(receiveId > 0) {
            genreid = receiveId;
            setgenrepage(3)
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
    return(
        <>

        {
            genrepage === 1?
            <Managegenre  showaddgenre={showaddgenre} showEditgenre= {showEditgenre}/>
            :
            genrepage === 2?
            <Addgenre Backgenre={showmanagegenre}/>
            :
            genrepage === 3?
            <Editgenre genreid={genreid} Backgenre={showmanagegenre} />
            :null
        }
           
        </>
    )
}