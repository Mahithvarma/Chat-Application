import React from "react";
import Welcome from "./welcome";
import styled from "styled-components";
import ChatInput from "../components/ChatInput";
function ChatContainer({ selectedUser, currentUser }) {
  
  return (
    <Container>
      <div className="header">
        {selectedUser ? (
          <h1 className="Username ">{selectedUser.username}</h1>
        ) : (
          <h1 className="Username">Welcome</h1>
        )}
      </div>
      {
        selectedUser ? ( 
          <h1>Currently empty</h1>
        ): null
      }


      {/* {currentUser ? (
        <div className="chat">
          {selecteduser ? (
            <h1 className="chatbox">Currently empty</h1>
          ) : (
            <Welcome username={currentUser.username} />
          )}
        </div>
      ) : null} */}
      {
        selectedUser && <ChatInput className="inputbar"/>
      }
    </Container>
  );
}

export default ChatContainer;

const Container = styled.div`
    padding: 0;
    margin: 0;
    .header{
      margin: 0;
      padding: 0;
      color: white;
      background-color: black;
      border-top-right-radius: 10px;
      height: 60px;
      .Username{
        font-size: 30px;
        padding: 10px;
        margin: 0;
        text-align: center;
      }
      .chat{
        align-items: center;
        margin: 0px auto;
      }
    }
`;
