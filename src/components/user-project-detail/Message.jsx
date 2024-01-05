import React, { useState, useRef, useEffect } from "react";

import user from "../../assets/img/dashboard_img/user.jfif";
import clip from "../../assets/img/dashboard_img/clip.svg";
import smile from "../../assets/img/dashboard_img/smile.svg";
import plane from "../../assets/img/dashboard_img/plane.svg";

function Message() {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    const message = messageInputRef.current.value.trim();
    if (message !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sentByUser: true },
      ]);
      // Clear the input after sending the message
      messageInputRef.current.value = "";
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Handle each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          setMessages((prevMessages) => [
            ...prevMessages,
            { file: fileContent, sentByUser: true, fileType: file.type },
          ]);
        };
        reader.readAsDataURL(file);
      }
    }
    // Clear the file input
    fileInputRef.current.value = null;
  };
  const getAlignmentClass = (message) => {
    return isSentByUser(message) ? "sent-message" : "received-message";
  };

  const renderMedia = (message) => {
    if (message.fileType.startsWith("image")) {
      return (
        <img
          src={message.file}
          alt="Uploaded File"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    } else if (message.fileType.startsWith("audio")) {
      return (
        <audio controls>
          <source src={message.file} type={message.fileType} />
          Your browser does not support the audio element.
        </audio>
      );
    } else if (message.fileType.startsWith("video")) {
      return (
        <video controls width="300" height="200">
          <source src={message.file} type={message.fileType} />
          Your browser does not support the video element.
        </video>
      );
    }
    return null;
  };

  const isSentByUser = (message) => {
    return message.sentByUser;
  };

  return (
    <>
      <div className="choira-test-project-section-main-2">
        <div className="message_section">
          <div>
            <div>
              <img src={user} alt="" />
            </div>
            <div>
              <h2>Jackson</h2>
              <h6>Artist Relationship Manager</h6>
            </div>
          </div>
          <div className="">
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${getAlignmentClass(message)}`}
                  style={{
                    backgroundColor: message.text ? "#DCF8C6" : "transparent",
                  }}
                >
                  {message.file ? renderMedia(message) : message.text}
                </div>
              ))}
            </div>
          </div>
          <div>
            <input
              type="text"
              id="messageInput"
              placeholder="Type your message"
              ref={messageInputRef}
              onKeyPress={handleKeyPress}
            />
            <div className="chat-input">
              <img src={smile} alt="" />
              <label htmlFor="fileInput">
                <img src={clip} alt="" />
              </label>
              <img src={plane} alt="" onClick={sendMessage} />
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
