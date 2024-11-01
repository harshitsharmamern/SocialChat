import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
// const fetch_user = "http://localhost:8000/auth/user_home" 
//`http://localhost:8000/auth/registration`
import config from "../../Config"
const fetch_user = `${config.API_BASE_URL}/auth/user_home`
const login_user_api = `${config.API_BASE_URL}/auth/user_login`
const register_user_api = `${config.API_BASE_URL}/auth/registration`
const getChatid_api = `${config.API_BASE_URL}/chat/accessChat`
const getMessages_api = `${config.API_BASE_URL}/message/get/`
const postmessage_api = `${config.API_BASE_URL}/message/send/`
//http://localhost:8000/message/send  post

export const IsValidUser = async()=>{
    try{
        const configCred ={
           headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem("token") 
           }
        }
        // console.log(configCred);
        
        const validate = await axios.get(fetch_user,configCred)
        return  validate.data
    
    }catch (error) {
        console.error('Error validating token:', error);
        return null;
      }
} 

export const login_user_route = async({email,password})=>{
    try{
    return  await fetch(login_user_api,
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
              })
            })

    }catch(e){
        console.log(e);
        return null;
    }
}

export const register_user_route = async({name,email,password})=>{
    try{
        return await fetch(register_user_api,
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
              })
            })

    }catch(e){
        console.log(e);
        return null;
    }
}

export const getChatId = async ({ senderId }) => {
  const configCred = {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token")
      }
  };

  try {
      const response = await axios.post(
          getChatid_api,
          { userId: senderId },  // request body goes here
          configCred              // headers/config go here
      );
      return response.data._id;
  } catch (e) {
      return e;
  }
};

export const fetchmessages_route = async({SelectedChatId})=>{
    const configCred ={
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token") 
        }
        }
        try{
          //  console.log("////////////chala///////////",SelectedChatId);
           
            const data = await axios.get(`${getMessages_api}${SelectedChatId}`
                ,configCred
            )
            
            return data
        }
        catch(e){
            return e
        }
    }

  export const sendMessage_route = async ({ message, sender, chatid }) => {
  const configCred = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem("token"),
    },
  };

  const dataPayload = {
    sender_id: sender,
    content: message,
    ChatId: chatid,
  };

  try {
    const { data } = await axios.post(`${postmessage_api}`, dataPayload, configCred);
    // console.log(data); //most rerender happen
    
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// http://localhost:8000/chat/accessChat
/*
 "sender": "6720a7495630fba8d2e7a696",
  "ChatId": "67228a8778abad558f4cc36b",
  "content" : "this is sedond message by ali to anika"

const chatid = req.body.ChatId
        const content = req.body.content;
        const sender_id = req.body.sender_id;

        
   const chatid = req.body.ChatId
        const content = req.body.content;
        const sender_id = req.body.sender_id;



 const chatid = req.body.ChatId
        const content = req.body.content;
        const sender_id = req.body.sender_id;
  */
