import React from 'react';
// import { UilSearch } from '@iconscout/react-unicons';

function LogoSearch() {
  const logoSearchStyles = {
    display: 'flex',
    gap: '0.75rem',
  };

  const searchStyles = {
    display: 'flex',
    backgroundColor: 'var(--inputColor)',
    borderRadius: '10px',
    padding: '5px',
  };

  const inputStyles = {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
  };

  const sIconStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(106.23deg, #f99827 0%, #f95f35 100%)',
    borderRadius: '5px',
    padding: '4px',
    color: 'white',
  };

  return (
    <div className="LogoSearch" style={logoSearchStyles}>
      {/* <img src={Logo} alt="" /> */}
      <div className="Search" style={searchStyles}>
        <input type="text" placeholder="#Explore" style={inputStyles} />
        <div className="s-icon" style={sIconStyles}>
          {/* <UilSearch /> */}
        </div>
      </div>
    </div>
  );
}

export default LogoSearch;
