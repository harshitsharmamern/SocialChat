import React, { useState } from 'react'
import Signin from './Signin';
import Register from './Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IsAuth = () => {
    const [isSignIn,setSignin] = useState(true);
    const toggleMode = () => setSignin(!isSignIn);

  return (
    <div>
        <div style={{display:"flex", flexDirection: "column",justifyContent:"center", alignItems:"center"}}>

            {isSignIn ? <Signin/> : <Register/> }
            <button onClick={toggleMode}>

            {isSignIn ? "not have account register your self" : "already have account" } </button>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    </div>
  )
}

export default IsAuth
