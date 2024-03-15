import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import YourImage from "../assets/icecreamright.png";

const SignUpPage = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  const validateContact = (contact) => {
    // Regular expression for 10-digit phone number validation
    const re = /^\d{10}$/;
    return re.test(contact);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, contact, password } = data;

    // Check if email is valid
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Check if contact number is valid
    if (!validateContact(contact)) {
      toast.error("Please enter a valid 10-digit contact number.");
      return;
    }

    try {
      const response = await axios.post("/SignUpPage", {
        name,
        email,
        contact,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Successfully Registered");
        setData({ name: "", email: "", contact: "", password: "" });
        Navigate("/LoginPage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Content Section - Signup Form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="max-w-sm">
          <h2 className="text-2xl font-semibold mb-6">Sign up</h2>
          {/* Signup Form */}
          <form action="" onSubmit={registerUser}>
            <label htmlFor="Name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full pb-1 mb-4 border-b border-gray-300 focus:outline-none"
              required
            />

            <label htmlFor="Email" className="block mb-2">
              Email
            </label>
            <input
              type="text"
              name="Email"
              id="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full pb-1 mb-4 border-b border-gray-300 focus:outline-none"
            />

            <label htmlFor="Contact" className="block mb-2">
              Contact
            </label>
            <input
              type="text"
              name="Contact"
              id="Contact"
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
              className="w-full pb-1 mb-4 border-b border-gray-300 focus:outline-none"
              required
            />

            <label htmlFor="Password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full pb-1 mb-4 border-b border-gray-300 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* Content Section - Image */}
      <div className="flex-1 bg-emerald-500 flex items-center justify-center relative">
        <img
          src={YourImage}
          alt="Your Photo"
          style={{ width: "550px", height: "550px" }}
          className="rounded-lg absolute bottom-0 right-0 "
        />
      </div>
    </div>
  );
};

export default SignUpPage;
