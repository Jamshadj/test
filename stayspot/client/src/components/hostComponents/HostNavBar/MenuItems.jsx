import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../../userComponents/Navbar/MenuItem';
import { postHostLogout } from '../../../api/hostApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function MenuItems() {
  const { host } = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const handleLogout = async () => {
    try {
      console.log("wsw");
      // Ask for logout confirmation
      const shouldLogout = await Swal.fire({
        title: 'Logout Confirmation',
        text: 'Are you sure you want to log out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out',
        cancelButtonText: 'Cancel',
      });

      // If the user confirms the logout, proceed with the logout process
      if (shouldLogout.isConfirmed) {
        const response = await postHostLogout();
        // Dispatch a refresh action to update the user state
        dispatch({ type: 'refresh' });

        // Redirect the user to the login page after successful logout
        navigate('/host/login'); // Replace '/host/login' with your desired login page URL for hosts
      }
    } catch (error) {
      console.error('Error logging out:', error);


    }
  };


  return (
    <div>
      <div
        onClick={toggleOpen}
        className="
       
        border-[1px] 
        border-neutral-200 
        flex 
        flex-row 
        items-center 
        gap-3 
        rounded-full 
        cursor-pointer 
        hover:shadow-md 
        transition
      "
      >
        <div className=" md:block">
          <img
            src={host.details.image}
            alt=" Avatar"
            className="w-10  rounded-full"
          />
        </div>
      </div>
      {isOpen && (
        <div
          className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-1/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
          mt-8
        "
        >
          <div className="flex flex-col cursor-pointer">
            {host && ( // Add missing parenthesis here
              <>
                <div onClick={() => navigate(`/host/profile/${host.details._id}`)}>
                  <MenuItem
                    label="Profile"

                  />
                </div>

                <MenuItem
                  label="Listings"
                  onClick='/host/listings'
                />
                <div onClick={() => navigate('/host/paymenthistory')}>
                  <MenuItem
                    label="Withdraw history"
                  />
                </div>
                <div onClick={() => navigate('/host/chat')}>
                <MenuItem
                  label="Messages"
                  onClick={() => navigate('/my-properties')}
                />
                </div>

                <hr />
                <div onClick={handleLogout}>
                  <MenuItem
                    label="Logout"

                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuItems