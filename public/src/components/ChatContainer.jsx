import React, { useEffect, useState } from "react";
import Welcome from "./welcome";
import styled from "styled-components";
import ChatInput from "../components/ChatInput";
import { toast } from "react-toastify";
import { sendMessageRoute, getAllMsgsRoute } from "../utils/APIRoutes";
import axios from "axios";

function ChatContainer({ selectedUser, currentUser }) {
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(getAllMsgsRoute, { from: currentUser._id, to: selectedUser._id });
      const data = response.data;
      if(data.status === true){
        setmessages(data.messages);
      }
      else{
        toast.error(data.message);
      }
    }
    fetchData();
  }, [selectedUser, currentUser._id]);

  const handleSendmsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: selectedUser._id,
      message: msg,
    });
  };

  return (
    <Container>
      {selectedUser && (
        <div className="chatBox">
          <div className="header">
            <h1 className="Username">{selectedUser.username}</h1>
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendmsg={handleSendmsg} />
        </div>
      )}
    </Container>
  );
}

export default ChatContainer;

const Container = styled.div`
  padding: 0;
  margin: 0;
  .chatBox {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 10% 89% 10%;
    .header {
      margin: 0;
      padding: 0;
      color: white;
      background-color: black;
      border-top-right-radius: 10px;
      height: 100%;
      .Username {
        font-size: 30px;
        text-align: center;
        position: relative;
        /* bottom: 12px; */
      }
    }
  }
  .chat-messages {
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.2rem 1rem;
        font-size: 1.1rem;
        color: #000000;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border-top-left-radius: 1rem;
        background-color: #4c00ff56;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border-top-right-radius: 1rem;
        background-color: #9900ff40;
      }
    }
  }
`;
