import React, { Children } from 'react';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import Page from '../Page/Page';
function Home() {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className='pb-20 pt-20'>
        <Page/>
      </div>
    </div>
  );
}

export default Home;
