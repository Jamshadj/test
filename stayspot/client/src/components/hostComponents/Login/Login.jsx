import React from 'react';
import LoginCard from './LoginCard';
import LoginCardImage from './LoginCardImage';
import Navbar from './Navbar';

function Login() {
 
  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex flex-col md:flex-row mt-11">
        <div className="md:w-1/2 ">
          <LoginCardImage />
        </div>
        {/* Login form section on the right */}
        <div className=" md:w-1/2">
          <LoginCard/>
        </div>
      </div>
    </div>
  );
}

export default Login;
