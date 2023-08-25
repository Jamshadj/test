import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import OtpInput from 'react18-input-otp';
import { postUserOtp } from '../../../api/userApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postHostOtp } from '../../../api/hostApi';

const OTPModal = ({ onClose, formData }) => {
  const [otp, setOtp] = useState('');
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleOtpChange = (value) => {
    setOtp(value);
    setInvalidOtp(false);
  };

  const handleClose = () => {
    onClose(); // Call the onClose function provided through props
    console.log('Close button clicked');
  };

  const handleDone = async () => {
    try {
      let response;
      if (formData.user) {
        response = await postUserOtp(otp, formData);
        if (!response.data.err) {
          dispatch({type:'refresh'})
          console.log(response.data);
         return navigate('/')
        } else {
          setError(response.data.message);
        }
      } else if (formData.host) {
        response = await postHostOtp(otp, formData);
        if (!response.data.err) {
          console.log('hostsignup completed');
          dispatch({type:'refresh'})
          console.log(response.data);
         return navigate('/host')
        } else {
          setError(response.data.message);
        }
      }
      console.log("helo",formData);
 
    } catch (error) {
      // Handle error logic here
    }
  };

  return (
    <div id="container" className="z-10 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[500px] h-[500px] flex flex-col rounded-3xl m-2">
        <div className="flex flex-row-reverse text-4xl p-4 border-b-2 border-black">
          <button onClick={handleClose}>
            <AiFillCloseCircle />
          </button>
        </div>
        <div className="h-full w-full flex items-center justify-center flex-col">
          <h1 className="text-3xl font-medium mb-8">Enter OTP</h1>
          <p>OTP was sent to {formData.email}</p>
          <OtpInput
            separator={<span className="p-6 shadow-2xl"> </span>}
            inputStyle="md:text-7xl text-4xl shadow-2xl border-2 rounded-xl"
            value={otp}
            onChange={handleOtpChange}
          />
          {invalidOtp && <p className="text-red-600 text-xl pt-5">Invalid OTP</p>}
          <button
            className="bg-green-500 hover:bg-green-600 rounded-3xl h-16 w-[60%] text-lg font-medium mt-6 p-4 uppercase"
            onClick={handleDone}
          >
            Done
          </button>
          {error && <p className="text-red-500 mt-4 text-center font-normal">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
