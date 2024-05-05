import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagePayment = () => {
  const [payments, setPayments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPayment, setEditedPayment] = useState({});
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    try {
      const response = await axios.get("/payments");
      const sortedPayments = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPayments(sortedPayments);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    }
  };

  const handleDelete = async (paymentId) => {
    try {
      await axios.delete(`/payments/${paymentId}`);
      fetchAllPayments(); // Refresh payment history after deletion
    } catch (error) {
      console.error("Failed to delete payment:", error);
    }
  };

  const handleEdit = (payment) => {
    setIsEditing(true);
    setEditedPayment(payment);
    setSelectedPaymentId(payment._id);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/payments/${selectedPaymentId}`, editedPayment);
      setIsEditing(false);
      fetchAllPayments();
    } catch (error) {
      console.error("Failed to update payment:", error);
    }
  };

  const handleUpdate = (payment) => {
    handleEdit(payment);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Payment History
        </h2>
        <div className="space-y-8">
          {isEditing ? (
            <div className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-6 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">Edit Payment</h3>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="amount"
                  >
                    Amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="amount"
                    type="number"
                    value={editedPayment.amount || ""}
                    disabled
                    onChange={(e) =>
                      setEditedPayment({
                        ...editedPayment,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Payment Status
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="status"
                    value={editedPayment.status || ""}
                    onChange={(e) =>
                      setEditedPayment({
                        ...editedPayment,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Decline">Decline</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="method"
                  >
                    Payment Method
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="method"
                    type="text"
                    value={editedPayment.Method || ""}
                    disabled
                    onChange={(e) =>
                      setEditedPayment({
                        ...editedPayment,
                        Method: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            payments.map((payment) => (
              <div
                key={payment._id}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <div className="p-6 bg-gray-100">
                  <h3 className="text-xl font-semibold mb-4">
                    Payment ID: {payment._id}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Date: {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Amount:{" "}
                    <span className="font-semibold">
                      LKR {payment.amount.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Payment Status:{" "}
                    <span className="font-semibold">{payment.status}</span>
                  </p>
                  <p className="text-gray-600 mb-4">
                    Payment Method:{" "}
                    <span className="font-semibold">{payment.Method}</span>
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(payment._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleUpdate(payment)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePayment;
