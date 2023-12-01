import React, { useState } from 'react'
import Addtrack from './Addtrack';
import Managetracks from './managetracks'
import Editpage from './Editpage'

let trackId = 0;
export default function Setpagetracks() {
    const [pageSelection, setPageSelection] = useState(1)

    const showeditpage = (receiveId) => {
        if (receiveId > 0) {
            trackId = receiveId;
            setPageSelection(3)
        }
    }

    const showmanagetrack = () => {
        setPageSelection(1)
    }

    const showaddtrack = () => {
        setPageSelection(2)
    }

    return (
        <>

            {
                pageSelection === 1 ?
                    <Managetracks showaddtrack={showaddtrack} showeditpage={showeditpage} />
                    :
                    pageSelection === 2 ?
                        <Addtrack goBack={showmanagetrack} />
                        :
                        pageSelection === 3 ?
                            <Editpage trackId={trackId} goBack={showmanagetrack} />
                            : null

            }


        </>
    )
}