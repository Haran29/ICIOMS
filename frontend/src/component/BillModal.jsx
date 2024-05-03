import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const BillModal = ({ onClose, bill }) => {
    const handlePrint = () => {
      console.log("Print button clicked");
      const doc = new jsPDF();
      let yPos = 20;
  
      // Header
      doc.text("Order Receipt", 105, yPos, { align: "center" });
      yPos += 10;
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, {
        align: "center",
      });
      yPos += 20;
  
      // Table Header
      const tableHeaders = ["Item", "Price"];
      const tableRows = bill.items.map(item => [item.name, `LKR ${item.total}`]);
      doc.autoTable({
        startY: yPos,
        head: [tableHeaders],
        body: tableRows,
      });
  
      yPos = doc.previousAutoTable.finalY + 10;
  
      // Totals
      doc.text(
        `Subtotal: LKR ${(bill.totalAmount - bill.totalAmount * 0.1).toFixed(2)}`,
        20,
        yPos
      );
      yPos += 10;
      doc.text(`Tax (10%): LKR ${(bill.totalAmount * 0.1).toFixed(2)}`, 20, yPos);
      yPos += 10;
      doc.text(`Total Amount: LKR ${bill.totalAmount}`, 20, yPos);
  
      // Save PDF
      doc.save("OrderReceipt.pdf");
  
      // Close the modal after generating the PDF
      onClose();
  };
  
  
  
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold">Order Receipt</h2>
              <p className="text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="mb-4">
              {bill.items.map((item, index) => (
                <div key={index} className="flex justify-between mb-1">
                  <span>{item.name}</span>
                  <span>LKR {item.total}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal:</span>
                <span>
                  LKR{(bill.totalAmount - bill.totalAmount * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tax (10%):</span>
                <span>LKR{(bill.totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount:</span>
                <span>LKR{bill.totalAmount}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                onClick={handlePrint}
              >
                Print Receipt
              </button>
  
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default BillModal;
