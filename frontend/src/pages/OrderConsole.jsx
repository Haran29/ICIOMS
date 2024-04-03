import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const OrderConsole = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    // Calculate overall total when selected items change
    calculateOverallTotal();
  }, [selectedItems]);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("/get-menuItem");
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  };

  const addToSelectedItems = (itemId) => {
    const selectedItem = inventory.find(item => item._id === itemId);
    const existingItem = selectedItems.find(item => item._id === itemId);
    if (existingItem) {
      const updatedItems = selectedItems.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems(prevItems => [...prevItems, { ...selectedItem, quantity: 1 }]);
    }
  };

  const removeFromSelectedItems = (itemId) => {
    const updatedItems = selectedItems.map(item => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setSelectedItems(updatedItems);
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateOverallTotal = () => {
    let total = 0;
    selectedItems.forEach(item => {
      total += calculateItemTotal(item);
    });
    return total.toFixed(2);
  };

  const handlePay = async () => {
    // Implement payment logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between">
          {/* Inventory */}
          <div className="w-3/5 pr-8">
            <h2 className="text-3xl font-semibold mb-6">Inventory</h2>
            <div className="grid grid-cols-2 gap-8">
              {inventory.map(item => (
                <div key={item._id} className="flex flex-col items-center cursor-pointer" onClick={() => addToSelectedItems(item._id)}>
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mb-2" />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Selected Items */}
          <div className="w-2/5">
            <h2 className="text-3xl font-semibold mb-6">Current Order</h2>
            {selectedItems.map(item => (
              <div key={item._id} className="flex items-center mb-6 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 rounded-lg shadow" />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price} | Quantity: {item.quantity} | Total: ${calculateItemTotal(item)}</p>
                </div>
                <div className="flex items-center ml-auto space-x-2">
                  <button onClick={() => removeFromSelectedItems(item._id)} className="btn btn-sm text-red-500"><FaTrashAlt /></button>
                </div>
              </div>
            ))}
            {selectedItems.length > 0 && (
              <div>
                <p className="text-right mb-2">Overall Total: ${calculateOverallTotal()}</p>
                <button onClick={handlePay} className="btn btn-blue">Pay Now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConsole;