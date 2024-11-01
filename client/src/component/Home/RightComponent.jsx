import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import UserNavbar from "./RightComponent/UserNavbar";
import { io } from 'socket.io-client';
import { fetchmessages_route, sendMessage_route } from "../Apis/IsvalidUser";
import config from "../../Config";

const RightComponent = React.memo(() => {
  const SelectedUser = useSelector((state) => state.SelectedChat.activeChat);
  const SelectedChatId = useSelector((state) => state.SelectedChat.ChatId);
  const current_user = useSelector((state) => state.UserAuth.id);
  
  const [messages, setMessages] = useState([]);
  const [typemessage, settypemessage] = useState("");
  const [updated, setupdated] = useState({});
  
  // Use a ref to store the socket instance
  const socketRef = useRef(null);
  
  useEffect(()=>{
    socketRef.current = io(config.API_BASE_URL);
    socketRef.current.on('connect', () => {
      console.log('Socket connected with ID:', socketRef.current.id);
    });
  },[])
  ///////////////////////

  useEffect(() => {
    if (socketRef.current) {
      // Join the room for the selected chat
      socketRef.current.emit('join-room', SelectedChatId);

      // Listen for incoming messages
      // socketRef.current.on('recived-message', (msg) => {
      //   console.log('Received message:', msg);
      //   setMessages((prevMessages) => [...prevMessages, msg]);
      // });
    }
  },[SelectedChatId]);

  //////////
  useEffect(() => {
    fetchmessages();
  }, [SelectedChatId,updated]);

////////////////recived
useEffect(() => {
  if (socketRef.current) {
    // Listen for incoming messages only once
    const handleMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    socketRef.current.on('recived-message', handleMessage);

    // Cleanup function to remove the listener
    return () => {
      socketRef.current.off('recived-message', handleMessage);
    };
  }
},[] ); // Empty dependency array to ensure it runs only once

  console.log(messages);
  
  /////////////////////////////
  const handleSendmessage = async () => {
    const data = await sendMessage_route({
      message: typemessage,
      sender: current_user,
      chatid: SelectedChatId,
    });
    
    if (socketRef.current) {
      socketRef.current.emit('send-message', data
        // { SelectedChatId, typemessage }
      );
      console.log('sender socket id : ',socketRef.current.id);


      // socketRef.current.on('recived-message', (data) => {
      //       // console.log({"recived-message : ":data});
            
      //       console.log('Received message:', socketRef.current.id);
      //       // setMessages([...messages, data]);
      //               setMessages((prevMessages) => [...prevMessages, data]);
        
      //     });
    }

    // Ensure socketRef.current is defined before emitting
   
    setupdated(data);
    settypemessage(""); // Clear the input field after sending
    return await data;
  };
  // console.log(messages);
  
  
  const fetchmessages = async () => {
    const { data } = await fetchmessages_route({ SelectedChatId });
    if(socketRef.current)
    socketRef.current.emit('join-room', SelectedChatId);
    // socket.emit('join-room', SelectedChatId);
    setMessages(data.data);
  };

  const hadleChangetypemessage = (e) => {
    settypemessage(e.target.value);
  };

  const messagesEndRef = useRef(null);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);


  return (
    <div style={style_right}>
      <UserNavbar />
      <div style={MessageContainer}>
        <div>
          {messages.length > 0 &&
            messages.map((msg,index) => (
              <div
                key={msg._id}
                style={{
                  display: "flex",
                  justifyContent: msg.sender._id === current_user ? "flex-end" : "flex-start",
                  padding: "5px",
                }}
                ref={index === messages.length - 1 ? messagesEndRef : null} // Attach ref only to the last message

              >
                <div
                  style={{
                    backgroundColor: msg.sender._id === current_user ? "#DCF8C6" : "#FFFFFF",
                    borderRadius: "10px",
                    padding: "10px",
                    maxWidth: "60%",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
        </div>
        <div style={inputcontainer}>
        <textarea
  value={typemessage}
  onChange={hadleChangetypemessage}
  onInput={(e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${Math.min(e.target.scrollHeight, 30)}px`; // Set height based on content up to 30px
  }}
  style={{
    ...message_input,
    overflow: "hidden", // Hide overflow when max height is reached
    maxHeight: "130px",
    resize: "none", // Prevent manual resizing
  }}
  className="message-input"
  placeholder="Type your message..."
/>

          <button onClick={handleSendmessage} style={send_button}>
            send
          </button>
        </div>
      </div>
    </div>
  );
});

export default RightComponent;

// Styles
const message_input = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontsize: "14px",
  boxsizing: "border-box",
};
const inputcontainer = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  // backgroundColor: "#f0f0f0",
  position: "sticky", // Make it sticky
  bottom: 0, // Stick to the bottom
  zIndex: 1, // Ensure it stays on top of messages
};
const MessageContainer={
  padding : "10px",
 
}
const send_button = {
  padding: "10px 15px",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background-color 0.3s ease",
};
const style_right = {
  minHeight: "100vh",
  backgroundColor: "green",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
  padding: "10px",
};

