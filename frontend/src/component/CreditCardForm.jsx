/*import React, { useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreditCardForm = ({ onClose, createOrder }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const isCardNumberValid = (cardNumber) => {
    return /^[0-9]{16}$/.test(cardNumber);
  };

  const isExpiryDateValid = (expiryDate) => {
    return /^[0-9]{2}\/[0-9]{2}$/.test(expiryDate);
  };

  const isCVVValid = (cvv) => {
    return /^[0-9]{3,4}$/.test(cvv);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCardNumberValid(cardNumber) || !isExpiryDateValid(expiryDate) || !isCVVValid(cvv)) {
      toast.error("Invalid credit card details.", { position: "top-right" });
      return;
    }

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
        <h2 className="text-2xl font-semibold mb-6 text-center">Enter Credit Card Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-semibold mb-2">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="input"
              placeholder="XXXX XXXX XXXX XXXX"
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-semibold mb-2">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="input"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-semibold mb-2">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="input"
              placeholder="XXX"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg">Close</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg">Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
*/


import React, { useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreditCardForm = ({ onClose, createOrder }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const isCardNumberValid = (cardNumber) => {
    return /^[0-9]{16}$/.test(cardNumber);
  };
  
  const isExpiryDateValid = (expiryDate) => {
    if (!/^\d{4}$/.test(expiryDate)) {
      return false; 
    }
  
    const currentYear = new Date().getFullYear() % 100; 
    const currentMonth = new Date().getMonth() + 1; 
  
    const inputYear = parseInt(expiryDate.substr(2, 2), 10);
    const inputMonth = parseInt(expiryDate.substr(0, 2), 10);
  
    return inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth);
  };
  
  const isCVVValid = (cvv) => {
    return /^[0-9]{3,4}$/.test(cvv);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCardNumberValid(cardNumber) || !isExpiryDateValid(expiryDate) || !isCVVValid(cvv)) {
      toast.error("Invalid credit card details.", { position: "top-right" });
      return;
    }

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
        <h2 className="text-2xl font-semibold mb-6 text-center">Enter Credit Card Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-semibold mb-2">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => {
                const inputText = e.target.value.replace(/\D/g, '');
                if (inputText.length <= 16) {
                  setCardNumber(inputText);
                }
              }}
              className="input"
              placeholder="XXXX XXXX XXXX XXXX"
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-semibold mb-2">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => {
                const inputText = e.target.value.replace(/\D/g, '').slice(0, 4); 
                if (/^\d{0,4}$/.test(inputText)) {
                setExpiryDate(inputText);
              }
            }}
          onBlur={() => {
            if (!isExpiryDateValid(expiryDate)) {
            toast.error("Please enter a valid future expiry date in MMYY format.", { position: "top-right" });
             setExpiryDate("");
              }
            }}
              className="input"
              placeholder="MMYY"
              maxLength="4"
              required
          />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-semibold mb-2">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              className="input"
              placeholder="XXX"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg">Close</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg">Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
