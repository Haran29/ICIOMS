import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Admindash = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    contact: '',
    
  });
    // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/usersre');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filteredResults = users.filter(user => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filteredResults);
  }, [searchTerm, users]);

  const generateReport = async () => {
    try {
      const response = await axios.get('/api/users/reports');
      const reportData = response.data;
      console.log(reportData); // Log the report data
      setMessage('Report generated successfully');
      navigate("/UserReport");
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
      setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.log('Failed to delete user');
    }
  };

   

  return (
    
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <button 
          onClick={generateReport}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
        >
          Generate Report
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 19l-6-6M5 12a7 7 0 017-7h0a7 7 0 017 7h0"
            />
          </svg>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Registered Users</h3>
        <div className="overflow-x-fixed">
          <table className="shadow-lg bg-green-200 rounded-lg w-full">
            <thead >
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.contact}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>  
  );
};

export default Admindash;
