import React, { useState } from 'react'
import ShowDetails from './produce/showDetails';
import TrackShow from './produce/trackShow';
// import Swal from "sweetalert2"; 




let param = ""
export default function Manageroutetrack() {

  const [pageSelection, setPageSelection] = useState(1)
  const [check, setcheck] = useState(true)



  const trackgopage = () => {
    //  alert(check)
    setcheck(true)
    setPageSelection(1)
  }


  const trackshowdetails = (sendableparam) => {
    // alert(check)
    setcheck(false)
    param = sendableparam
    setPageSelection(2)
  }


  return (

    <>
      {
        pageSelection === 1 ?
          <TrackShow trackshowdetails={trackshowdetails} />
          :
          <ShowDetails param={param} check={check} goback={trackgopage} />

      }
    </>



  )
}
