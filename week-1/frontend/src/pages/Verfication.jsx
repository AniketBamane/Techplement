import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/context';
import toast from 'react-hot-toast';

const Verification = () => {
  const { setUser } = useMyContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(''));
  const { username, email, password, verificationcode } = location.state || {};

  const handleInputChange = (index, event) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = event.target.value;
    setVerificationCode(updatedCode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredVerificationCode = verificationCode.join('');
    if (enteredVerificationCode == verificationcode) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.token);
          navigate('/');
          toast.success('Account created successfully', {
            duration: 2000,
            style: {
              background: 'green',
              color: 'white',
            },
            icon: '🥳',
          });
        } else {
          toast.error(data.message, {
            duration: 2000,
            style: {
              background: '#FF474C',
              color: 'white',
            },
          });
        }
      } catch (err) {
        toast.error(err.message, {
          duration: 2000,
          style: {
            background: '#FF474C',
            color: 'white',
          },
        });
      }
    } else {
      console.log(enteredVerificationCode,verificationCode)
      toast.error('Verification code does not match!', {
        duration: 2000,
        style: {
          background: '#FF474C',
          color: 'white',
        },
      });
      setVerificationCode(new Array(6).fill(''));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Verify Your Email</h2>
        <h3 className='font-semibold text-gray-500 text-center'>enter the code which has been sent to your email !</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                type="number"
                maxLength="1"
                value={digit}
                onChange={(event) => handleInputChange(index, event)}
                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                style={{ marginRight: index !== 5 ? '0.5rem' : '0' }}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition duration-200"
          >
            Verify
          </button>
          <div className="mt-4 text-md text-gray-700 text-center">
            <Link to="/signup">Go back to Sign-up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
