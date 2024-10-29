// src/redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

///kon hu mai
const initialState = {
    id: '',
    email: '',
    name: '',
    AllUser : []
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
       },
  }, 
});

export const {setActiveUser} =  AuthUser.actions;

export const userReducer = AuthUser.reducer;

