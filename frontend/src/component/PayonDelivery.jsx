import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayonDelivery = ({ onClose, createOrder }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const paymentResponse = await axios.post("/simulate-payment");
      
            if (paymentResponse.status === 200) {
              createOrder();
              onClose();
              toast.success("Payment successful!", { position: "top-right" });
            } else {
              console.error("Payment failed");
              toast.error("Payment failed. Please try again.", { position: "top-right" });
            }
          } catch (error) {
            console.error("Error during payment:", error);
            toast.error("Error during payment. Please try again.", { position: "top-right" });
          }
        };
      

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTrashAlt className="text-xl" />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Confirm Pay on Delivery</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg">Close</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg">Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayonDelivery;
