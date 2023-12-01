import React from 'react'
import sprite from "../../assets/icons/sprite.svg";
import './messageManager.scss';
import { nodeUrl } from '../../restservice'
export default function MessageManager() {

    // const [selectedUUID, setSelectedUUID] = useState(1)
    // const [chatInput, setChatInput] = useState("")
    // let customerId = JSON.parse(localStorage.getItem('userData')).id


    // const selectChat = () => {
    //     setSelectedUUID(12)
    // }

    // const detectChange = (event) => {
    //     if (event.key === 'Enter') {
    //         console.log("object")
    //         console.log(chatInput)
    //         setChatInput("")
    //     }
    // }
    let url = nodeUrl + 'operator'

    return (
        <div className='flexSet'>
            <div className="content__heading">
                <h1>
                    <svg>
                        <use href={sprite + "#icon-chat"}></use>
                    </svg>
                    Messages
                </h1>
            </div>
            <div className="messageBody">
                {/* <div className="msgBox">
                    <div className="profileBox active" onClick={() => selectChat()}>
                        <div className="profilePic"><img src="https://i.pinimg.com/736x/e8/91/57/e891575d03afba348fa6242e41610215.jpg" alt="User" /></div>
                        <div className="profileDetails">
                            <b>Aman</b>
                            <div>ARM</div>
                        </div>
                    </div>
                </div>
                <div className="chatBox">
                    <div className="showChat">
                        <div className="showChatArea">
                            <div className="clientBox"><span>Hi, I'm there.</span></div>
                            <div className="armBox"><span>Ha bolo</span></div>

                        </div>
                    </div>
                    <div className="sendChat">
                        <input
                            type="text"
                            placeholder='Write your message...'
                            value={chatInput}
                            onKeyDown={detectChange}
                            onChange={event => setChatInput(event.target.value)}
                        />
                    </div>
                </div> */}
                <iframe src={url} className="chatBox" frameBorder="0"></iframe>
            </div>
        </div>
    )
}
