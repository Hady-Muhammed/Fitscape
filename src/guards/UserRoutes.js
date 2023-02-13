import jwtDecode from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes = () => {
  const isUser = () => {
    let token = localStorage.getItem("token") || ''
    if(token){ 
      let user = jwtDecode(token)
      return user.email !== 'admin@gmail.com'
    } else {
      return false
    }
}
  return (
    isUser() ? <Outlet/> : <Navigate to="/signin"/>
  )
}

export default UserRoutes