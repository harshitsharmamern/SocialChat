import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import Alluser from "./Alluser";

const Demo = () => {
  const socket = useMemo(() => io("http://localhost:8000"), []); // Adjust URL as needed

  const [message, setmessage] = useState("");
  const [chat, setChat] = useState([]);
  const [roomName, setroomName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currUser, setCurrUser] = useState(null); // Assume current user is fetched from your API
  const [socketid, setSocketid] = useState("");

  const handlechange = (e) => {
    setmessage(e.target.value);
  };

  // Send message to the room
  const handlesubmit = () => {
    if (message.trim() && roomName) {
      socket.emit("message", { message, roomName });
      setmessage("");
    }
  };

  useEffect(() => {
    // On connection
    socket.on("recived-message", (data) => {
      setChat((prev) => [...prev, data]);
    });
    socket.on("connected", (data) => {
      setSocketid(data);
    });

    // You can fetch the current user data here (e.g., from an API)
    // Example: setCurrUser({ _id: "currentUserId", Name: "Current User" });
  }, [socket]);

  // When a user is selected, create a consistent room ID
  const handleUserSelect = (user) => {
    console.log(currUser ,user);
    if (currUser && user) {
      const newRoomName = [currUser._id, user._id].sort().join("-");
      console.log({newRoomName});
      
      setSelectedUser(user);
      setroomName(newRoomName);
      socket.emit("join-room", newRoomName); // Join the room with both users
    }
  };
  
  return (
    <div>
      <div>
        <h3>Connected as: {socketid}</h3>
      </div>
      <hr />
      <div>
        <h3>Chat with: {selectedUser ? selectedUser.Name : "No user selected"}</h3>
        {selectedUser && (
          <div>
            <input type="text" value={message} onChange={handlechange} placeholder="Enter message" />
            <button onClick={handlesubmit}>Send</button>
          </div>
        )}
      </div>
      <br />
      <h4>Chat History:</h4>
      <MessageComponent chat={chat} />
      
      <hr />
      <Alluser onSelectUser={handleUserSelect}  setCurrUser={setCurrUser}/> {/* Pass the function to select user */}
    </div>
  );
};

const MessageComponent = React.memo(({ chat }) => {
  return (
    <ul>
     
      {chat.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </ul>
  );
});

export default Demo;
