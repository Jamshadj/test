import React from 'react';
import { useNavigate } from 'react-router-dom';

function MenuItem({ onClick, label }) {
  const navigate = useNavigate()
  const link = () => {
    navigate(onClick)
  }
  return (
    <div
      onClick={link}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      "
    >
      {label}
    </div>
  );
}

export default MenuItem;
