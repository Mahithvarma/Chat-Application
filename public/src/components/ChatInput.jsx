import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

function ChatInput({handleSendmsg}) {
  const [showemojipicker, setshowemojipicker] = useState(false);
  const [msg, setmsg] = useState("");
  const handleEmojiPickerShow = () =>{
    setshowemojipicker(!showemojipicker);
  };

  const handleChangeMsg = (event) => {
    setmsg(event.target.value);
  }


  const handleEmojiClick = (event, emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setmsg(message);
    
  }

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendmsg(msg);
      setmsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerShow} className='smile-emoji'/>
          {showemojipicker && <Picker className="picker" onEmojiClick={handleEmojiClick}/>}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input type="text" placeholder="Type a message" value={msg} onChange={handleChangeMsg}/>
        <button type="submit">
          <IoMdSend onClick={sendChat}/>
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  background-color: white;
  border-radius: 10px;
  .button-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #7f7f78;
    border-radius: 10px;
    .emoji{
      align-items: center;
      margin: 0 auto;
      color: #e9e9e9;
      height: inherit;
      cursor: pointer;
      .smile-emoji{
        height: 25px;
        width: 25px;
      }
      .picker {
        top: 285px;
        position: absolute;
        background-color: #7f7f78;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        height: 300px !important;
        width: 250px !important;
        background: white !important;
        
      }
      transition: all 0.3s ease;
      &:hover{
        color: #e9e9e9bb;
        transition: all 0.3s ease;
      }
    }
  }
  .input-container{
    display: grid;
    grid-template-columns: 90% 10%;
    input{
      width: 100%;
      padding: 10px;
      border: none;
      outline: none;
      font-size: 15px;
    }
    button{
      background-color: #2e2e2e;
      width: 100%;
      color: white;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover{
        background-color: #4e4e4e;
        transition: all 0.3s ease;
      }
      border-top-right-radius: 10px;
      /* border-bottom-right-radius: 10px; */
      > *{
        height: 20px;
        width: 20px;
      }
    }
  }
`;

// const Container = styled.div`
//   position: absolute;
//   bottom: 85px;
//   display: grid;
//   width: 538px;
//   grid-template-columns: 10% 90%;
//   .button-container{
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     background-color: #7f7f78;
//     border-top-left-radius: 10px;
//     border-bottom-left-radius: 10px;
//     .emoji{
//       align-items: center;
//       margin: 0 auto;
//       color: #e9e9e9;
//       height: inherit;
//       cursor: pointer;
//       .smile-emoji{
//         height: 25px;
//         width: 25px;
//       }
//       .picker {
//         top: 285px;
//         position: absolute;
//         background-color: #7f7f78;
//         border-top-left-radius: 10px;
//         border-bottom-left-radius: 10px;
//         height: 300px !important;
//         width: 250px !important;
//         background: white !important;
        
//       }
//       transition: all 0.3s ease;
//       &:hover{
//         color: #e9e9e9bb;
//         transition: all 0.3s ease;
//       }
//     }
//   }
//   .input-container{
//     display: flex;
//     flex-direction: row;
//     input{
//       width: 90%;
//       padding: 10px;
//       border: none;
//       outline: none;
//       font-size: 15px;
//     }
//     button{
//       background-color: #2e2e2e;
//       width: 10%;
//       color: white;
//       border: none;
//       cursor: pointer;
//       transition: all 0.3s ease;
//       &:hover{
//         background-color: #4e4e4e;
//         transition: all 0.3s ease;
//       }
//       border-top-right-radius: 10px;
//       /* border-bottom-right-radius: 10px; */
//       > *{
//         height: 20px;
//         width: 20px;
//       }
//     }
//   }
// `;

export default ChatInput;
