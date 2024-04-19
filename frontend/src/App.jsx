import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUp";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import OurMenu from "./pages/OurMenu";
import AboutUs from "./pages/AboutUs";
import ContactUS from "./pages/ContactUS";
import CartPage from "./pages/CartPage";
import CartPages from "./pages/CartPages";
import OrderConsole from "./pages/OrderConsole";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import UserProvider from "../context/userContext";
import OrderHistory from "./pages/OrderHistory";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import GenerateReport from "./pages/GenerateReport";
import OrderHistoryPages from "./pages/OrderHistoryPages";
import SalesStatisticsPage from "./pages/SalesStatisticsPage";
import Footer from "./component/Footer";
import DynamicNavBar from "./component/DynamicNavBar";
import ManageOrdersPage from "./pages/ManageOrderPage";
import PaymentList from "./pages/PaymentList"
import ManagePayment from "./pages/ManagePayment"
import GeneratePaymentReport from "./pages/GeneratePaymentReport"

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

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
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/CartPages" element={<CartPages/>} />
          <Route path="/OrderConsole" element={<OrderConsole />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/OrderHistoryPage" element={<OrderHistoryPage />} />
          <Route path="/OrderHistoryPages" element={<OrderHistoryPages />} />
          <Route path="/GenerateReport" element={<GenerateReport />} />
          <Route
            path="/SalesStatisticsPage"
            element={<SalesStatisticsPage />}
          />
          <Route path="/ManageOrdersPage" element={<ManageOrdersPage />} />
          <Route path="/PaymentList" element={<PaymentList />} />\
          <Route path="/ManagePayment" element={<ManagePayment />} />
          <Route path="/GeneratePaymentReport" element={<GeneratePaymentReport/>} />
        </Routes>
        <Footer />
      </UserProvider>
    </>
  );
};

export default App;
