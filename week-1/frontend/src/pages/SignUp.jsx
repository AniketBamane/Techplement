import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const verifyEmail = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      } else {
        navigate("/verification", {
          state: { email: userData.email, password: userData.password, username: userData.username, verificationcode: data.verificationCode },
        });
      }
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
        style: {
          background: "#FF474C",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    verifyEmail();
    console.log(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username must be at least 3 characters"
                value={userData.username}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter valid email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password must be at least 6 characters"
                value={userData.password}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition duration-200"
            >
              {loading ? "Sending email for Verification..." : "Sign Up"}
            </button>
            <div className="mt-4 text-md text-gray-700">
              <Link to="/signin">Already have an account? Sign-in</Link>
            </div>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2 w-full relative bg-gradient-to-br from-green-400 via-green-200 to-transparent flex items-center justify-center p-4">
          <div className="absolute bottom-10 left-10">
            <p className="text-xl text-gray-800 italic">"The only limit to our realization of tomorrow is our doubts of today."</p>
            <p className="mt-4 text-gray-700 font-semibold">- Franklin D. Roosevelt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
