import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user._id) {
        const response = await axios.get(`/payments/user/${user._id}`);
        const sortedPayments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPayments(sortedPayments);
      }
    } catch (error) {
      console.error("Failed to fetch payment history:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Payment History</h2>
        <div className="space-y-8">
          {payments.map((payment) => (
            <div key={payment._id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-6 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">Payment ID: {payment._id}</h3>
                <p className="text-gray-600 mb-2">Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">Amount: <span className="font-semibold">LKR {payment.amount.toFixed(2)}</span></p>
                <p className="text-gray-600 mb-2">Payment Method: <span className="font-semibold">{payment.Method}</span></p>
                <p className="text-gray-600 mb-4">Status: <span className="font-semibold">{payment.status}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
