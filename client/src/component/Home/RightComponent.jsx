import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNavbar from "./RightComponent/UserNavbar";

const RightComponent = () => {
//   const loged_user = useSelector(state=>state.UserAuth)
//   console.log({loged_user});
  
  return (
    <>
<div style={style_right}>    {/* Message component */}
    <div>
        {/* Message content goes here */}
        <UserNavbar/>
    </div>
    
    {/* Input message type */}
    <div style={{ padding: "10px" }}>
        <input type="text" style={{ width: "100%" }} />
    </div>
</div>
    </>
  );
};

export default RightComponent;

const style_right = {
    minHeight: "100vh", 
    backgroundColor: "green", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-between", 
    boxSizing: "border-box", 
    padding: "10px" // add some padding if needed 
}
