import React, { useEffect, useState } from 'react';
import { fetchuser } from './Api';

const Alluser = ({ onSelectUser,setCurrUser }) => {
  const [alluser, setalluser] = useState([]);
  const [currUser, setcurrUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchuser();
        setalluser(data.user_data);
        setcurrUser(data.currUser.user_data);
        setCurrUser(data.currUser.user_data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUserData();
  }, []);

  const handleclick=(user)=>{
    // console.log("click" , user._id);
    // onSelectUser()
    
    onSelectUser(user)
  }

  const filteredUsers = alluser.filter(user => user._id !== currUser._id);

  return (
    <div>
      
      <div style={{ backgroundColor: "red" }}>
        <h2>Current User:</h2>
        <p>Name: {currUser.Name}</p>
        <p>Email: {currUser.email}</p>
      </div>

      {/* List of all other users */}
      <div>
        {filteredUsers.length > 0 ? (
          <ul>
            {filteredUsers.map(user => (
              <li key={user._id} 
              style={{backgroundColor:"yellow" , margin:"10px" , padding:"2px"}}
              onClick={()=>handleclick(user)}>
                 {/* Click to select user */}
                {user.Name} - {user.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No other users available.</p>
        )}
      </div>
    </div>
  );
};

export default Alluser;
