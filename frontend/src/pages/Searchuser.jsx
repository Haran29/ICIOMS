import React, { useState } from 'react';
import axios from 'axios';
import Image from "../assets/greenice.jpg";

const Searchuser = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {
    
    try {
      const response = await axios.get(`/api/searchuser?email=${email}`);
      setUserData(response.data);
      setError('');
    } catch (error) {
      setError('User not found');
      setUserData(null);
    }
  };

  return (
    <div className="container mx-auto px-4">
      
      <h1 className="text-3xl font-semibold mt-8 mb-4">Search User</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>

      {userData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">User Data</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Contact:</strong> {userData.contact}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      <img      src={Image}
          alt="Your Photo"
         className='float-right'
          style={{ width: "800px", height: "600px"}}/>
    </div>
   
  );
};

export default Searchuser;
