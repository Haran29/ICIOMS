import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GenerateReport = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const componentRef = useRef(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, startDate, endDate, orderStatus]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    }
  };

  const filterOrders = () => {
    const filtered = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(order.createdAt) <= new Date(endDate)) &&
        (!orderStatus || order.status.toLowerCase() === orderStatus.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const generatePDF = () => {
    const input = document.getElementById("pdf-container");

    html2canvas(input, {
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("order_report.pdf");
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Order History
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Date Range Filter */}
        <div className="mb-4 flex items-center justify-between">
          <div>
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
        </div>

        {/* Order Status Filter */}
        <div className="mb-4">
          <label className="text-gray-600 mr-2">Order Status:</label>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            
          </select>
        </div>

        <div className="mb-4">
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg "
          >
            Generate PDF Report
          </button>
        </div>

        <div className="space-y-8" id="pdf-container" ref={componentRef}>
          {/* Dynamic Heading */}
          {startDate && endDate && (
            <h3 className="text-xl font-semibold mb-6 text-center">
              Order History ({formatDate(startDate)} - {formatDate(endDate)})
            </h3>
          )}
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">
                  Order ID: {order._id}
                </h3>
                <p className="text-gray-600 mb-2">
                  Date: {formatDate(order.createdAt)}
                </p>
                <p className="text-gray-600 mb-2">
                  Total Amount:{" "}
                  <span className="font-semibold">
                    LKR {order.totalAmount.toFixed(2)}
                  </span>
                </p>
                <div className="mb-4">
                  <label className="text-gray-600">
                    Status: {order.status}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
