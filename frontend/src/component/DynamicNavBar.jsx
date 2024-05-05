import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import NavBar from "./NavBar";
import UserNavBar from "./UserNavBar";
import SalesPersonManagerNavBar from "./SalesPersonManagerNavBar";
import PaymentManagerNavBar from "./PaymentManagerNavBar";
import SalesPersonNavBar from "./SalesPersonNavBar";
import QMNavBar from "./QMNavBar";
import UserManagerNavBar from "./UserManagerNavBar";
import SupplierManager from "./SupplierNavBar/SupplierNavBar";

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
    return <div>Loading...</div>;
  }

  if (user) {
    if (user.role === "admin") {
      return <NavBar />;
    } else if (user.role === "salesperson") {
      return <SalesPersonNavBar />;
    } else if (user.role === "salesperson_manager") {
      return <SalesPersonManagerNavBar />;
    } else if (user.role === "PaymentManager") {
      return <PaymentManagerNavBar />;
    } else if (user.role === "UserManager") {
      return <UserManagerNavBar />;
    } else if (user.role === "QualityManager") {
      return <QMNavBar />;
    } else if (user.role === "SupplierManager") {
      return <UserNavBar />;
    } else {
      return <UserNavBar />;
    }
  } else {
    return <NavBar />;
  }
};

export default DynamicNavBar;
