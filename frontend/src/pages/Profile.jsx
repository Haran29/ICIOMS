import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to validate phone number format
  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };
// Function to validate name format
const validateName = (name) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
};

  // Function to fetch user profile data
  useEffect(() => {
    /*const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/Savindi/api/user/getuser');
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setContact(response.data.contact);
      } catch (error) {
        setError('Error fetching user profile');
      }
    };*/

    const fetchUserProfile = async () => {
      try {
        // Get userid from session
        const userid = sessionStorage.getItem('userid'); // Replace 'userid' with the actual key used to store userid in session
    
        // Check if userid is available
        if (!userid) {
          setError('Userid not found in session');
          return;
        }
    
        // Make API request with userid
        const response = await axios.get(`/Savindi/api/user/getuser/${userid}`);
    
        // Assuming response.data contains user details
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
      // Validation checks
      if (!validateEmail(email)) {
        setError('Invalid email format');
        return;
      }

      if (!validatePhone(contact)) {
        setError('Invalid phone number format');
        return;
      }
      if (!validateName(name)) {
        setError('Name should contain only alphabetic characters');
        return;
      }


      const updatedUser = { name, email, contact };
      await axios.put('/Savindi/api/user/updateuser', updatedUser);
      setMessage('User details updated successfully');
      setError('');
    } catch (error) {
      setError('Failed to update user details');
    }
  };
  

  return (
    <div className="container mx-auto px-4 items-center justify-center py-14">
      <div className="max-w-sm mx-auto p-6  bg-white border border-gray-200 rounded-lg shadow   py-14">
        <h5 className="text-2xl font-semibold mt-1 mb-4">User Profile</h5>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        {user && (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contact
              </label>
              <input
                id="contact"
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
