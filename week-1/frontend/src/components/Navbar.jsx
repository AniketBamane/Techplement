import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMyContext } from '../context/context';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { removeUser } = useMyContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    removeUser();
    toast.error("You are Logged out!", {
      duration: 2000,
      style: {
        background: "#FF474C",
        color: "white",
      },
      icon: '😭',
    });
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="px-4 bg-white sticky top-0 z-10">
        <div className="flex justify-between">
          {/* Left part of Navbar */}
          <div className="flex space-x-4">
            <div>
              <NavLink to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-green-500">
                <span className="font-bold text-xl">QuoteMaster</span>
              </NavLink>
            </div>
            {/* Primary Nav Items */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/quotes" className="py-5 px-3 text-gray-700 hover:text-green-500">All Quotes</NavLink>
              <NavLink to="/favourites" className="py-5 px-3 text-gray-700 hover:text-green-500">Favourites</NavLink>
            </div>
          </div>

          {/* Right part of Navbar */}
          <div className="hidden md:flex items-center space-x-1">
            <button onClick={handleLogout} className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Logout</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={toggleDrawer}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20  ${drawerOpen ? 'block' : 'hidden'}`} onClick={toggleDrawer}>
        <div className="fixed inset-y-0 left-0 w-64 bg-white p-4 shadow-lg z-30" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between mb-4">
            <span className="font-bold text-xl">Menu</span>
            <button onClick={toggleDrawer}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <NavLink to="/quotes" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleDrawer}>All Quotes</NavLink>
          <NavLink to="/favourites" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleDrawer}>Favourites</NavLink>
          <button onClick={handleLogout} className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
