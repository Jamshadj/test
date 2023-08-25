import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { updateDetails, updateProfile } from '../../../api/userApi';
import Navbar from '../Navbar/Navbar';
import { Button } from "@material-tailwind/react";

function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const profile = user.details.image || "https://imgs.search.brave.com/ltN-AHqc6pHIeJ2056RPITzZ_px0QapnUdkbzH4Uio4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC80NS83OS9t/YWxlLWF2YXRhci1w/cm9maWxlLXBpY3R1/cmUtc2lsaG91ZXR0/ZS1saWdodC12ZWN0/b3ItNDY4NDU3OS5q/cGc";

  const handleEdit = async (field) => {
    const { value } = await Swal.fire({
      title: `Edit ${field}`,
      input: 'text',
      inputValue: user.details[field],
      showCancelButton: true,
      confirmButtonText: 'Save',
      inputValidator: (value) => {
        if (!value) {
          return 'Value is required';
        }
        if (value.length < 3) {
          return 'Value must be at least 3 characters';
        }
        return null; // Return null for no validation errors
      },
    });

    if (value) {
      try {
        // Call the API to update the user's field
        await updateDetails(user.details._id, { [field]: value });
        dispatch({ type: "refresh" }); // Make sure to use the correct action type
        Swal.fire('Updated', '', 'success');
      } catch (error) {
        Swal.fire('Failed to update. Please try again.', '', 'error');
      }
    }
  };
  const isValidImage = (file) => { // Updated function name to isValidImage
    const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleEditProfilePicture = () => {
    Swal.fire({
      title: 'Edit profile',
      input: 'file',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        handleSelectedImage(result.value); // Call the helper function
      }
    });
  };

  // Helper function to handle selected image
  const handleSelectedImage = async (file) => {

    if (file) {
      try {
        const base64Image = await convertToBase64(file);

        // Show loading indicator
        Swal.fire({
          title: 'Updating Profile Picture',
          allowOutsideClick: false,
          showCancelButton: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });

        // Call the updateProfile API with user ID and base64 image
        const response = await updateProfile(user.details._id, base64Image);


        dispatch({ type: "refresh" });
        Swal.fire("Profile Picture Updated", "", "success");
      } catch (error) {
        console.log(error, "error");
        Swal.fire("Failed to update profile picture. Please try again.", "", "error");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar reservation="reservation" />
      <div className="pt-28">
        <div className="m-10 md:mx-96 border border-gray-300 rounded-lg shadow-sm bg-white p-4">
          <div className="flex justify-center h-60 mx-auto">
            <div>

              <img src={profile} className="rounded-full w-52" alt="User" />
            </div>
            <div className='mt-auto'>

              <Button variant="outlined" className="rounded-full my-2" onClick={handleEditProfilePicture}>
                Edit
              </Button>
            </div>
          </div>
          {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
            <div className="md:mx-12 md:flex" key={field}>
              <div>
                <span>
                  {field}: {user.details[field]}
                </span>
              </div>
              <div className='ml-auto'>
                <Button variant="outlined" className="rounded-full my-2" onClick={() => handleEdit(field)}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
