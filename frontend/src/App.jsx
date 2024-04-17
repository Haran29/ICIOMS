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
import OrderHistory from "./pages/OrderHistory"
import OrderHistoryPage from "./pages/OrderHistoryPage"
import GenerateReport from "./pages/GenerateReport"
import SalesPersonManagerNavBar from "./component/SalesPersonManagerNavBar"
import SalesPersonNavBar from "./component/SalesPersonNavBar";
import OrderHistoryPages from "./pages/OrderHistoryPages"
import SalesStatisticsPage from "./pages/SalesStatisticsPage"
import Footer from "./component/Footer";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const DynamicNavBar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loader component if you have one
  }

  if (user) {
    if (user.role === "admin") {
      return <NavBar />; // Render default NavBar for admin
    } else if (user.role === "salesperson") {
      return <SalesPersonNavBar />; // Render SalesPersonNavBar for salesperson
    } else if (user.role === "salesperson_manager") {
      return <SalesPersonManagerNavBar />; // Render SalesPersonManagerNavBar for salesperson manager
    } else {
      return <UserNavBar />; // Render UserNavBar for other users
    }
  } else {
    return <NavBar />; // Render default NavBar if user is not logged in or if role is not defined
  }
};

const App = () => {
  return (
    <>
      <UserProvider>
        <DynamicNavBar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<OurMenu />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/OrderOnlinePage" element={<OrderOnlinePage />} />
          <Route path="/OurMenu" element={<OurMenu />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUS" element={<ContactUS />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CartPage" element={<CartPage/>} />
          <Route path="/OrderConsole" element={<OrderConsole/>} />
          <Route path="/OrderHistory" element={<OrderHistory/>} />
          <Route path="/OrderHistoryPage" element={<OrderHistoryPage/>} />
          <Route path="/OrderHistoryPages" element={<OrderHistoryPages/>} />
          <Route path="/GenerateReport" element={<GenerateReport/>} />
          <Route path="/SalesStatisticsPage" element={<SalesStatisticsPage/>} />
        </Routes>
        <Footer/>
      </UserProvider>
    </>
  );
};

export default App;
