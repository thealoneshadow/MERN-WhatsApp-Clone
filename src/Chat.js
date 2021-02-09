import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon } from "@material-ui/icons";
import React,{useState} from "react";
import "./Chat.css";
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";
function Chat({messages}) {
  const [input,setInput]=useState("");

  const sendMessage= async (e) => {
    e.preventDefault();

    axios.post('/messages/new',{
      message:input,
    name: "Demo",
    timestamp: "11:00", 
    received: false,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
      {messages.map(
        messages => (
          <p className={`chat__message ${messages.received && 'chat__reciever'}`}>
          <span className="chat__name">{messages.name}</span>
          {messages.message}
          <span className="chat__timestamp">{messages.timestamp}</span>
        </p>
        ))}
        <p className="chat__message">
          <span className="chat__name">Divyanshu</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message chat__reciever">
          <span className="chat__name">Divyanshu</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>
      <div className="chat__footer">
      <IconButton><InsertEmoticon /></IconButton>
      
      <form>
      <input value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Type a message" type="text" />
      <button onClick={sendMessage} type="submit">Send a message</button>
     </form>
     <IconButton><MicIcon /></IconButton>
     
      </div>
    </div>
  );
}

export default Chat;
