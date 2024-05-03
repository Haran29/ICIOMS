import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = ({ cartItem, updateQuantity, removeItem }) => {
  const handleUpdateQuantity = (newQuantity) => {
    const availableQuantity = cartItem.itemId.quantity;

    if(newQuantity  == 0){
      removeItem(cartItem._id)
    }

    if (newQuantity < 0) {
      toast.error("Quantity cannot be zero or negative.", {
        position: "top-right",
      });
      return;
    }

    if (newQuantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} ${cartItem.itemId.name} available.`, {
        position: "top-right",
      });
      return;
    }

    updateQuantity(cartItem._id, newQuantity);
  };

  return (
      <div key={cartItem._id} className="flex items-center mb-6 border-b pb-4">
        <img
          src={cartItem.itemId.image}
          alt={cartItem.itemId.name}
          className="w-16 h-16 mr-4 rounded"
        />
        <div>
          <p className="text-lg font-semibold">{cartItem.itemId.name}</p>
          <p className="text-sm text-gray-600">Qty: {cartItem.quantity}</p>
        </div>
        <div className="flex items-center ml-auto space-x-2">
          <p className="text-sm text-gray-600">
            LKR {cartItem.itemId.price * cartItem.quantity}
          </p>
          <button
            onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
            className="btn btn-sm btn-blue"
          >
            -
          </button>
          <button
            onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
            className="btn btn-sm btn-blue"
          >
            +
          </button>
          <button
            onClick={() => removeItem(cartItem._id)}
            className="btn btn-sm btn-red"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
  );
};

export default CartItem;
