import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Import search icon

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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Order Online
        </h1>
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full h-10 pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {menuItems
            .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-start p-4 bg-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105 relative"
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
  
                {item.quantity > 0 ? (
                  <div className="flex items-center absolute bottom-2 right-2"> {/* Adjusted button position to bottom right */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 text-xs mr-1" // Reduced button size
                    >
                      -
                    </button>
                    <p className="text-gray-800 text-xs mr-1">{item.quantity}</p> {/* Reduced font size */}
                    <button
                      onClick={() => addToCart(item._id)}
                      className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-xs" // Reduced button size
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-sm absolute bottom-2 right-2" // Adjusted button size and position
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};  

export default OrderOnlinePage;
