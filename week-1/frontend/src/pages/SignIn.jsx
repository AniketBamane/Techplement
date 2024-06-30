import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/context';
import toast from 'react-hot-toast';

const SignIn = () => {
  const { setUser } = useMyContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
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
        setUser(data.token);
        navigate("/");
        toast.success("You are Signed in successfully", {
          duration: 2000,
          style: {
            background: 'green',
            color: 'white',
          },
          icon: '👏',
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Container: Quote */}
        <div className="hidden md:block md:w-1/2 w-full relative bg-gradient-to-bl from-green-400 via-green-200 to-transparent flex items-center justify-center p-4 md:p-0">
          <div className="absolute bottom-10 left-10 right-10 md:right-2 text-center md:text-left">
            <p className="text-xl text-gray-800 italic">"Success is not final, failure is not fatal: It is the courage to continue that counts."</p>
            <p className="mt-4 text-gray-700 font-semibold">- Winston Churchill</p>
          </div>
        </div>
        
        {/* Right Container: Sign In Form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center md:text-left">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                placeholder="Enter valid email address"
                onChange={handleChange}
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
                placeholder="Enter password"
                value={userData.password}
                onChange={handleChange}
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <div className="mt-4 text-md text-gray-700 text-center md:text-left">
              <Link to="/signup">Don't have any account? Sign-up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
