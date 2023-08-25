import React from 'react'
import Container from '../../userComponents/Container'
import Logo from '../../userComponents/Navbar/Logo'
import Options from './Options'
import MenuItems from './MenuItems'

function Navbar() {
  return (
    <div className='w-[389px] md:w-full bg-white z-10 shadow-sm'>
         <div className='py-3 ' style={{"border":"solid black 0.2px"}}>
            <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                  <Logo/>
                  <Options/>
                  <MenuItems/>
             </div>  
            </Container>
         </div>
    </div>
  )
}

export default Navbar