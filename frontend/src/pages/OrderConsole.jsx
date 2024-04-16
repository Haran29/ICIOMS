import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaSearch } from 'react-icons/fa';

const OrderConsole = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
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

  const handleSearch = event => {
    setSearchTerm(event.target.value);
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

  const toggleBillModal = () => {
    setIsBillModalOpen(!isBillModalOpen);
  };

  const generateBill = async () => {
    try {
      const orderData = {
        items: selectedItems.map(item => ({
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: calculateItemTotal(item)
        })),
        totalAmount: calculateOverallTotal()
      };

      const response = await axios.post("/save-order", orderData);

      if (response.status === 200) {
        setIsBillModalOpen(true);
      } else {
        console.error("Failed to save order:", response.data);
      }
    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };

  const BillModal = ({ onClose, bill }) => {
    const handlePrint = () => {
      window.print();
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold">Order Receipt</h2>
              <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              {bill.items.map((item, index) => (
                <div key={index} className="flex justify-between mb-1">
                  <span>{item.name}</span>
                  <span>${item.total}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal:</span>
                <span>${(bill.totalAmount - (bill.totalAmount * 0.1)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tax (10%):</span>
                <span>${(bill.totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount:</span>
                <span>${bill.totalAmount}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                onClick={handlePrint}
              >
                Print Receipt
              </button>
              <button 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div 
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
      </div>
    );
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between">
          <div className="w-3/5 pr-8">
            <h2 className="text-3xl font-semibold mb-6">Inventory</h2>
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              {filteredInventory.map(item => (
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
          <div className="w-2/5">
            <h2 className="text-3xl font-semibold mb-6"> Order</h2>
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
                <button  
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg"
                  onClick={generateBill}
                >
                  Generate Bill
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isBillModalOpen && (
        <BillModal 
          bill={{
            items: selectedItems.map(item => ({
              name: item.name,
              total: calculateItemTotal(item)
            })),
            totalAmount: calculateOverallTotal()
          }}
          onClose={toggleBillModal}
        />
      )}
    </div>
  );
};

export default OrderConsole;
