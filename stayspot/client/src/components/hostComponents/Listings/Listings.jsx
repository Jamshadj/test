import React from 'react'
import HostNavbar from '../../hostComponents/HostNavBar/HostNavbar';
import ListingTable from './ListingTable';
function Listings() {
  return (
    <div>
      <div>

      <HostNavbar/>
      </div>
      <div className='m-5'>
        <ListingTable/>
      </div>

    </div>
  )
}

export default Listings