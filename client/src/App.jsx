import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import IsAuth from './component/Auth/IsAuth.jsx';
import { useNavigate } from 'react-router-dom';
import Routing from './Routing/Routing.jsx';
// import { store } from './app/store'
// import { Provider } from 'react-redux'
import Redux_store from './context/Redux_store.jsx';
import { Provider } from 'react-redux'; // Import Provider
import Demo from './component/demo2/Demo.jsx';
const App = () => {
  
  
  return (
    <Provider store={Redux_store}>
      {/* <Demo/> */}
       <Routing/>
    </Provider>
  );
};

export default App;
