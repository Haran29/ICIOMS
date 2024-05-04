import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GeneratePaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const componentRef = useRef(null);
  const [statusQuery, setStatusQuery] = useState("");
  const [methodQuery, setMethodQuery] = useState("");

  useEffect(() => {
    fetchAllPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchQuery, startDate, endDate, statusQuery, methodQuery]);

  const fetchAllPayments = async () => {
    try {
      const response = await axios.get('/payments');
      const sortedPayments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPayments(sortedPayments);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    }
  };

  const filterPayments = () => {
    const filtered = payments.filter(
      (payment) =>
        payment._id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!statusQuery || payment.status.toLowerCase() === statusQuery) &&
        (!methodQuery || payment.Method.toLowerCase() === methodQuery.toLowerCase()) &&
        (!startDate || new Date(payment.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(payment.createdAt) <= new Date(endDate))
    );
    setFilteredPayments(filtered);
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
      pdf.save("payment_report.pdf");
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleClear = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setStatusQuery("");
    setMethodQuery("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Payment History
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Payment ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        {/* Status Filter */}
        <div className="mb-4">
          <select
            value={statusQuery}
            onChange={(e) => setStatusQuery(e.target.value)}
            className={`border p-2 rounded-md w-full ${
              statusQuery === "" ? "text-gray-400" : ""
            }`}
          >
            <option value="">Select Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Method Filter */}
        <div className="mb-4">
          <select
            value={methodQuery}
            onChange={(e) => setMethodQuery(e.target.value)}
            className={`border p-2 rounded-md w-full ${
              methodQuery === "" ? "text-gray-400" : ""
            }`}
          >
            <option value="">Select Method</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
          </select>
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

        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 text-lg"
          >
            Clear
          </button>
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg"
          >
            Generate PDF Report
          </button>
        </div>

        <div className="space-y-8" id="pdf-container" ref={componentRef}>
          {filteredPayments.length === 1 && (
            <h3 className="text-xl font-semibold mb-6 text-center">
              Payment ID: {filteredPayments[0]._id}
            </h3>
          )}
          {filteredPayments.length > 1 &&
            filteredPayments.map((payment) => (
              <div
                key={payment._id}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <div className="p-6 bg-gray-100">
                  <h3 className="text-xl font-semibold mb-4">
                    Payment ID: {payment._id}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Date: {formatDate(payment.createdAt)}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Amount:{" "}
                    <span className="font-semibold">
                      LKR {payment.amount.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Status: <span className="font-semibold">{payment.status}</span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Payment Method:{" "}
                    <span className="font-semibold">{payment.Method}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratePaymentReport;
