/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import React, { useEffect, useState } from 'react';
import ProductCards from '../components/ProductCards';

const BestSellerProducts = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/get-menuItem")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8)));
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.flavor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <ProductCards products={filteredProducts} headline="Best Seller Products" />
    </div>
  );
};

export default BestSellerProducts;
