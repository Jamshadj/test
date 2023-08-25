import React from 'react'
import Host from '../../components/adminComponents/HostTable/Host'
import SideDrawer from '../../components/adminComponents/Sidebar/SideDrawer'

function AdminHosts() {
  return (
    <div>
      <SideDrawer/>
      <Host/>
    </div>
  )
}

export default AdminHosts