import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ManageOrdersPage = () => {
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [offlineOrders, setOfflineOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [showOfflineOrders, setShowOfflineOrders] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    fetchOnlineOrders();
    fetchOfflineOrders();
  }, []);

  const fetchOnlineOrders = async () => {
    try {
      const response = await axios.get("/orders");
      const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOnlineOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch online orders:", error);
    }
  };

  const fetchOfflineOrders = async () => {
    try {
      const response = await axios.get("/offline-orders");
      setOfflineOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch offline orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const ordersToUpdate = showOfflineOrders ? offlineOrders : onlineOrders;
    try {
      if (showOfflineOrders) {
        setOfflineOrders(ordersToUpdate.map(order => order._id === orderId ? {...order, status: newStatus} : order));
        await axios.put(`offline-orders/${orderId}`, { status: newStatus });
      } else {
        setOnlineOrders(ordersToUpdate.map(order => order._id === orderId ? {...order, status: newStatus} : order));
        await axios.put(`/orders/${orderId}`, { status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    const ordersToDeleteFrom = showOfflineOrders ? offlineOrders : onlineOrders;
    try {
      if (showOfflineOrders) {
        setOfflineOrders(ordersToDeleteFrom.filter(order => order._id !== orderId));
        await axios.delete(`/offline-orders/${orderId}`);
      } else {
        setOnlineOrders(ordersToDeleteFrom.filter(order => order._id !== orderId));
        await axios.delete(`/orders/${orderId}`);
      }
      setSuccessMessage("Order deleted successfully!"); // Set success message
    } catch (error) {
      console.error("Failed to delete order:", error.response ? error.response.data : error);
    }
  };

  const confirmDelete = (orderId) => {
    setOrderIdToDelete(orderId);
    setShowConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    if (orderIdToDelete) {
      deleteOrder(orderIdToDelete);
      setOrderIdToDelete(null);
    }
    setShowConfirmation(false);
  };

  const handleDeleteCancelled = () => {
    setOrderIdToDelete(null);
    setShowConfirmation(false);
  };

  const ordersToShow = showOfflineOrders ? offlineOrders : onlineOrders;

  // Render a toast notification when success message is set
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Order History</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

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

        <div className="mb-6 flex justify-between">
          <button 
            onClick={() => setShowOfflineOrders(false)} 
            className={`px-4 py-2 ${!showOfflineOrders ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700`}
          >
            Online Orders
          </button>
          <button 
            onClick={() => setShowOfflineOrders(true)} 
            className={`px-4 py-2 ${showOfflineOrders ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700`}
          >
            Offline Orders
          </button>
        </div>

        <div className="space-y-8">
          {ordersToShow.map((order) => (
            <div key={order._id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-6 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">Order ID: {order._id}</h3>
                <p className="text-gray-600 mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">Total Amount: <span className="font-semibold">LKR {order.totalAmount.toFixed(2)}</span></p>
                <div className="mb-4">
                  <label className="text-gray-600">Status:</label>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className={`ml-2 font-semibold ${order.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <button onClick={() => confirmDelete(order._id)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 text-lg">Delete Order</button>
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
                          onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/64x64' }}
                        />
                        <div>
                          <p className="text-gray-700">{item.name}</p>
                          <p className="text-gray-500">LKR{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <span className="font-semibold">{item.quantity} x LKR {item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg">
              <p className="text-lg mb-4">Are you sure you want to delete this order?</p>
              <div className="flex justify-between">
                <button onClick={handleDeleteConfirmed} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 mr-2">Yes</button>
                <button onClick={handleDeleteCancelled} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ml-2">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrdersPage;
