/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

const ManageProductPage = () => {
  const [allProducts,setAllProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/get-menuItem").then(res => res.json()).then(data => setAllProducts(data));
  },[])

 //delete a product
 const handleDelete = (id) => {
  console.log(id)
  fetch(`http://localhost:9000/delete-item/${id}`,{
    method: "DELETE",
  }).then(res =>res.json()).then(data => {
    alert("Product is Deleted Successfully!")
    //setAllProducts(data);
  })
 }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-2xl font-semibold py-12 text-center'>Manage Your Products</h2>
 <div className='flex justify-center items-center '>
    {/*table for product data*/}
    <Table className='lg:w-[1180px]'>
        <Table.Head className='bg-gray-500'>
          <Table.HeadCell className='text-left'>No.</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Flavor</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allProducts.map((product,index) => <Table.Body className="divide-y" key={product._id}>
              <Table.Row className="bg-green-200 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {product.name}
            </Table.Cell>
            <Table.Cell>{product.flavor}</Table.Cell>
            <Table.Cell>{product.quantity}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>
              <Link 
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-7" to={`/update-item/${product._id}`}>
                Edit
              </Link>
              <button onClick={() => handleDelete(product._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-red-700'>Delete</button>
            </Table.Cell>
          </Table.Row>
          </Table.Body>)
        }
        
      </Table>
      </div> 
    </div>
  )
}

export default ManageProductPage
