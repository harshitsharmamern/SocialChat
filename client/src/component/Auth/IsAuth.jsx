import React, { useEffect, useState } from 'react'
import Signin from './Signin';
import Register from './Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IsValidUser } from '../Apis/IsvalidUser';
import { useNavigate } from "react-router-dom"


const IsAuth = () => {
  const pageRoute = useNavigate()

  useEffect(()=>{
      const result = async()=>{
            const res= await IsValidUser()
            console.log(res);
            if(res.status){
              pageRoute('/home')
            }else{
              pageRoute('/login')
            }
            
          }
          result()
  },[pageRoute])
  return (
    <div>
        Looding
    </div>
  )
}

export default IsAuth
