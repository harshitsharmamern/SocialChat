import React, { useContext, useEffect } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from '../component/Home/Home.jsx'
// import Demo from '../component/demo/Demo.jsx'
import Demo from '../component/demo2/Demo.jsx'
import {validateToken} from '../component/demo/Api.js'


import IsAuth from '../component/Auth/IsAuth'
const Routing = () => {
  
 
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Demo />} /> */}
          <Route path="/login" element={<IsAuth/>} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </BrowserRouter>
  )
}


export default Routing
