import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import YourImage from "../assets/icecreamleft.png";

const LoginPage = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/LoginPage", {
        email,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Successfully Logged in");
        setData({ email: "", password: "" });
        Navigate("/Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden ">
      {/* Content Section - Photo */}
      <div className="flex-1 bg-emerald-500 flex items-center justify-center relative">
        {/* Your photo or image here */}
        <img
          src={YourImage}
          alt="Your Photo"
          style={{ width: "550px", height: "550px"  }}
          className="rounded-lg absolute bottom-0 left-0 "
        />
      </div>
      {/* Content Section - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="max-w-sm">
          <h2 className="text-2xl font-semibold mb-6">Sign In</h2> {/* "Sign In" label */}
          {/* Login Form */}
          <form action="" onSubmit={LoginUser}>
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
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
