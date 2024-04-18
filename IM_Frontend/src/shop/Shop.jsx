/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';


const Shop = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9000/get-menuItem").then(res => res.json()).then(data => setProducts(data))
    },[])
  return (
    <div className='mt-28 px-4 lg:px-24'>
        <h2 className='text-4xl font-semibold text-center'>All Products are Here!</h2>

        <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
            products.map(product => <Card
                className="max-w-sm"
              >
                <img src={product.image} alt="" className='h-96' />

                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                
                <Link to={`/get-item/${product._id}`} >
                  <button className='bg-green-500 font-semibold text-white py-2 rounded px-24 '>See Details</button>
                </Link>
              </Card>)
        }
        </div>
    </div>
  )
}

export default Shop