import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "../assets/greenice.jpg";

const UserReport = () => {
  
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

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Registered User Report</h2>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div className="mt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border border-gray-200">
                <td className="px-4 py-2 font-semibold">{user.name}</td>
                <td className="px-4 py-2 text-gray-600">{user.email}</td>
                <td className="px-4 py-2 text-gray-600">{user.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
          <a href="../Profile">Go Back</a>
        </button>

        
      
      </div>
    </div>
  );
};

export default UserReport;
