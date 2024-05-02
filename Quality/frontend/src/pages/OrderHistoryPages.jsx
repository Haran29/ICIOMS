import React, { useState, useEffect } from "react";
import axios from "axios";

const fallbackImageUrl = "https://via.placeholder.com/64x64"; // Fallback image URL

const OrderHistoryPages = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    }
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
    (!endDate || new Date(order.createdAt) <= new Date(endDate))
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Order History</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Date Range Filter */}
        <div className="mb-6">
          <label className="text-gray-600 mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-md mr-4"
          />
          <label className="text-gray-600 mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>

        {/* Create New Order Link */}
        <div className="mb-4">
          <a href="/create-order" className="text-blue-500 underline">Create New Order</a>
        </div>

        <div className="space-y-8">
          {filteredOrders.map((order) => (
            <div key={order._id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-6 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">Order ID: {order._id}</h3>
                <p className="text-gray-600 mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">Total Amount: <span className="font-semibold">${order.totalAmount.toFixed(2)}</span></p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Items:</h4>
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li key={item.itemId} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.imageUrl || 'https://via.placeholder.com/64x64'}
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg" 
                          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImageUrl }}  // Fallback on image load error
                        />
                        <div>
                          <p className="text-gray-700">{item.name}</p>
                          <p className="text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <span className="font-semibold">{item.quantity} x ${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPages;
