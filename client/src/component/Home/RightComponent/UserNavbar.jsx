import React from 'react'
import { useSelector } from 'react-redux'

const UserNavbar = () => {
    
    const SelectedUser = useSelector(state=>state.SelectedChat.activeChat)
    console.log(SelectedUser);
    
  return (
    <div style={{backgroundColor:"orange"}}>
      {SelectedUser.name}
    </div>
  )
}

export default UserNavbar
