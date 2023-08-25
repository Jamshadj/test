import React, { useState } from 'react';
import Navbar from '../../userComponents/Navbar/Navbar';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { logInSchema } from '../../../validations/logInValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { postLogin } from '../../../api/adminApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Login() {
  const [error, setError] = useState('');
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
  });
const dispatch=useDispatch()

  const onSubmit = async (data) => {
    try {
     
      const response = await postLogin(data);
      
      if (!response.data.err) {
        dispatch({type:"refresh"})
        return navigate('/admin')

      } else {
        setError(response.data.message);
      }
    } catch (error) {
      // Handle error logic here
    }
  };

  return (
    <div>
      <Navbar />
    
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-80 sm:max-w-96" style={{ width: "30rem" }}>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
               Admin Login
              </Typography>
              <form className="mt-8 mb-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 space-y-6">
                  <Input
                    size="lg"
                    label="Email"
                    type="email"
                    {...register("email")}
                    className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 mt-1 mb-2">{errors.email.message}</p>}

                  <Input
                    type="password"
                    size="lg"
                    label="Password"
                    {...register("password")}
                    className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.password && <p className="text-red-500 mt-1 mb-2">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                  Login
                </Button>
                {error && <p className="text-red-500 mt-4 text-center font-normal">{error}</p>}
                
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
