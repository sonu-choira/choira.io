import React from 'react'
import sprite from "../../assets/icons/sprite.svg";
import './message.scss';
import axios from "axios";
import { nodeUrl } from '../../restservice';

export default function MessageComponent() {

    // const [selectedUUID, setSelectedUUID] = useState(1)
    const [chatInput, setChatInput] = React.useState(false)
    // let customerId = JSON.parse(localStorage.getItem('userData')).id
    let projectname = '&';
    if (sessionStorage.getItem("project")) {
        projectname = '&' + sessionStorage.getItem("project")
    }

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

    let url = nodeUrl + "customer?name=" + encodeURI(JSON.parse(localStorage.getItem("userData")).name + projectname)




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
            {chatInput ? (
                <div className="messageBody">
                    <div className="msgBox">
                        <div className="profileBox active">
                            <div className="profilePic"><img src="https://choira.io/clogo/chatbotIcon.jpeg" alt="User" /></div>
                            <div className="profileDetails">
                                <b>Artist Relationship Manager</b>
                            </div>
                        </div>
                    </div>

                    <div className="chatBox">
                        {projectname ?
                            <div className="animateBox">
                                <div style={{ paddingTop: '20px', fontSize: '20px' }}>
                                    <div className="chatBox">
                                        <p style={{ fontSize: '18px', marginBottom: '10px' }}>Congratulations Composer! You have successfully created the project <b>{projectname}</b>.</p>
                                        <p style={{ fontSize: '18px', marginBottom: '10px' }}>Do you wish to chat with your Relationship Manager?</p>
                                    </div>
                                </div>
                            </div>
                            : null}
                        <div className="showChat">
                            <div className="showChatArea">
                                <div className="buttonBox" onClick={() => setChatInput(false)}>
                                    Start Chat
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <iframe src={url} className="iframeBody" frameBorder="0"></iframe>
            )}


        </div>
    )
}