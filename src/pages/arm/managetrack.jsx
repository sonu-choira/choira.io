import React, { useState } from 'react'
// import Swal from "sweetalert2"; 
import Addtrack from './Addtrack';
import Edittrack from './Edittrack';
import Managetracks from './Tracksstatus';



let trackdetailId
export default function ManagepageTrack() {

    const [pageSelection, setPageSelection] = useState(1)

    const showmanagetrack=()=>{
        setPageSelection(1)
    }

   const showaddtrack =()=>{
       setPageSelection(2)
   } 

   const showedittrack =(receiveId)=>{
    trackdetailId = receiveId
    setPageSelection(3)
} 

    return (
        <>

        {
            pageSelection === 1?
            <Managetracks showaddtrack={showaddtrack} showedittrack={showedittrack}/>
            :
            pageSelection === 2?
            <Addtrack goBack={showmanagetrack}/>
            :
            pageSelection === 3?
            <Edittrack trackdetailId={trackdetailId} goBack={showmanagetrack}/>
            :null
           
        }
        
           
        </>
    )
}
