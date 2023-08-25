import React from 'react'
import logo from "../../../assets/logo/logo.png"
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate=useNavigate()
    return (
        <div className='flex'>
            <div className='w-12 ml-8 flex'>
                <img src={logo} alt="" />
                <p className='text-center pt-4 pl-3 font-semibold '>StaySpot</p>
            </div>
            <div
               onClick={()=>navigate('/login')}
            className='   

        ml-auto
        hidden mr-4
            md:block
            text-sm 
            font-semibold 
            pt-6 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer'>
                Back to StaySpot
            </div>
        </div>
    )
}

export default Navbar