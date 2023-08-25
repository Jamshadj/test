import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from './Categories';

function Navbar({ reservation }) {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-3 ' style={{ border: 'solid black 0.2px' }}>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            {reservation ? (
             null
            ) : <>
            <Search />
            <UserMenu />
          </> }
          </div>
        </Container>
      </div>
      {!reservation && <Categories />}
    </div>
  );
}

export default Navbar;
