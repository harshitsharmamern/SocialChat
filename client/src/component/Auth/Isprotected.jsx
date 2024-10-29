import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Isprotected = () => {
    // useNavigate()
    let token="";
    useEffect(()=>{
        token = localStorage.getItem("token")

        //make fetch request to home page
    },[token])
    
  return (
    <div>
      
    </div>
  )
}

export default Isprotected
