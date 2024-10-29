// src/redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

const fetch_chat = createSlice({
  name: 'chat',
  initialState:{
    // chats: [],
    activeChat: {},
    // isLoading: false,
    // notifications: [],
  },
  reducers: {
       setChat :(state,action)=>{
         state.activeChat = action.payload.activeChat;
         
       },
  }, 
});

export const {setChat} =  fetch_chat.actions;

export const SelectedChat = fetch_chat.reducer;

