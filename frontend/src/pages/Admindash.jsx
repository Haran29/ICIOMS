import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admindash = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/Savindi/api/usersre");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filteredResults = users.filter((user) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filteredResults);
  }, [searchTerm, users]);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/Savindi/api/delete-users/${userId}`);
      setMessage("User deleted successfully");
      // Remove the deleted user from the list
      setUsers(users.filter((user) => user._id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.log("Failed to delete user");
    }
  };

  // Function to update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`/Savindi/users/${userId}`, { role: newRole });
      setMessage("User role updated successfully");
      // Update the user role in the state
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      setFilteredUsers(
        filteredUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-8">
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
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.contact}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role} // Set the selected value to the user's current role
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      className="bg-white border border-gray-300 rounded-md"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="salesperson">Salesperson</option>
                      <option value="salesperson_manager">
                        Salesperson Manager
                      </option>
                      <option value="UserManager">User Manager</option>
                    </select>
                  </td>
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
