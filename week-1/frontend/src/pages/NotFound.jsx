import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-white px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
          <p className="text-white text-lg mt-8">Sorry, the page you are looking for doesn't exist.</p>
      </div>
      <div className="mt-12 space-x-4">
        <Link to="/" className="px-6 py-3 bg-white text-black rounded-md font-semibold shadow-md hover:bg-gray-100 transition duration-300">
          Go to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
