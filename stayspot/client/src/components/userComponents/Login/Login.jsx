import React from 'react';
import Navbar from './Navbar';
import LoginCard from './LoginCard';
import LoginCardImage from './LoginCardImage';

function Login() {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex flex-col md:flex-row mt-11">
        <div className="md:w-1/2 ">
          <LoginCardImage />
        </div>

        <div className=" md:w-1/2">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}

export default Login;
