import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/context';

const AuthLayout = () => {
  const {token} = useMyContext()
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])
  return (
      <Outlet />
  );
};

export default AuthLayout;
