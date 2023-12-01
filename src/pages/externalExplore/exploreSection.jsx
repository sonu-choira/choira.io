import React, { useState } from 'react'
import ShowExploreData from "./showData";
import SubmitData from './submitData';

export default function ExternalExploreSection(props) {
    const [selectedPage, setSelectedPage] = useState(1)

    const changeState = input => {
        setSelectedPage(input)
    }

    const openLogin = () => {
        if (props.isLogin) {
            props.gotoDashboard()
        } else {
            props.setIsLoginOpen(true)
        }
        
    }
    return (
        <div>
            {
                selectedPage === 1 ?
                    <ShowExploreData changeState={changeState} setIsExplorerOpen={openLogin} /> :
                    <SubmitData />
            }
        </div>
    )
}
