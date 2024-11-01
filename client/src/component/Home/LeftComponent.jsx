//dependencies
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//redux action
import { setChat } from "../../context/Chat_Slice";
import config from "../../Config";
import { getChatId } from "../Apis/IsvalidUser";


const LeftComponent = React.memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const AllUser = useSelector(state=>state.UserAuth.AllUser)

  const currentUser = useSelector(state=>state.UserAuth)
  
  const handlesetuser=async (data)=>{
    
    const getchatidroute = await getChatId({senderId : data._id})
    console.log("chatid:" ,getchatidroute);
    
    
    dispatch(setChat({activeChat: {id : data._id , name : data.Name , email : data.email,
      },  ChatId : getchatidroute
    }))
    // dispatch(setChat({activeChat :{id : data._id , name : data.Name , email : data.email,
    //     }, ChatId :getchatidroute  } ))
    console.log("dikat");
      // console.log({ data, getchatidroute});
      
    }    
    const handleLogout=()=>{
      console.log("remve token");
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
})

export default LeftComponent

const eachuser={
  border:"2px solid white", 
  flex:1,
  marginLeft:"12px", padding:"2px",marginTop:"20px" , fontWeight: "bold"

}