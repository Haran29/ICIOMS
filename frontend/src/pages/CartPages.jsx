import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "../component/CartItem";
import CreditCardForm from "../component/CreditCardForm";

const CartPages = () => {
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  //sennding request to fetchCartItems 
  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user._id) {
        const response = await axios.get(`/get-cart-items/${user._id}`);
        setCartItems(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      toast.error("Failed to fetch cart items. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // updateQuanity 
  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      //retriving avaible qty
      const availableQuantityResponse = await axios.get(
        `/items/${
          cartItems.find((item) => item._id === cartItemId).itemId._id
        }/availableQuantity`
      );

      const availableQuantity = availableQuantityResponse.data.quantity;
      //chking if item is available
      if (newQuantity > availableQuantity) {
        toast.error(
          `Only ${availableQuantity} ${
            cartItems.find((item) => item._id === cartItemId).itemId.name
          } available.`,
          { position: "top-right" }
        );
        return;
      }

      if (newQuantity < 0) {
        toast.error("Quantity cannot be negative.", { position: "top-right" });
        return;
      }
      //updating qty
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
      toast.error(
        error.response?.data?.message ||
          "Failed to update quantity. Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  //remving a item in cart
  const removeItem = async (cartItemId) => {
    try {
      //sending requst to removing a item
      const response = await axios.delete("/cart/deleteItem", {
        data: { cartItemId },
      });
      fetchCartItems();
      toast.success("Item removed successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from cart. Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  //clear cart function
  const clearCart = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const response = await axios.delete(`/cart/clear/${user._id}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart. Please try again.", {
        position: "top-right",
      });
    }
  };

  // calculate overroll total
  const calculateOverallTotal = () => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.itemId.price;
    });
    return total.toFixed(2);
  };

  // handlepayment function
  const handlePayment = () => {
    // Frontend validation
    if (!validateForm()) {
      return;
    }
    setShowCreditCardForm(true);
  };

  const validateForm = () => {
    if (!phoneNumber || !postalCode || !city || !streetAddress) {
      toast.error("All fields are required.", { position: "top-right" });
      return false;
    }

    if (!/^(07)\d{8}$/.test(phoneNumber)) {
      toast.error("Phone number must be 10 digits and start with '07'.", {
        position: "top-right",
      });
      return false;
    }

    if (!/^[0-9]{5}$/.test(postalCode)) {
      toast.error("Postal code must be 5 digits.", { position: "top-right" });
      return false;
    }

    return true;
  };

  //order creation function
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
        // Generate a payment ID
        const paymentId = uuidv4();

        console.log(response);

        // Save payment details in payment table
        const paymentDetails = {
          paymentId,
          userId: user._id,
          orderId: response.data.orderId,
          status: "completed",
          Method: "Card",
          amount: calculateOverallTotal(),
        };

        const paymentResponse = await axios.post(
          "/payments/create",
          paymentDetails
        );

        if (paymentResponse.status === 201) {
          clearCart();
          toast.success(
            "Order created successfully and payment details saved!",
            { position: "top-right" }
          );
        } else {
          console.error("Failed to save payment details");
          toast.error("Failed to save payment details. Please try again.", {
            position: "top-right",
          });
        }
      } else {
        console.error("Failed to create order");
        toast.error("Failed to create order. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      {showCreditCardForm && (
        <CreditCardForm
          onClose={() => setShowCreditCardForm(false)}
          createOrder={createOrder}
        />
      )}
      {showConfirmationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Are you sure you want to clear your cart?
                  </h3>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    setShowConfirmationModal(false);
                    clearCart();
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : cartItems.length > 0 ? (
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
                  }}onBlur={() => {
                    if (!/^(07)\d{8}$/.test(phoneNumber)) {
                      toast.error("Phone number must be 10 digits and start with '07'.", {
                        position: "top-right",
                      });
                      setPhoneNumber("");
                  }}}
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
                  onBlur={() => {
                    if (!/^[0-9]{5}/.test(postalCode)) {
                      toast.error("Postal code must be 5 digits.", { position: "top-right" });
                      setPostalCode("");
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
                onClick={() => setShowConfirmationModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 text-lg"
              >
                Pay
              </button>
            </div>
            <div className="mt-4 text-right">
              <p className="text-xl font-semibold">
                Overall Total: LKR {calculateOverallTotal()}
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

export default CartPages;
