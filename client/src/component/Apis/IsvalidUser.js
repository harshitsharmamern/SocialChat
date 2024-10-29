import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const fetch_user = "http://localhost:8000/auth/user_home" 

export const config ={
    headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') || null
    }
}
export const IsValidUser = async()=>{
    try{
        const validate = await axios.get(fetch_user,config)
 //    res.json({user_data,currUser : req.mongo, message : "you r in home page"})
//  return  res.json({status:false,message:'you mst be logedin to access'})
//  return  res.json({status:false,message:'your token is wrong'})
        // const Navigate = useNavigate();
        // if(!validate.data.status){
        //     Navigate('/login')
        // }
        
        return validate.data
    
    }catch (error) {
        console.error('Error validating token:', error);
        return null;
      }
      
} 


////////////////////
// import React from 'react'
// export const Auth_user = "http://localhost:8000/auth/Auth_user" 
// export const login_user = "http://localhost:8000/auth/user_login" 

