import React from 'react'
import StaySpot from "../../../assets/images/Signup design.jpg"

function SignUpCardImage() {
  return (
    <div className=" md:w-[30rem] w-96 md:ml-auto" >
    <div className="bg-white shadow-lg rounded-lg p-6" >
      <img src={StaySpot} className='md:h-[40rem] md:w-[27rem] h-[21rem] w-[21rem]' alt="Google Logo" />
    </div>
  </div>
  )
}

export default SignUpCardImage