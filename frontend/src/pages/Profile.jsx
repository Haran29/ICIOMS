import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "../assets/greenice.jpg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/getuser');
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setContact(response.data.contact);
      } catch (error) {
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name, email ,contact};
      await axios.put('/api/user/updateuser', updatedUser);
      setMessage('User details updated successfully');
    } catch (error) {
      setError('Failed to update user details');
    }
  };

  return (
    <div className="container mx-auto px-4">
    
      
      <h1 className="text-3xl font-semibold mt-8 mb-4">User Profile</h1>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      {user && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
              Contact
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contact"
              type="text"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Update Profile
          </button>
        </form> 
      )}


    </div>
   
  );
};

export default Profile;
