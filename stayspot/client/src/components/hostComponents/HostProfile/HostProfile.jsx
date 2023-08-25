import React from 'react';
import HostNavbar from '../HostNavBar/HostNavbar';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { updateDetails, withdrawRequest } from '../../../api/hostApi';
import { Button } from '@material-tailwind/react';

function HostProfile() {
  const dispatch = useDispatch();
  const { host } = useSelector((state) => state);
  console.log(host.details._id);
  const handleEdit = async (field) => {
    const { value } = await Swal.fire({
      title: `Edit ${field}`,
      input: 'text',
      inputValue: host.details[field],
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
        // Call the API to update the host's field
        // const updatedDetails =;
        await updateDetails(host.details._id, { [field]: value }); // Correctly pass hostId and details
        dispatch({ type: 'refresh' });
        Swal.fire('Updated', '', 'success');
      } catch (error) {
        Swal.fire('Failed to update. Please try again.', '', 'error');
      }
    }
  };
  const handleWithdrawRequest = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Withdraw Request',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Amount" type="number" step="0.01" min="0.01" required>
          <input id="swal-input2" max="${host.details.wallet}" class="swal2-input" placeholder="Account Holder Name" type="text" required>
          <input id="swal-input3" class="swal2-input" placeholder="Account Number" type="text" required>
          <input id="swal-input4" class="swal2-input" placeholder="IFSC Code" type="text" required>
          <input id="swal-input5" class="swal2-input" placeholder="Branch" type="text" required>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        preConfirm: () => {
          const request = {
            amount: parseFloat(document.getElementById('swal-input1').value),
            accountHolderName: document.getElementById('swal-input2').value,
            accountNumber: document.getElementById('swal-input3').value,
            ifscCode: document.getElementById('swal-input4').value,
            branch: document.getElementById('swal-input5').value,
          };

          // Custom input validation
          if (isNaN(request.amount) || request.amount <= 0 && request.amount > host.details.wallet) {
            Swal.showValidationMessage('Invalid amount');
            return false;
          }
          if (request.accountHolderName.trim() === '') {
            Swal.showValidationMessage('Account Holder Name is required');
            return false;
          }
          // Add more validation as needed

          return request;
        },
        didOpen: () => {
          // Custom validation or formatting if needed
        },
      });

      if (formValues) {
        formValues.hostId = host.details._id;
        const response = await withdrawRequest(formValues);

        if (response.data.success) {
          dispatch({ type: 'refresh' });
          Swal.fire('Withdrawal Request Submitted amount will be credited into your bank account within 48hours', '', 'success');
        } else {
          Swal.fire('Failed to submit withdrawal request. Please try again.', '', 'error');
        }
      }
    } catch (error) {
      Swal.fire('Failed to submit withdrawal request. Please try again.', '', 'error');
    }
  };


  return (
    <div className="min-h-screen">
      <HostNavbar />
      <div className="">
        <div className="m-10 md:mx-96 border border-gray-300 rounded-lg shadow-sm bg-white p-4">
          <div className="flex justify-center h-60 mx-auto">
            <div>
              <img src={host.details.image} className="rounded-full w-52" alt="Host" />
            </div>
            <div className='mt-auto'>
              <Button variant="outlined" className="rounded-full my-2" >
                Edit
              </Button>
            </div>
          </div>
          {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
            <div className="md:mx-12 md:flex" key={field}>
              <div>
                <span>
                  {field}: {host.details[field]}
                </span>
              </div>
              <div className='ml-auto'>
                <Button variant="outlined" className="rounded-full my-2" onClick={() => handleEdit(field)}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
          <div className="mb-4">
            <p className="text-black font-semibold">Wallet Balance</p>
            <div className="flex justify-between items-center">
              <div>{host.details.wallet}</div>
              <div onClick={handleWithdrawRequest} className="text-blue-500 cursor-pointer" >
                Withdraw request
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-black font-semibold">Balance Amount to be credited</p>
            <div className="flex justify-between items-center">
              <div>{host.details.balance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostProfile;
