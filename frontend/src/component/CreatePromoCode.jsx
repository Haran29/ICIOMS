import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreatePromoCode = () => {
  const [expiryDate, setExpiryDate] = useState(null);
  const [discountAmount, setDiscountAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await axios.get("/api/promo-codes");
      setPromoCodes(response.data);
    } catch (error) {
      console.error("Error fetching promo codes:", error);
    }
  };

  const handleCreatePromoCode = async () => {
    try {
      const response = await axios.post("/api/create-promo-code", {
        expiryDate,
        discountAmount,
        promoCode,
      });
      if (response.data.success) {
        alert("Promo code created successfully!");
        setExpiryDate(null);
        setDiscountAmount("");
        setPromoCode("");
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to create promo code. Please try again.");
      }
    } catch (error) {
      console.error("Error creating promo code:", error);
      setErrorMessage("Failed to create promo code. Please try again later.");
    }
    fetchPromoCodes(); 
  };
  
  const handleDeletePromoCode = async (code) => {
    try {
      const response = await axios.delete("/api/delete-promo-code", {
        data: { promoCode: code },
      });
      if (response.data.success) {
        alert("Promo code deleted successfully!");
        fetchPromoCodes(); // Fetch promo codes again after deleting
      } else {
        setErrorMessage("Failed to delete promo code. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting promo code:", error);
      setErrorMessage("Failed to delete promo code. Please try again later.");
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Promo Code</h2>
      <DatePicker
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        selected={expiryDate}
        onChange={(date) => setExpiryDate(date)}
        placeholderText="Select Expiry Date"
      />
      <input
        type="number"
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        value={discountAmount}
        onChange={(e) => setDiscountAmount(e.target.value)}
        placeholder="Discount Percentage"
      />
      <input
        type="text"
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Promo Code"
      />
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        onClick={handleCreatePromoCode}
      >
        Create Promo Code
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        {/* Display promo code details */}
        <div className="max-w-md mx-auto p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">Promo Code</h2>
        <ul>
          {promoCodes.map((code) => (
            <li key={code._id}>
              Promo Code: {code.promoCode} | Discount Percentage: {code.discountAmount}% | Expiry Date: {code.expiryDate}
              <button
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => handleDeletePromoCode(code.promoCode)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreatePromoCode;
