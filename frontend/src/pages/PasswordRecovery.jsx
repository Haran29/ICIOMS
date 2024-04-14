// PasswordReset.js

import React, { useState } from 'react';
import axios from 'axios';
import Image from "../assets/greenice.jpg";

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await axios.post('/api/sendotp', { email });
      setMessage('OTP sent successfully');
      setError('');
    } catch (error) {
      setMessage('');
      setError('Failed to send OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/api/sendotp', { email, otp }); // Backend route to verify OTP
      if (response.data.success) {
        // OTP verification successful, now reset the password
        const newPassword = generateNewPassword(); // Function to generate a new password
        const resetResponse = await axios.post('/api/resetpass', { email, newPassword }); // Backend route to reset password
        if (resetResponse.data.success) {
          setMessage('Password reset successful');
        } else {
          setError('Failed to reset password');
        }
      } else {
        setError('Invalid OTP');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password');
    }
  };
  return (
    <div className='savi'>
    <div className="container mx-auto px-4" >
      
      <h1 className="text-3xl font-semibold mt-8 mb-4">Reset Password</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleSendOTP}
      >
        Send OTP
      </button>

      <div className="mb-4 mt-8">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
          OTP
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="otp"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>

      <button
        className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleResetPassword}
      >
        Reset Password
      </button>

      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

    </div>
    </div>
  );
};

export default PasswordRecovery;
