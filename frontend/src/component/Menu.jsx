import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/get-menuItem");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterItems = (item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch = item.price.toString().includes(searchTerm);
    return nameMatch || priceMatch;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Our Delicious Menu
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Explore our wide range of mouth-watering dishes. Use the search bar to find your favorites!
        </p>
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search dishes or price..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full h-10 pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {menuItems
            .filter(filterItems)
            .map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-start p-4 bg-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 mb-2 object-cover rounded-lg"
                />
                <div className="text-left w-full">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-gray-600">LKR{item.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
