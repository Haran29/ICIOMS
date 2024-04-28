import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">Vino IceCream</h3>
          <p className="text-sm mt-2">Delicious IceCreams just for you!</p>
        </div>
        <div className="border-t border-gray-300 mt-4 pt-4 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Vino IceCream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
