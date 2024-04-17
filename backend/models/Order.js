import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registering the plugins
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const SalesStatisticsPage = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    fetchOrderHistory();
    fetchItems();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
    (!endDate || new Date(order.createdAt) <= new Date(endDate))
  );

  // Calculate total sales for each item name
  const itemSales = {};
  filteredOrders.forEach(order => {
    order.items.forEach(item => {
      if (item.name in itemSales) {
        itemSales[item.name] += item.price * item.quantity;
      } else {
        itemSales[item.name] = item.price * item.quantity;
      }
    });
  });

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(itemSales), // Use item names as labels
    datasets: [{
      label: 'Total Sales per Item',
      data: Object.values(itemSales),
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Sales Statistics per Item</h2>
        
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

        {/* Sales Chart */}
        <div className="mb-8">
          <Bar ref={chartRef} data={chartData} />
        </div>

      </div>
    </div>
  );
};

export default SalesStatisticsPage;
