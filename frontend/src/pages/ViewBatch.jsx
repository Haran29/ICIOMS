import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Image from "../assets/BackgroundMain3.jpg"
import QMNavBar from "../component/QMNavBar";

//Creating a Page to view all the batches, redirect to pages and Delete batches functions

export default function ViewBatch() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //Getting information from the database.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/view-batch"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //Formatiing date Structure

  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return newDate.toLocaleDateString(undefined, options);
  };

  //Deleting Batch from the Database

  const handleDelete = async (batchID) => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        "Batch will be completely removed, Are you sure you want to Continue?"
      );

      // If user confirms deletion
      if (isConfirmed) {
        await axios.delete(
          `http://localhost:8000/api/products/delete-batch/${batchID}`
        );

        // If deletion is successful, update the state to reflect the changes
        setProducts(products.filter((product) => product.batchID !== batchID));

        toast.success("Batch was Successfully Deleted", {
          className:
            "bg-gradient-to-r from-gray-300 to-gray-500 text-white font-bold mt-16",
        });
      }
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  //Creating a Search Function

  const filteredProducts = products.filter(
    (product) =>
      product.batchID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.batchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="container max-w-full max-h-full"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="w-full md:w-11/12 lg:w-5/6 xl:w-auto relative">
          <div
            className="bg-gray-200 opacity-90
           rounded-lg p-8 border-gray-400 border-4"
          >
            <div>
              <h1 className="text-left text-2xl font-bold mb-1">
                Ice Cream Batch Details
              </h1>
              <hr className="border-slate-500 border-t-2 left-0 w-3/5 mb-4 mt-0" />
              <div className="flex items-center">
                <Link
                  to="/Generate-Report"
                  className="bg-gradient-to-r from-blue-800 to-blue-300 hover:from-blue-700 hover:to-blue-400 active:opacity-80 text-center text-black font-bold m-1 py-2 px-5 w-1/4 rounded-md"
                >
                  Generate Report
                </Link>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-300 text-black border-2 border-gray-500 text-left font-bold py-2 px-2 w-1/2 rounded-md m-2"
                />
                <Link
                  to="/create-batch"
                  className="bg-gradient-to-r from-green-500 to-green-300 hover:from-green-300 hover:to-green-400 active:opacity-80 text-center text-black font-bold m-1 py-2 px-5 w-1/4 rounded-md relative"
                >
                  Create a Batch{" "}
                  <span className="text-black font-bold absolute bottom-1.5 left-2 ml-1 mt-px text-3xl">
                    +
                  </span>
                </Link>
              </div>
              <div className="overflow-auto max-h-96">
                <table className="w-full mt-4 border-gray-400 border-2">
                  <thead className="bg-gray-400 border-b-2 border-gray-600 sticky top-0">
                    <tr>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Batch ID
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Batch Name
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Batch Form Completion
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Batch Recieved
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Quantity
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Score
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Status
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-200 border-gray-400">
                    {filteredProducts.map((product, index) => (
                      <tr
                        key={product.batchID}
                        className={
                          index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                        }
                      >
                        <td className="p-3 text-sm  border-gray-400 text-black font-semibold border-t-2 border-b-2 ${product.batchID % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}">
                          {product.batchID}
                        </td>
                        <td className="p-3 text-sm  border-gray-400 text-black font-semibold border-t-2 border-b-2">
                          {product.batchName}
                        </td>
                        <td className="p-3 text-sm  border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {formatDate(product.CurrentDate)}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {formatDate(product.receivedDate)}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {product.quantity}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {product.overallScore}
                        </td>
                        <td
                          className={`p-3   border-gray-400 text-sm font-semibold border-t-2 border-b-2 text-center ${
                            product.overallScore > 64
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {product.status}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2">
                          <div className="flex items-center">
                            <Link
                              to={`/update-batch/${product.batchID}`}
                              className="bg-green-500 hover:bg-green-600 active:opacity-80 text-center  text-white font-bold m-1 w-20 py-2 px-5 rounded-md"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(product.batchID)}
                              className="bg-red-500 hover:bg-red-600 active:opacity-80 text-center  text-white font-bold m-1 py-2 px-5 rounded-md"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
