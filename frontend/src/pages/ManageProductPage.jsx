import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/Shakya/get-menuItem")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Delete a product
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/Shakya/delete-item/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setAllProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        alert("Product is Deleted Successfully!");
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-2xl font-semibold py-12 text-center">
        Manage Products
      </h2>
      <div className="flex justify-center items-center">
        {/* Table for product data */}
        <table className="w-full lg:w-[1180px] border-collapse">
          <thead className="bg-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">No.</th>
              <th className="px-6 py-3">Product name</th>
              <th className="px-6 py-3">Flavor</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
              <tr
                key={product._id}
                className={index % 2 === 0 ? "bg-green-200" : "bg-green-100"}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.flavor}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <Link
                    className="bg-green-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-green-700 mx-2"
                    to={`/update-item/${product._id}`}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-red-700 mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProductPage;
