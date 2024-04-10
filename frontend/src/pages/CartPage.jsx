import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const CartItem = ({ cartItem, updateQuantity, removeItem }) => (
  <div key={cartItem._id} className="flex items-center mb-6 border-b pb-4">
    <img src={cartItem.itemId.image} alt={cartItem.itemId.name} className="w-16 h-16 mr-4 rounded" />
    <div>
      <p className="text-lg font-semibold">{cartItem.itemId.name}</p>
      <p className="text-sm text-gray-600">Qty: {cartItem.quantity}</p>
    </div>
    <div className="flex items-center ml-auto space-x-2">
      <p className="text-sm text-gray-600">${cartItem.itemId.price * cartItem.quantity}</p>
      <button onClick={() => updateQuantity(cartItem._id, cartItem.quantity - 1)} className="btn btn-sm btn-blue">-</button>
      <button onClick={() => updateQuantity(cartItem._id, cartItem.quantity + 1)} className="btn btn-sm btn-blue">+</button>
      <button onClick={() => removeItem(cartItem._id)} className="btn btn-sm btn-red"><FaTrashAlt /></button>
    </div>
  </div>
);

const CheckoutForm = ({ phoneNumber, setPhoneNumber, postalCode, setPostalCode, city, setCity, streetAddress, setStreetAddress, handlePayment }) => (
  <div className="w-1/4 ml-12">
    <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
    <div className="mb-4">
      <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
      <input
        type="text"
        id="phoneNumber"
        className="input"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
      <input
        type="text"
        id="postalCode"
        className="input"
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
      <input
        type="text"
        id="city"
        className="input"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="streetAddress" className="block text-gray-700 text-sm font-bold mb-2">Street Address</label>
      <input
        type="text"
        id="streetAddress"
        className="input"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
      />
    </div>
    <div className="text-center">
      <button onClick={handlePayment} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg ">Pay</button>
    </div>
  </div>
);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user && user._id) {
        const response = await axios.get(`/get-cart-items/${user._id}`);
        setCartItems(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity < 0) return; // Ensure quantity doesn't go below 0
      const response = await axios.put('/cart/updateQuantity', { cartItemId, quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await axios.delete('/cart/deleteItem', { data: { cartItemId } });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await axios.delete(`/cart/clear/${user._id}`);
      fetchCartItems();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calculateOverallTotal = () => {
    let total = 0;
    cartItems.forEach(cartItem => {
      total += cartItem.quantity * cartItem.itemId.price;
    });
    return total.toFixed(2);
  };

  const handlePayment = async () => {
    // Implement payment logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {cartItems.length > 0 ? (
        <div className="flex justify-between max-w-5xl w-full p-8 bg-white rounded-lg">
          <div className="w-3/4 pr-8">
            <h2 className="text-3xl font-semibold mb-6">Cart</h2>
            {cartItems.map(cartItem => (
              <CartItem
                key={cartItem._id}
                cartItem={cartItem}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
            <div className="flex justify-end mt-4">
              <button onClick={clearCart} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg">Clear Cart</button>
            </div>
            <div className="mt-4 text-right">
              <p className="text-xl font-semibold">Overall Total: ${calculateOverallTotal()}</p>
            </div>
          </div>
          <CheckoutForm
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            city={city}
            setCity={setCity}
            streetAddress={streetAddress}
            setStreetAddress={setStreetAddress}
            handlePayment={handlePayment}
          />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty. Add products to your cart.</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
