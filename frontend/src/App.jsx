import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUp";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import OrderOnline from "./pages/OrderOnline"
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
import ManageProfile from "./pages/ManageProfile";
import UserReport from "./pages/UserReport";
import Adduser from "./pages/Adduser"
import Admindash from "./pages/Admindash";
import ResetPassword from "./pages/ResetPassword";
import CreateBatch from "./pages/CreateBatch";
import UpdateBatch from "./pages/UpdateBatch";
import ViewBatch from "./pages/ViewBatch";
import QMGenerateReport from "./pages/QMGenerateReport";
import QMHome from "./pages/QMHome";
import AddProductPage from "./pages/AddProductPage"
import AllProductsPage from "./pages/AllProductPage"
import ManageProductPage from "./pages/ManageProductPage"
import  EditProductPage from "./pages/EditProductPage"
import CreatePromoCode from "./component/CreatePromoCode";

// isira
import SuplierList from "./pages/Supplier-pages/SuplierList";
import AddSupplier from "./pages/Supplier-pages/AddSupplier";
import UpdateSupplier from "./pages/Supplier-pages/UpdateSupplier";
import PlaceOrder from "./pages/Supplier-pages/PlaceOrder";
import ConformOrder from "./pages/Supplier-pages/ConformOrder";
import OngoingOrder from "./pages/Supplier-pages/OngoingOrder";
import SupOrderHistory from "./pages/Supplier-pages/SupOrderHistory";

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
          <Route path="/OrderOnline" element={<OrderOnline />} />
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
          <Route path="/CreatePromoCode" element={<CreatePromoCode/>} />

          <Route path="/Adduser" element={<Adduser/>} />
          <Route path="/Admindash" element={<Admindash/>} />
          <Route path="/ManageProfile" element={<ManageProfile/>} />
          <Route path="/UserReport" element={<UserReport/>} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          <Route path="/qm-home" element={<QMHome />} />
          <Route path="/create-batch" element={<CreateBatch />} />
          <Route path="/update-batch/:batchID" element={<UpdateBatch />} />
          <Route path="/view-batch" element={<ViewBatch />} />
          <Route path="/generate-report" element={<QMGenerateReport />} />
          <Route path="/AddProductPage" element={<AddProductPage />} />
          <Route path="/AllProductsPage" element={<AllProductsPage />} />
          <Route path="/ManageProductPage" element={<ManageProductPage />} />
          <Route path="/update-item/:productId" component={EditProductPage} />

           {/* Isira */}
           <Route path="/list-suplier" element={<SuplierList/>}/>
          <Route path="/add-supplier" element={<AddSupplier/>}/>
          <Route path="/update-supplier/:supplierid" element={<UpdateSupplier/>}/>

          <Route path="/place-order" element={<PlaceOrder/>}/>
          <Route path="/choose-place-order/:supplierid" element={<ConformOrder/>}/>
          <Route path="/ongoing-order" element={<OngoingOrder/>}/>
          <Route path="/order-history" element={<SupOrderHistory/>}/>


        </Routes>
       
        <Footer />
      </UserProvider>
    </>
  );
};

export default App;
