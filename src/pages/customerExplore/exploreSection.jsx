import userEvent from '@testing-library/user-event';
import React, { useState } from 'react'
import ShowExploreData from "./showData";
import SubmitData from './submitData';

export default function ExploreSection() {
    const [selectedPage, setSelectedPage] = useState(1)
    const [selectedPrice, setSelectedPrice] = useState(0)
    const [selectedTrackId, setSelectedTrackId] = useState(0)
    const [selectedLicense, setSelectedLicense] = useState('')
    const changeState = input => {
        setSelectedPage(input)
    }

    const managepage =()=>{
        setSelectedPage(1)
    }
    return (
        <div>
            {
                selectedPage === 1 ?
                    <ShowExploreData 
                        changeState={changeState} 
                        setSelectedPrice={setSelectedPrice} 
                        setSelectedTrackId={setSelectedTrackId} 
                        setSelectedLicense={setSelectedLicense}
                    /> :
                    <SubmitData goback={managepage} selectedPrice={selectedPrice} selectedTrackId={selectedTrackId} selectedLicense={selectedLicense} />
            }
        </div>
    )
}
