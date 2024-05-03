import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:8000/Shakya/get-menuItem')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  const generateReport = () => {
    const pdf = new jsPDF();
    pdf.text('Vino IceCream - Product Report', 105, 10, { align: 'center' });

    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const timeString = currentDate.toLocaleTimeString();
    const dateTimeString = `Date: ${dateString}   Time: ${timeString}`;
    pdf.text(dateTimeString, 105, 20, { align: 'center' });

    const headers = [['No.', 'Product name', 'Flavor', 'Quantity', 'Price', 'Expiry Date']];
    const data = allProducts.map((product, index) => [
      index + 1,
      product.name,
      product.flavor,
      product.quantity,
      product.price,
      product.expiryDate,
    ]);

    pdf.autoTable({
      head: headers,
      body: data,
      startY: 30,
    });

    pdf.save('VinoIceCream_ProductReport.pdf');
  };

  return (
    <div className="px-4 my-24">
      <div className="flex justify-center items-center">
        <table className="lg:w-[1180px]">
          <thead className="bg-gray-500">
            <tr>
              <th className="text-left">No.</th>
              <th>Product name</th>
              <th>Flavor</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.flavor}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <Button type="submit" onClick={generateReport} className="mt-5 bg-green-400 lg:w-[500px] rounded-lg hover:bg-green-600">
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default AllProductsPage;
