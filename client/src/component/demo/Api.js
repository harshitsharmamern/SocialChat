import React from 'react'

export const fetch_user = "http://localhost:8000/auth/user_home" 
export const Auth_user = "http://localhost:8000/auth/Auth_user" 
export const login_user = "http://localhost:8000/auth/user_login" 
import axios from 'axios'

export const config ={
    headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') || null
      }
}

  export  const validateToken=async()=>{
        try{
            const validate = await axios.get(Auth_user,config)
            return validate.data

        }catch (error) {
            console.error('Error validating token:', error);
            return null;
          }
    }


// export default Api
