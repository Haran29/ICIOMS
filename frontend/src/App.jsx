import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUp";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import OurMenu from "./pages/OurMenu";
import AboutUs from "./pages/AboutUs";
import ContactUS from "./pages/ContactUS";
import Dashboard from "./pages/Dashboard";
import NavBar from "./component/NavBar";
import UserNavBar from "./component/UserNavBar";
import CartPage from "./pages/CartPage";
import OrderConsole from "./pages/OrderConsole"
import axios from "axios";
import { Toaster } from "react-hot-toast";
import UserProvider from "../context/userContext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const DynamicNavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
      });
  }, []); 

  if (user && user.role === "admin") {
    return ;
  } else if (user) {
    return <UserNavBar />;
  } else {
    return <NavBar />;
  }
};

const App = () => {
  return (
    <>
      <UserProvider>
        <DynamicNavBar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/OrderOnlinePage" element={<OrderOnlinePage />} />
          <Route path="/OurMenu" element={<OurMenu />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUS" element={<ContactUS />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CartPage" element={<CartPage/>} />
          <Route path="/OrderConsole" element={<OrderConsole/>} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
