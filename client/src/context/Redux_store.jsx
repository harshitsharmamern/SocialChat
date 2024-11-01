import { configureStore } from '@reduxjs/toolkit';
import {userReducer } from './UserReducer'
import { SelectedChat } from './Chat_Slice';
export const Redux_store = configureStore({
    reducer: {UserAuth: userReducer , SelectedChat: SelectedChat
     
     },
  })
  
  export default Redux_store;
