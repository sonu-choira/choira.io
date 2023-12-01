import React, { useState } from 'react'
import ManageProject from './manageProject'
import FormProject from './project/FormProject'
import ReactModal from "react-modal";
// import FormMain from "../dashboard/produce/projectForm/FormMain";
import FormMain from "../../dashboard/produce/projectForm/FormMain";
// import ShowDetails from "../../dashboard/produce/showDetails"
// import Swal from "sweetalert2"; 



ReactModal.setAppElement("#root");
let projectid
let isLoaded = true
export default function Managetwopage(props) {

    const [pageSelection, setPageSelection] = useState(1)
    const [openDetailsBox, setOpenDetailsBox] = useState(true)
    const [storeTracksFolderSection, setStoreTracksFolderSection] = useState("")
    const [isOpen, setIsOpen] = useState(false);

    const backpage=()=>{
        setPageSelection(1)
    }

   const backmanagepage =(senableid)=>{
    projectid = senableid
       setPageSelection(2)
    //    alert(projectid)
   } 

   function toggleModal() {
    setIsOpen(!isOpen);
  }
  function projectDone() {
    isLoaded = false
    setPageSelection(1)
  }
  const goback=()=>{
    setOpenDetailsBox(true)
  }

    return (
    
     <div id="Wrapper">
         <main>
            
                 {
                    pageSelection === 1?
                   <ManageProject closeModelfunction={toggleModal}  backmanagepage={backmanagepage}/>
                   :
                   pageSelection === 2?
                   <FormProject goback={backpage} projectid={projectid}/>
                   :null
                   
                }
       
        </main>
        <ReactModal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <FormMain toggleModals={toggleModal} changePage={projectDone} />
                    {/* <button onClick={toggleModal}>Close modal</button> */}
                </ReactModal>
                </div>
        


    )
}
