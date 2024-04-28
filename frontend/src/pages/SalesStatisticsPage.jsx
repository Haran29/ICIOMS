import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registering the plugins
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const SalesStatisticsPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedChart, setSelectedChart] = useState('sales'); // 'sales' or 'status'
  const chartRef = useRef(null);

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

  // Calculate total sales for each item
  const itemSales = {};
  filteredOrders.forEach(order => {
    order.items.forEach(item => {
      if (item.itemId in itemSales) {
        itemSales[item.itemId] += item.price * item.quantity;
      } else {
        itemSales[item.itemId] = item.price * item.quantity;
      }
    });
  });

  // Count orders by status
  const countOrdersByStatus = () => {
    const statusCounts = {
      completed: 0,
      pending: 0,
      canceled: 0,
    };

    filteredOrders.forEach(order => {
      switch (order.status) {
        case 'completed':
          statusCounts.completed++;
          break;
        case 'pending':
          statusCounts.pending++;
          break;
        case 'canceled':
          statusCounts.canceled++;
          break;
        default:
          break;
      }
    });

    return statusCounts;
  };

  const statusCounts = countOrdersByStatus();

  // Prepare data for the sales chart
  const chartData = {
    labels: Object.keys(itemSales).map(itemId => {
      const order = filteredOrders.find(order => order.items.some(i => i.itemId === itemId));
      const item = order.items.find(i => i.itemId === itemId);
      return item.name || itemId;
    }),
    datasets: [{
      label: 'Total Sales per Item',
      data: Object.values(itemSales),
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1
    }]
  };

  // Prepare data for the order status chart
  const statusChartData = {
    labels: ['Completed', 'Pending', 'Canceled'],
    datasets: [{
      label: 'Order Status',
      data: [statusCounts.completed, statusCounts.pending, statusCounts.canceled],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Sales Statistics</h2>
        
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

        {/* Chart Selector Buttons */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            className={`py-2 px-4 rounded ${selectedChart === 'sales' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
            onClick={() => setSelectedChart('sales')}
          >
            Sales per Item
          </button>
          <button
            className={`py-2 px-4 rounded ${selectedChart === 'status' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
            onClick={() => setSelectedChart('status')}
          >
            Order Status
          </button>
        </div>

        {/* Sales Chart */}
        <div className={`${selectedChart !== 'sales' ? 'hidden' : 'block'} mb-8`}>
          <Bar ref={chartRef} data={chartData} />
        </div>

        {/* Order Status Chart */}
        <div className={`${selectedChart !== 'status' ? 'hidden' : 'block'} mb-8`}>
          <Bar data={statusChartData} />
        </div>

      </div>
    </div>
  );
};

export default SalesStatisticsPage;
