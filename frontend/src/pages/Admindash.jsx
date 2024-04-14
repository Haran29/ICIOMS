import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "../assets/greenice.jpg";

import { useNavigate } from "react-router-dom";

const Admindash = () => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/usersre');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const generateReport = async () => {
    try {
      const response = await axios.get('/api/users/reports');
      const reportData = response.data;
      console.log(reportData); // Log the report data
      setMessage('Report generated successfully');
      Navigate("/UserReport");
    } catch (error) {
      setError('Failed to generate report');
    }
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/delete-users/${userId}`);
      setMessage('User deleted successfully');
      // Remove the deleted user from the list
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.log('Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className='glass'></div>
      <h1 className="text-3xl font-semibold mt-8 mb-4">Admin Dashboard</h1>
       

      <button 
          onClick={generateReport}
          className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Generate Report
        </button>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Registered Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} className="border border-gray-200 p-4 rounded mb-2 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <button 
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <img
          src={Image}
          alt="Your Photo"
          className='float-right'
          style={{ width: "800x", height: "600px" }}/>
      </div>
    </div>
  );
};

export default Admindash;
