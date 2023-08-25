import React from 'react'
import { Button } from "@material-tailwind/react";
import googleLogo from "../../../assets/logo/googlelogo.png"
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from '../../../api/hostApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function HostGoogleAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const login = useGoogleLogin(
      {
          onSuccess: (codeResponse) => {
              console.log("login with google");
              loginWithGoogle(codeResponse)
                  .then((response) => {

                      console.log("res", response);
                      if (response.data.host.blocked) {

                      } else {

                          console.log("auth sucess");
                          dispatch({ type: "refresh" })
                          return navigate('/host')
                      }


                  }).catch((err) => {

                  })
          },
          onError: (error) => {
              console.log("error");

          }
      })
  return (
    <div className='flex flex-col items-center gap-4 '>
        
    <Button
    onClick={login}
    size="lg"
    variant="outlined"
    color="blue-gray"
    className="flex items-center gap-3 w-full justify-center"
  >
    <img src={googleLogo} alt="metamask" className="max-w-[18%]" />
    Continue with Google
  </Button>
  </div>
  )
}

export default HostGoogleAuth