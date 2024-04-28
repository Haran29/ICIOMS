import React, { useState } from 'react';
import axios from 'axios';

const Adduser = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setrole] = useState('');
  // Function to add a new user
  const handleAddUser = async () => {
    try {
      await axios.post('/Savindi/api/add-user', { name, email, contact });
      setMessage('User added successfully');
      setError('');
    } catch (error) {
      setMessage('');
      setError('Failed to add user');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-300 rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-2">Add New User</h3>
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:border-green-500"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:border-green-500"
          />
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:border-green-500"
          />
           <input
            type="text"
            name="role"
            value={role}
            onChange={(e) => setrole(e.target.value)}
            placeholder="Role"
            className="border border-gray-400 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
          >
            Add User
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Adduser;

