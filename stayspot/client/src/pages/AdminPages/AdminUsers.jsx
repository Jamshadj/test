import React from 'react'
import Users from "../../components/adminComponents/UserTable/Users"
import SideDrawer from '../../components/adminComponents/Sidebar/SideDrawer'
function AdminUsers() {
  return (
    <div>
       <SideDrawer/>
      <Users/>
      </div>
  )
}

export default AdminUsers