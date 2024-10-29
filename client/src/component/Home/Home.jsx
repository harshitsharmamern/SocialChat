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

//context Action
import { setActiveUser } from "../../context/UserReducer.jsx";


///
import BounceLoader from 'react-spinners/BounceLoader';



const Home = () => {
  const activeuser = useSelector((state) => state.UserAuth.id);
  console.log({activeuser});
  
  const [loding,setLoding] = useState(false)
  console.log(activeuser);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    setLoding(true)
    const isvalid = async () => {
      const valid_user = await IsValidUser();
      console.log(valid_user);
      
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
  return (
    <>
    {loding?<Loder/> :
      <div style={{ display: "flex", margin: "0", padding: "0" }}>
        <div
          style={{
            minWidth: "20%",
            backgroundColor: "red",
            minHeight: "100vh",
          }}
        >
          <LeftComponent />
        </div>
        <div style={{ flex: "1" }}>
          <RightComponent />
        </div>
      </div>
}
    </>
  );
};
const Loder = ()=>{
  return (<>
     <BounceLoader  />
  </>)
}
export default Home;
