import axios from "axios"
export const fetch_user = "http://localhost:8000/auth/user_home" 
export const config ={
    headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') || null
      }
}
export const fetchuser =async()=>{

     const {data} =  await axios.get(fetch_user,config) ;
    //  console.log(data);
     
     return data;
}