import React, { useState } from 'react'

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { logInSchema } from '../../../validations/logInValidation';
import { Link } from 'react-router-dom';
import { postLogin } from '../../../api/hostApi';
import HostGoogleAuth from '../HostGoogleAuth/HostGoogleAuth';

function LoginCard() {
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(logInSchema),
    });
    const onSubmit = async (data) => {
        try {

            const response = await postLogin(data);

            if (!response.data.err) {
                console.log("login Sucessfull");
                dispatch({ type: "refresh" })
                return navigate('/host')
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            // Handle error logic here
        }
    };
    

    return (

        <div className="max-w-80 sm:max-w-96 md:w-[30rem]">
        <div className="bg-white shadow-lg rounded-lg p-6" style={{ height: "36rem" }}>
                <Card color="transparent" shadow={false}>
                    <Typography className="mb-4 text-center" variant="h4" color="blue-gray">
                        Welcome back StaySpot
                    </Typography>
                    <Typography variant="h4" color="blue-gray">
                        Host Login
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
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don't have an account?{" "}
                            <Link to={"/host/signup"}>
                                Sign Up
                            </Link>
                        </Typography>
                        <HostGoogleAuth/>
                    </form>
                </Card>
            </div>
        </div>

    )
}

export default LoginCard