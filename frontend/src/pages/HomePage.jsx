import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const OrderOnlinePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchMenuItems();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user._id) {
      setUserId(user._id);
    }
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/get-menuItem");
      const updatedMenuItems = response.data.map(item => ({ ...item, quantity: 0 }));
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const addToCart = async itemId => {
    try {
      const response = await axios.post("/add-to-cart", { itemId, userId });
      const updatedMenuItems = menuItems.map(item =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async itemId => {
    try {
      const response = await axios.post("/remove-from-cart", { itemId, userId });
      setMenuItems(prevMenuItems =>
        prevMenuItems.map(item =>
          item._id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-screen-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-12 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-lg shadow-md"
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {menuItems
          .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(item => (
            <div
              key={item._id}
              className="group overflow-hidden rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-b-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                {item.quantity > 0 ? (
                  <div className="flex items-center">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 text-sm mr-2"
                    >
                      -
                    </button>
                    <p className="text-gray-800 mr-2">{item.quantity}</p>
                    <button
                      onClick={() => addToCart(item._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-sm"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderOnlinePage;
