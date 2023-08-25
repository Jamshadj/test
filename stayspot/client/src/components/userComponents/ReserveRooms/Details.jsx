import React from 'react';
import Swal from 'sweetalert2';

function Details({ checkInDate, checkOutDate, guests, onDatesChange, onGuestsChange }) {
  const handleEditDates = async () => {
    const { value: newDates } = await Swal.fire({
      title: 'Edit Dates',
      html: `
        <input type="date" id="newCheckInDate" value="${checkInDate.toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}">
        <input type="date" id="newCheckOutDate" value="${checkOutDate.toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}">
      `,
      confirmButtonText: 'Save',
      showCancelButton: true,
      preConfirm: () => {
        const newCheckInDate = document.getElementById('newCheckInDate').value;
        const newCheckOutDate = document.getElementById('newCheckOutDate').value;
        return { checkInDate: new Date(newCheckInDate), checkOutDate: new Date(newCheckOutDate) };
      },
    });

    if (newDates) {
      onDatesChange(newDates.checkInDate, newDates.checkOutDate);
    }
  };

  const handleEditGuests = async () => {
    const { value: newGuests } = await Swal.fire({
      title: 'Edit Guests',
      input: 'number',
      inputAttributes: {
        min: 1,
      },
      confirmButtonText: 'Save',
      showCancelButton: true,
    });

    if (newGuests) {
      onGuestsChange(parseInt(newGuests, 10));
    }
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-8">
    <div>
      <span className='text-2xl ml-5 font-semibold'>
        Book Your Stay
      </span>
    </div>
    <div className='ml-8 mt-10'>
      <div>
        <span className='text-xl font-semibold'>
          Your trip
        </span>
      </div>

      <div className='mt-6 sm:w-72'>
        <div className='flex'>
          <div>
            <span className='text-base font-semibold'>
              Dates
            </span>
          </div>
          <div className='ml-auto'>
            <span
              className='text-base pl-auto font-semibold cursor-pointer'
              onClick={handleEditDates}
            >
              Edit
            </span>
          </div>
        </div>
        <div>
          <span>Check-in: {checkInDate.toDateString()}</span>
          <span>Check-out: {checkOutDate.toDateString()}</span>
        </div>
      </div>
      <div className='mt-6 sm:w-72'>
        <div className='flex'>
          <div>
            <span className='text-base font-semibold'>
              Guests
            </span>
          </div>
          <div className='ml-auto'>
            <span
              className='text-base pl-auto font-semibold cursor-pointer'
              onClick={handleEditGuests}
            >
              Edit
            </span>
          </div>
        </div>
        <span>{guests} guest</span>
      </div>
    </div>
  </div>
  );
}

export default Details;
