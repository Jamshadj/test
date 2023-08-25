// ReserveRooms.js
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Details from './Details';
import { Button } from "@material-tailwind/react";
import { getListingById, postCheckout } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import axios from '../../../axios'
import Swal from 'sweetalert2';
import { createChat } from '../../../api/chatRequests';
function ReserveRooms() {
  const { user } = useSelector((state) => state);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkInDate = new Date(queryParams.get('checkIn'));
  const checkOutDate = new Date(queryParams.get('checkOut'));
  const listingId = queryParams.get('listingId');
  const guests = queryParams.get('guests');
  const checkInDay = checkInDate.getDate();
  const checkOutDay = checkOutDate.getDate();
  const checkInMonth = checkInDate.toLocaleString('default', { month: 'short' });
  const checkOutMonth = checkOutDate.toLocaleString('default', { month: 'short' });
  const [listing, setListing] = useState(null);
  const [currentGuest, setCurrentGuest] = useState(guests)
  const [currentCheckInDate, setCurrentCheckInDate] = useState(checkInDate);
  const [currentCheckOutDate, setCurrentCheckOutDate] = useState(checkOutDate);

  const navigate=useNavigate()
  const handlePhoneNumberSave = async () => {
    const phoneNumberInput = await Swal.fire({
      title: 'Add Phone Number',
      input: 'number',
      inputAttributes: {
        type: 'tel', // Set input type to "tel" to show numeric keyboard on mobile
        min: 1000000000, // Minimum 10-digit number
        max: 9999999999, // Maximum 10-digit number
        pattern: '[0-9]*', // Allow only numeric input
      },
      inputValidator: (value) => {
        if (!value || value.length !== 10) {
          return 'Please enter a valid 10-digit phone number.';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
    });

    if (phoneNumberInput.isConfirmed) {
      const updatedPhoneNumber = phoneNumberInput.value;
      const userId = user.details._id
      try {
        await axios.patch('/updatephonemunber', { phoneNumber: updatedPhoneNumber, _id: userId });
        // Show success message
        Swal.fire('Phone Number Updated', 'Your phone number has been updated successfully!', 'success');
      } catch (error) {
        console.error(error);
        // Show error message
        Swal.fire('Error', 'An error occurred while updating your phone number.', 'error');
      }
    }
  };

  console.log(checkInDate, "checking date");
  const handleStripePay = async () => {
    try {
      const details = {
        userId: user.details._id,
        hostId: listing.hostId,
        checkInDate: currentCheckInDate,
        checkOutDate: currentCheckOutDate,
        listingId,
        guests: currentGuest,
        numberOfNights: calculateNumberOfNights(),
        totalAmount: calculateTotalAmount() // Ensure this value is a valid numeric value
      };



      const response = await postCheckout(details);
      console.log(response, "ew");
      // Redirect to the Stripe checkout page
      window.location = response.data.URL;
    } catch (error) {
      console.error(error);
    }
  }
  const handleBooking = async () => {
    const { data } = await axios.post("/payment", { amount: calculateTotalAmount() });
    console.log(data, "data");
    if (!data.err) {
      handleRazroPay(data.order);
    }

  };
  const handleDatesChange = (newCheckInDate, newCheckOutDate) => {
    setCurrentCheckInDate(newCheckInDate);
    setCurrentCheckOutDate(newCheckOutDate);
    // ... (any additional logic you want to perform when dates change)
  };

  const handleGuestsChange = (newGuests) => {
    setCurrentGuest(newGuests)
  };


  const handleRazroPay = async (order) => {
    const details = {
      userId: user.details._id,
      hostId: listing.hostId,
      checkInDate: currentCheckInDate,
      checkOutDate: currentCheckOutDate,
      listingId,
      guests: currentGuest,
      numberOfNights: calculateNumberOfNights(), // You should have a function to calculate this
      totalAmount: calculateTotalAmount() // Ensure this value is a valid numeric value
    };

    try {
      console.log(order.id, "order id");
      const options = {
        key: "rzp_test_3qgmRXzHbaIU3G",
        amount: order.amount,
        currency: order.currency,
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          try {
            const { data } = await axios.post("/payment/verify", { details, response });
            console.log(data, "dataaa");
            if (data.err) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
              });
            } else {
              Swal.fire(
                'Success!',
                'Successfully Booked',
                'success'
              );
              navigate("/profile");
            }
          } catch (error) {
            console.error(error);
            // Handle error here
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };


  useEffect(() => {
    async function fetchListing() {
      try {
        const fetchedListing = await getListingById(listingId);
        setListing(fetchedListing.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchListing();
  }, [listingId]);
  let dateDisplay;

  if (checkInMonth === checkOutMonth) {
    dateDisplay = `${checkInDay}-${checkOutDay} ${checkInMonth}`;
  } else {
    dateDisplay = `${checkInDay} ${checkInMonth}-${checkOutDay} ${checkOutMonth}`;
  }

  const calculateNumberOfNights = () => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const timeDiff = Math.abs(currentCheckOutDate - currentCheckInDate);
    const numberOfNights = Math.ceil(timeDiff / oneDay);
    return numberOfNights;
  };

  const calculateTotalAmount = () => {
    const pricePerNight = listing && listing.pricePerNight;
    const numberOfNights = calculateNumberOfNights();

    return pricePerNight * numberOfNights;
  };


  const messageHost=async()=>{
    if (user.details && listing) {
      console.log("ggg");
      try {
        const response = await createChat({
          userId: user.details._id,
          hostId: listing.hostId,
        });
        navigate('/chat');
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
      <div>
        <Navbar reservation={true} />
      </div>
      <div className='pb-20 pt-20'>
        <div className='md:m-10 lg:m-20'>
          <div className='md:flex flex-col lg:flex-row'>
            <div className='md:w-full lg:w-1/2 mb-10 md:mb-0'>
              <Details
                checkInDate={currentCheckInDate}
                checkOutDate={currentCheckOutDate}
                guests={currentGuest}
                onDatesChange={handleDatesChange}
                onGuestsChange={handleGuestsChange}
              />
              <hr />
              {/* Required for your trip sections */}
              <div className='mt-3 sm:w-full md:w-full text-black flex'>
                <div>
                  <div className=''>
                    <span className='text-base font-medium ml-4'>
                      Message the host
                    </span>
                  </div>
                  <div>
                    <span className='text-base font-normal text-gray-700 ml-4'>
                      Let the host know why you're travelling and when you'll check in.
                    </span>
                  </div>
                </div>
                <div className='ml-auto'>
                  <Button variant="outlined" onClick={messageHost}>Message</Button>
                </div>
              </div>
              {!user.details.phoneNumber &&
              <div className='mt-3 sm:w-full md:w-full text-black flex'>
                <div>
                  <div>
                    <span className='text-base font-medium ml-4'>
                      Phone Number
                    </span>
                  </div>
                  <div>
                    <span className='text-base font-normal text-gray-700 ml-4'>
                      Add and confirm your phone number to get trip updates.
                    </span>
                  </div>
                </div>
                <div className='ml-auto'>
                  <Button onClick={handlePhoneNumberSave} variant="outlined">
                    Add
                  </Button>
                </div>
              </div>
}
             
              {/* Ground rules sections */}
              <hr />
              <div className='mt-3 text-black'>
                <div>
                  <span className='ml-4 text-xl font-medium text-black'>
                    Pay With
                  </span>
                </div>
                <div className='flex'>
                  <div>
                    <div className='mt-4'>
                      <span className='text-base font-medium ml-4'>
                        Pay using card
                      </span>
                    </div>
                    <div>
                      <span className='text-base font-normal text-gray-700 ml-4'>
                        Let the host know why you're travelling and when you'll check in.
                      </span>
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <Button onClick={handleStripePay} variant="outlined">
                      Pay now
                    </Button>
                  </div>
                </div>
                <div className='flex'>
                  <div>
                    <div className='mt-4'>
                      <span className='text-base font-medium ml-4'>
                        Pay using UPI
                      </span>
                    </div>
                    <div>
                      <span className='text-base font-normal text-gray-700 ml-4'>
                        Let the host know why you're travelling and when you'll check in.
                      </span>
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <Button onClick={handleBooking} variant="outlined">
                      Pay now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:w-1/2  w-72' >
              {/* Images and listing information */}
              <div className='m-8 flex'>
                <div className='md:flex -mr-11'>
                  <div className='md:w-1/3 md:ml-28'>
                    {listing && listing.images && listing.images.length > 0 && (
                      <img className='max-w-[66%] border-r-2 rounded-md' src={listing.images[0]} alt="" />
                    )}
                  </div>
                  <div>
                    <div>
                      <span>
                        {listing && listing.title}
                      </span>
                    </div>
                    <div>
                      <span>
                        {listing && listing.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='md:ml-32' />
              <div className='md:ml-32'>
                <span className='text-lg font-semibold ml-4'>
                  Price details
                </span>
              </div>
              <div className='md:ml-32'>
                <span className='text-sm md:ml-4'>
                  ₹ {listing && listing.pricePerNight} x {calculateNumberOfNights()} nights
                </span>
                <span className='text-sm md:ml-4'>
                  Total: ₹ {calculateTotalAmount()}
                </span>
              </div>
              <hr className='md:ml-32' />
              <div className='md:ml-32'>
                Total: ₹ {calculateTotalAmount()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ReserveRooms;
