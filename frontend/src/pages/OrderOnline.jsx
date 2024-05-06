import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../component/Menu";

const OrderOnline = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userCart, setUserCart] = useState([]);
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [allowedLocation, setAllowedLocation] = useState(false);

 



  useEffect(() => {
   
    fetchMenuItems();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user._id) {
      setUserId(user._id);
    }

    checkLocation();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserCart(userId);
      fetchUserOrderHistory(userId);
    }
  }, [userId]);

  //Personalized Recommendation
  useEffect(() => {
    const itemFrequency = {};
    userOrderHistory.forEach((order) => {
      order.items.forEach((item) => {
        const itemId = item.itemId;
        if (itemFrequency[itemId]) {
          itemFrequency[itemId]++;
        } else {
          itemFrequency[itemId] = 1;
        }
      });
    });

    const updatedMenuItems = menuItems.map((item) => ({
      ...item,
      frequency: itemFrequency[item._id] || 0,
    }));
    setMenuItems(updatedMenuItems);
  }, [userOrderHistory]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/get-menuItem");
      const updatedMenuItems = response.data.map((item) => ({ ...item }));
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  const fetchUserOrderHistory = async (userId) => {
    try {
      const response = await axios.get(`/orders/user/${userId}`);
      setUserOrderHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch user order history:", error);
    }
  };

  const fetchUserCart = async (userId) => {
    try {
      const response = await axios.get(`/cart/user/${userId}`);
      setUserCart(response.data);
    } catch (error) {
      console.error("Failed to fetch user cart:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterItems = (item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const priceMatch = item.price.toString().includes(searchTerm);
    return nameMatch || priceMatch || getUserCartItemQuantity(item._id) > 0;
  };

  const getUserCartItemQuantity = (itemId) => {
    const cartItem = userCart.find((item) => item.itemId._id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = async (itemId) => {
    try {
      const availableQuantityResponse = await axios.get(
        `/items/${itemId}/availableQuantity`
      );
      const availableQuantity = availableQuantityResponse.data.quantity;

      if (availableQuantity <= 0) {
        toast.error("Out of stock", {
          position: "top-right",
        });
        return;
      }

      const response = await axios.post("/add-to-cart", { itemId, userId });
      fetchUserCart(userId);
      toast.success("Item added to cart", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Error adding item to cart:", {
        position: "top-right",
      });
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.post("/remove-from-cart", {
        itemId,
        userId,
      });

      const updatedUserCart = userCart
        .map((item) => {
          if (item.itemId._id === itemId && item.quantity === 1) {
            removeFromDatabase(itemId);
            return null;
          } else if (item.itemId._id === itemId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
        .filter(Boolean);

      setUserCart(updatedUserCart);
    } catch (error) {
      toast.error("Error removing item from cart:", {
        position: "top-right",
      });
      console.error("Error removing item from cart:", error);
    }
  };

  const removeFromDatabase = async (itemId) => {
    try {
      const response = await axios.delete(`/cart/${userId}/item/${itemId}`);
      console.log("Item removed from the database:", response.data);
    } catch (error) {
      toast.error("Error removing item from the database:", {
        position: "top-right",
      });
      console.error("Error removing item from the database:", error);
    }
  };
//for location-specific access. 
  const checkLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        //const mataleDistrictLatitude = 7.46666;
        //const mataleDistrictLongitude = 80.61666;

        const mataleDistrictLatitude = 6.9270;
        const mataleDistrictLongitude = 79.8617;

        const latitudeTolerance = 0.1;
        const longitudeTolerance = 0.1;

        if (
          userLatitude >= mataleDistrictLatitude - latitudeTolerance &&
          userLatitude <= mataleDistrictLatitude + latitudeTolerance &&
          userLongitude >= mataleDistrictLongitude - longitudeTolerance &&
          userLongitude <= mataleDistrictLongitude + longitudeTolerance
        ) {
          setAllowedLocation(true);
        } else {
          setAllowedLocation(false);
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");

      setAllowedLocation(true);
    }
  };

  if (!allowedLocation) {
    return (
      <div class="min-h-screen text-black">
        <div class="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <h1 class="text-5xl font-bold text-center mb-8">
            Sorry, Order Online is not available for your current location
          </h1>
          <Menu  />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Order Online
        </h1>
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
            .sort((a, b) => b.frequency - a.frequency)
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

                {getUserCartItemQuantity(item._id) > 0 ? (
                  <div className="flex items-center absolute bottom-2 right-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 text-xs mr-1"
                    >
                      -
                    </button>
                    <p className="text-gray-800 text-xs mr-1">
                      {getUserCartItemQuantity(item._id)}
                    </p>
                    <button
                      onClick={() => addToCart(item._id)}
                      className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-xs"
                    >
                      +
                    </button>
                  </div>
                ) : item.quantity > 0 ? (
                  <button
                    onClick={() => addToCart(item._id)}
                    disabled={item.quantity <= 0}
                    className={`px-3 py-1 ${
                      item.quantity <= 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600"
                    } text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-sm absolute bottom-2 right-4`}
                  >
                    Add
                  </button>
                ) : (
                  <p className="text-red-500 absolute bottom-2 right-4">
                    Out of stock
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderOnline;
