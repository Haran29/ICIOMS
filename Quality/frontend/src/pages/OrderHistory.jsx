import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user._id) {
        const response = await axios.get(`/orders/user/${user._id}`);
        // Sort orders by createdAt in descending order (latest to oldest)
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Order History</h2>
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-6 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">Order ID: {order._id}</h3>
                <p className="text-gray-600 mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">Total Amount: <span className="font-semibold">${order.totalAmount.toFixed(2)}</span></p>
                <p className="text-gray-600 mb-4">Status: <span className={`font-semibold ${order.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{order.status}</span></p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Items:</h4>
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li key={item.itemId} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.imageUrl || 'https://via.placeholder.com/64x64'}  // Fallback to placeholder image
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg" 
                          onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/64x64' }}  // Fallback on image load error
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

export default OrderHistoryPage;
