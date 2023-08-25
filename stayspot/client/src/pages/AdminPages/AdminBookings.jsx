import React from 'react'
import SideDrawer from '../../components/adminComponents/Sidebar/SideDrawer'
import Bookings from '../../components/adminComponents/Bookings/Bookings'

function AdminBookings() {
  return (
    <div>
        <SideDrawer/>
       <Bookings/>
    </div>
  )
}

export default AdminBookings