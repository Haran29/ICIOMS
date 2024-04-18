/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ProductCards from '../components/ProductCards';

const BestSellerProducts = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9000/get-menuItem").then(res => res.json()).then(data => setProducts(data.slice(0,8)))
    }, [])

  return (
    <div>
        <ProductCards products={products} headline="Best Seller Products"/>
    </div>
  )
}

export default BestSellerProducts