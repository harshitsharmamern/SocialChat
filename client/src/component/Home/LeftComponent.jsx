//dependencies
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//redux action
import { setChat } from "../../context/Chat_Slice";


const LeftComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const AllUser = useSelector(state=>state.UserAuth.AllUser)
    const currentUser = useSelector(state=>state.UserAuth)
    const handlesetuser=(data)=>{
      dispatch(setChat({activeChat: {id : data._id , name : data.Name , email : data.email}}))
    }    
    const handleLogout=()=>{
      localStorage.removeItem("token")
      navigate("/login")
    }
    const filteruser = AllUser.filter(user=> user._id!=currentUser.id)
  
    
  return (
    <>
    <div>
      <div style={{backgroundColor:"yellow"}}>
        <button onClick={handleLogout}>Logout</button>
        curr user : {currentUser.name}
        </div>
      <div>  
        {
          filteruser.map((user)=>{return (<> 
        <div style={eachuser} onClick={(e)=>handlesetuser(user)} key={user._id}>{user.Name}</div>
        </>)})
      }
      </div> 
    </div>
    </>  )
}

export default LeftComponent

const eachuser={
  border:"2px solid white", 
  flex:1,
  marginLeft:"12px", padding:"2px",marginTop:"20px" , fontWeight: "bold"

}