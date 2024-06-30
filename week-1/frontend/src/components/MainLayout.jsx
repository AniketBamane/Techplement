import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Layout from './Layout';
import { useMyContext } from '../context/context';

const MainLayout = () => {
  const {token} = useMyContext()
  const navigate = useNavigate()
useEffect(()=>{
  if(!token){
    navigate("/signup")
  }
},[token])
  return (
    <Layout>
      <Navbar />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
