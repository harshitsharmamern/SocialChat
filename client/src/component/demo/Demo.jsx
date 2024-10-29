import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import {setAuth} from '../../context/Redux_reducer.jsx'
import axios from 'axios';
import {config,login_user} from './Api.js'
import { useNavigate } from 'react-router-dom';
const Demo = () => {
    const [cred,setCred] = useState({email:"",password : ""})
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const handleChange=(e)=>{
      const {name,value} = e.target
      setCred((prev)=> ({
      ...prev, [name] : value, })
    )
  }
  const handleSubmit=async()=>{

    try {
      const res = await axios.post(login_user, cred,config);
      //backend data =res.json({ status: true,currUser : find_email,authToken :auth_token})
      const {authToken, currUser,status} = res.data
      // isAuthenticated : false,
      // currentUser: null,
      // AuthToken : localStorage.getItem("token")
      if(status){
        localStorage.setItem("token", authToken)
        dispatch(setAuth({isAuthenticated : true,currentUser : currUser , AuthToken:authToken}))
        Navigate('/home')
      }else{
        console.error('wrong_cred:');
      }
  }catch (error) {
    console.error('Login failed:', error);
    // alert('Invalid credentials');
  }
}
    return (
    <>
          {/* Name: <input name="name" type="text" value={cred.name} onChange={handleChange} /> */}
            <br />
            Email: <input name="email" type="text" value={cred.email} onChange={handleChange} />
            <br />
            Password: <input name="password" type="text" value={cred.password} onChange={handleChange} />
          <button onClick={handleSubmit}> submit</button>  
       </>
  
  )
}

export default Demo
