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
   
    <div className="container mx-auto px-4 ">
     
      <h2 className="text-3xl font-semibold mt-8 mb-4" >Registered User Report</h2>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div className="mt-4">
        
        
        
          <table class="table w-full">
        <tr><th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            </tr>
            </table>
          {users.map(user => (
            <table key={user._id} className="border border-gray-200 p-4 rounded mb-2"
           class="table w-full"
           
           >
            
            <tr class="text-center px-30 py-4">  <td className="font-semibold"> {user.name} </td>
              <td colospan ="2" className="text-gray-600"> {user.email} </td>
              <td className="text-gray-600">  {user.contact}  </td></tr>
            </table>
          ))}
          <br></br>  
        <button 
           className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        ><a href="../Profile">
          Go Back</a>
        </button>
        <img
          src={Image}
          alt="Your Photo"
          style={{ width: "800x", height: "600px" }}/>
      </div>
    </div>
    
  );
};

export default UserReport;
