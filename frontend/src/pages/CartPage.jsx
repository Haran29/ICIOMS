import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = ({ cartItem, updateQuantity, removeItem }) => (
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
        onClick={() => updateQuantity(cartItem._id, cartItem.quantity - 1)}
        className="btn btn-sm btn-blue"
      >
        -
      </button>
      <button
        onClick={() => updateQuantity(cartItem._id, cartItem.quantity + 1)}
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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user._id) {
        const response = await axios.get(`/get-cart-items/${user._id}`);
        setCartItems(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity < 0) {
        toast.error("Quantity cannot be negative.", { position: "top-right" });
        return;
      }
      const response = await axios.put("/cart/updateQuantity", {
        cartItemId,
        quantity: newQuantity,
      });
      fetchCartItems();
      toast.success("Quantity updated successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity. Please try again.", {
        position: "top-right",
      });
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await axios.delete("/cart/deleteItem", {
        data: { cartItemId },
      });
      fetchCartItems();
      toast.success("Item removed successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.", {
        position: "top-right",
      });
    }
  };

  const clearCart = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const response = await axios.delete(`/cart/clear/${user._id}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const calculateOverallTotal = () => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.itemId.price;
    });
    return total.toFixed(2);
  };

  const handlePayment = async () => {
    if (!phoneNumber || !postalCode || !city || !streetAddress) {
      toast.error("All fields are required.", { position: "top-right" });
      return;
    }
  
    try {
      const paymentResponse = await axios.post("/simulate-payment");
  
      if (paymentResponse.status === 200) {
        createOrder();
        toast.success("Payment successful!", { position: "top-right" });
      } else {
        console.error("Payment failed");
        toast.error("Payment failed. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Error during payment. Please try again.", {
        position: "top-right",
      });
    }
  };

  const createOrder = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));

      const orderDetails = {
        userId: user._id,
        phoneNumber,
        postalCode,
        city,
        streetAddress,
        items: cartItems.map((item) => ({
          itemId: item.itemId._id,
          name: item.itemId.name,
          imageUrl: item.itemId.image,
          quantity: item.quantity,
          price: item.itemId.price,
        })),
        totalAmount: calculateOverallTotal(),
        status: "pending",
      };

      const response = await axios.post("/orders/create", orderDetails);

      if (response.status === 201) {
        clearCart();
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      {cartItems.length > 0 ? (
        <div className="flex justify-between max-w-5xl w-full p-8 bg-white rounded-lg">
          <div className="w-3/4 pr-8">
            <h2 className="text-3xl font-semibold mb-6">Cart</h2>
            {cartItems.map((cartItem) => (
              <CartItem
                key={cartItem._id}
                cartItem={cartItem}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}

            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Checkout</h3>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]{0,10}$/.test(value)) {
                      setPhoneNumber(value);
                    }
                  }}
                  className="input"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="postalCode"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]{0,5}$/.test(value)) {
                      setPostalCode(value);
                    }
                  }}
                  className="input"
                  placeholder="Postal Code"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input"
                  placeholder="City"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="streetAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="input"
                  placeholder="Street Address"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg "
              >
                Pay
              </button>
            </div>
            <div className="mt-4 text-right">
              <p className="text-xl font-semibold">
                Overall Total: ${calculateOverallTotal()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">
            Your cart is empty. Add products to your cart.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
