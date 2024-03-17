import jwtDecode from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const isAdmin = () => {
        let token = localStorage.getItem("token") || ''
        if(token){ 
          let user = jwtDecode(token)
          return user.email === 'admin@gmail.com'
        } else {
          return false
        }
    }
  return (
    isAdmin() ? <Outlet/> : <Navigate to="/signin"/>
  )
}

export default AdminRoutes