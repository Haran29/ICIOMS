// OrderOnlinePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Import search icon

const OrderOnline = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userLocation, setUserLocation] = useState("");
  const desiredLocation = "desiredLocation"; // Define the desired location here

  useEffect(() => {
    fetchUserLocation();
    fetchMenuItems();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user._id) {
      setUserId(user._id);
    }
  }, []);

  const fetchUserLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.post("/api/get-user-location", { latitude, longitude });
            setUserLocation(response.data.location);
          } catch (error) {
            console.error("Error fetching user location:", error);
          }
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/get-menuItem");
      const updatedMenuItems = response.data.map((item) => ({
        ...item,
        quantity: 0,
      }));
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = async (itemId) => {
    try {
      const response = await axios.post("/add-to-cart", { itemId, userId });
      console.log("Item added to cart:", response.data);
      const updatedMenuItems = menuItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.post("/remove-from-cart", { itemId, userId });
      console.log("Item removed from cart:", response.data);
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item._id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  if (userLocation !== desiredLocation) {
    return <div>You do not have access to this page from your current location.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-screen-3/4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-lg"
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-6xl">
        {menuItems
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              style={{ aspectRatio: "1/1" }} // Ensure square aspect ratio
            >
              <div className="h-full overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">LKR{item.price}</p>
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

export default OrderOnline;
