import React from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminFooter from '../Components/AdminFooter'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <AdminHeader/>
        <div><Outlet/></div>
        <AdminFooter/>
      
    </div>
  )
}

export default AdminLayout
