import React, { useState } from 'react'
import Projectmanage from "./projectmanage"
import Moreproject from "./moreproject"
 


let projectid
let custid
export default function Projectselection(props) {

    const [pageSelection, setPageSelection] = useState(1)
   
    const backpage=()=>{
        setPageSelection(1)
    }

   const backmanagepage =(senableid)=>{
    projectid = senableid
       setPageSelection(2)
       custid = props.userId
    //    alert(props.userId)
   } 

   

    return (
    
     <div>
          {
                    pageSelection === 1?
                    <Moreproject custid={props.userId}  backmanagepage={backmanagepage}/>
                   :
                   pageSelection === 2?
                   <Projectmanage projectid={projectid} goback={backpage} />
                   :null
                   
                }
     </div>


    )
}
