/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'flowbite-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/get-menuItem')
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  const generateReport = () => {
    const pdf = new jsPDF();
    pdf.text('Vino IceCream - Product Report', 105, 10, { align: 'center' });

    // Current date and time
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const timeString = currentDate.toLocaleTimeString();
    const dateTimeString = `Date: ${dateString}   Time: ${timeString}`;
    pdf.text(dateTimeString, 105, 20, { align: 'center' });

    // Table headers
    const headers = [['No.', 'Product name', 'Flavor', 'Quantity', 'Price', 'Expiry Date']];

    // Table data
    const data = allProducts.map((product, index) => [
      index + 1,
      product.name,
      product.flavor,
      product.quantity,
      product.price,
      product.expiryDate,
    ]);

    // Auto table generation
    pdf.autoTable({
      head: headers,
      body: data,
      startY: 30,
    });

    // Save the PDF
    pdf.save('VinoIceCream_ProductReport.pdf');
  };

  return (
    <div className="px-4 my-24 ">
      <div className="flex justify-center items-center ">
        <Table className="lg:w-[1180px]">
          <Table.Head className="bg-gray-500">
            <Table.HeadCell className="text-left">No.</Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Flavor</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Expiry Date</Table.HeadCell>
          </Table.Head>
          {allProducts.map((product, index) => (
            <Table.Body className="divide-y" key={product._id}>
              <Table.Row className="bg-gray-400 dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </Table.Cell>
                <Table.Cell>{product.flavor}</Table.Cell>
                <Table.Cell>{product.quantity}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.expiryDate}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
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
