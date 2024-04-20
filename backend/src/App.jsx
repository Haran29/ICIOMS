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

import SuplierList from "./pages/Supplier-pages/SuplierList";
import AddSupplier from "./pages/Supplier-pages/AddSupplier";
import UpdateSupplier from "./pages/Supplier-pages/UpdateSupplier";
import PlaceOrder from "./pages/Supplier-pages/PlaceOrder";
import ConformOrder from "./pages/Supplier-pages/ConformOrder";
import OngoingOrder from "./pages/Supplier-pages/OngoingOrder";
import OrderHistory from "./pages/Supplier-pages/OrderHistory";
axios.defaults.baseURL = "http://localhost:9000";
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


          <Route path="/list-suplier" element={<SuplierList/>}/>
          <Route path="/add-supplier" element={<AddSupplier/>}/>
          <Route path="/update-supplier/:supplierid" element={<UpdateSupplier/>}/>

          <Route path="/place-order" element={<PlaceOrder/>}/>
          <Route path="/choose-place-order/:supplierid" element={<ConformOrder/>}/>
          <Route path="/ongoing-order" element={<OngoingOrder/>}/>
          <Route path="/order-history" element={<OrderHistory/>}/>
          

          
          
          
        </Routes>
      </UserProvider>

        </>

    
  );
};

export default App;
