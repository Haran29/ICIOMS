import React from "react";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUp";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import OurMenu from "./pages/OurMenu";
import AboutUs from "./pages/AboutUs";
import ContactUS from "./pages/ContactUS";
import Dashboard from "./pages/Dashboard";
import NavBar from "./component/NavBar";
import UserNavBar from "./component/UserNavBar";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import UserProvider from "../context/userContext";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import CreateBatch from "./pages/CreateBatch";
import UpdateBatch from "./pages/UpdateBatch";
import ViewBatch from "./pages/ViewBatch";
import GenerateReport from "./pages/GenerateReport";
import QMNavBar from "./component/QMNavBar"
import QMHome from "./pages/QMHome";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <UserProvider>
        {user ? <UserNavBar /> : <NavBar />}
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
          <Route path="/" element={<Home />} />
          <Route path="/qm-home" element={<QMHome />} />
          <Route path="/create-batch" element={<CreateBatch />} />
          <Route path="/update-batch/:batchID" element={<UpdateBatch />} />
          <Route path="/view-batch" element={<ViewBatch />} />
          <Route path="/generate-report" element={<GenerateReport />} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
