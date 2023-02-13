import jwtDecode from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const LoggedInRoutes = () => {
   const isLoggedIn = () => {
    const token = localStorage.getItem('token')
    return token
   }
   const isAdmin = () => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    return user.email === 'admin@gmail.com'
   }
   const isUser = () => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    return user.email !== 'admin@gmail.com'
   }
  return (
    isLoggedIn() && isAdmin() ? 
    <Navigate to='/dashboard'/> :
    isLoggedIn() && isUser() ?
    <Navigate to='/'/> :
    <Outlet/>
  )
}

export default LoggedInRoutes