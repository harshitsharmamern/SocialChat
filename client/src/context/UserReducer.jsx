// src/redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

///kon hu mai
const initialState = {
    id: '',
    email: '',
    name: '',
    AllUser : [],
    token : localStorage.getItem("token")
  };
const AuthUser = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setActiveUser :(state,action)=>{
         state.id = action.payload.id;
         state.email = action.payload.email;
         state.name = action.payload.name;
         state.AllUser = action.payload.AllUser;
         state.token = action.payload.AuthToken;
       },
  }, 
});

export const {setActiveUser} =  AuthUser.actions;

export const userReducer = AuthUser.reducer;

