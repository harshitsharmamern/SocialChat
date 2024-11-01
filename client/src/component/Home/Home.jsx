//dependencies
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//component
import LeftComponent from "./LeftComponent.jsx";
import RightComponent from "./RightComponent.jsx";

///import apis
import { IsValidUser } from "../Apis/IsvalidUser.js";
import config from "../../Config.js";
//context Action
import { setActiveUser } from "../../context/UserReducer.jsx";


///
import BounceLoader from 'react-spinners/BounceLoader';


//
import { io } from 'socket.io-client';



const Home = () => {
  const activeuser = useSelector((state) => state.UserAuth.id);   //curren et  user
  const ChatId = useSelector(state=>state.SelectedChat.ChatId);  //also called room
  const SelectedUser = useSelector(state=>state.SelectedChat.activeChat)
  // const socket = io(config.API_BASE_URL);
  // useEffect(()=>{
       
  //   socket.emit('set-up',ChatId)
  
  // },[ChatId])
  const [loding,setLoding] = useState(false)
  // console.log(activeuser);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    setLoding(true)
    const isvalid = async () => {
      const valid_user = await IsValidUser();
      // console.log(valid_user);
      
      if (!valid_user.status) {   
        setLoding(false)
        navigate('/login')
      }else{
        
        //user kon hai login user kon hai id ,name ,email
        let user_id = valid_user.currUser.user_data._id;
        let user_name = valid_user.currUser.user_data.Name;
        let user_email = valid_user.currUser.user_data.email;
        //all user
        let AllUser = valid_user.user_data;
        dispatch(
          setActiveUser({
            id: user_id,
            name: user_name,
            email: user_email,
            AllUser: AllUser,
          })
        );
        setLoding(false)
      }
    };

    isvalid();
  }, [activeuser, dispatch]);
  // console.log({SelectedUser});
  
  return (
    <>
    {loding?<Loder/> :
      <div style={{ display: "flex", height: "100vh", margin: "0", padding: "0" }}>
      <div
        style={{
          width: "20%",
          backgroundColor: "red",
          height: "100vh",   // Make the left component take the full viewport height
          overflowY: "auto", // Enable vertical scroll for the left component
        }}
      >
          <LeftComponent />
        </div>
        <div style={{ flex: 1, height: "100vh", overflowY: "auto" }}> {/* Add overflowY for independent scrolling */}
        {Object.keys(SelectedUser).length === 0 ?<div style={right_component}>
           Select user {" "}<span style={{color:"pink", padding:"10px"}}> to send message </span> </div>: <RightComponent />}
         {/* <RightComponent /> */}
        </div>
      </div>
}
    </>
  );
};
const Loder = ()=>{
  return (<>
    <div style={loaderContainer}> 
       <BounceLoader  /> </div>
  </>)
}
const right_component={
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "2rem", // Large font size for prominent text
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  background: "linear-gradient(135deg, #4c669f, #3b5998, #192f6a)", // Gradient background
  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)", // Adds depth to the background

}
const loaderContainer= {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}
export default Home;