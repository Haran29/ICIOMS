import React from "react";
import Menu from "../component/Menu"

const OurMenu = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to our Online Ice Cream Shop!
      </h1>
      <Menu />
    </div>
  );
};

export default OurMenu;
