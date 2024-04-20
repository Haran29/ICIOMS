import React from "react";
import SupplierNavBar from "../SupplierNavBar/SupplierNavBar";



const SuplierLayout = ({ children }) => {
  return (
    <>
      <SupplierNavBar/>
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
    </>
  );
};

export default SuplierLayout;
