import React, { useContext, useEffect } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from '../component/Home/Home.jsx'
// import Demo from '../component/demo/Demo.jsx'
import Demo from '../component/demo2/Demo.jsx'
import {validateToken} from '../component/demo/Api.js'


import IsAuth from '../component/Auth/IsAuth'
import Signin from '../component/Auth/Signin.jsx'
import Register from '../component/Auth/Register.jsx'
const Routing = () => {
  
 
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<IsAuth />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </BrowserRouter>
  )
}


export default Routing
