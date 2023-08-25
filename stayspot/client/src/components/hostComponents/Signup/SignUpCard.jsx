import React ,{useState}from 'react'
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OTPModal from '../../userComponents/Otp/Otp';
import { hostSignUpSchema } from '../../../validations/signUpValidation';
import { postSignUp } from '../../../api/hostApi';
import { Link } from 'react-router-dom';

import HostGoogleAuth from '../HostGoogleAuth/HostGoogleAuth';
function SignUpCard() {
    const [error, setError] = useState('');
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const addServiceClose = () => setShowOTPModal(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(hostSignUpSchema),
    });
  
    const onSubmit = async (data) => {
      try {
        const response = await postSignUp(data);
        console.log("@#@$$$$#$", response);
        if (!response.data.err) {
          console.log("he");
          setFormData({ ...data, host: "host" });
          setShowOTPModal(true);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        // Handle error logic here
      }
    };
  return (
   
    <div className="max-w-80 sm:max-w-96 md:w-[30rem]" >
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8" style={{ height: "50rem" }}>
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
             Host Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 space-y-6">
                <Input
                  size="lg"
                  label="First Name"
                  {...register("firstName")}
                  className={`border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.firstName.message}
                  </p>
                )}

                <Input
                  size="lg"
                  label="Last Name"
                  {...register("lastName")}
                  className={`border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.lastName.message}
                  </p>
                )}

                <Input
                  size="lg"
                  label="Email"
                  {...register("email")}
                  className={`border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.email.message}
                  </p>
                )}

                <Input
                  size="lg"
                  label="Phone Number"
                  {...register("phoneNumber")}
                  className={`border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.phoneNumber.message}
                  </p>
                )}

                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  {...register("password")}
                  className={`border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.password.message}
                  </p>
                )}

                <Input
                  type="password"
                  size="lg"
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  className={`border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="mt-6" fullWidth>
                Register
              </Button>
              {error && (
                <p className="text-red-500 mt-4 text-center font-normal">
                  {error}
                </p>
              )}
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to={"/host/login"}>Sign In</Link>
              </Typography>
              <HostGoogleAuth/>
            </form>
          </Card>
        </div>
        {showOTPModal && (
          <OTPModal onClose={addServiceClose} visible={showOTPModal} formData={formData} />
        )}
      </div>
   

  )
}

export default SignUpCard