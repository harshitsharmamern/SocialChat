import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// const fetch_user = "http://localhost:8000/auth/user_home" 
//`http://localhost:8000/auth/registration`
import config from "../../Config"
const fetch_user = `${config.API_BASE_URL}/auth/user_home`
const login_user_api = `${config.API_BASE_URL}/auth/user_login`
const register_user_api = `${config.API_BASE_URL}/auth/registration`

export const IsValidUser = async()=>{
    try{
        const configCred ={
           headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem("token") 
           }
       }
        console.log(configCred);
        
        const validate = await axios.get(fetch_user,configCred)
        return await validate.data
    
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
// const resp = await fetch(
//     `http://localhost:8000/auth/registration`
//     , {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         //   "auth-token": localStorage.getItem("token"),
//       },
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         password: password
//       })
//     });

// const resp = await fetch(
//     `http://localhost:8000/auth/user_login`
//     , {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password
//       })
//     });



////////////////////
// import React from 'react'
// export const Auth_user = "http://localhost:8000/auth/Auth_user" 
// export const login_user = "http://localhost:8000/auth/user_login" 

