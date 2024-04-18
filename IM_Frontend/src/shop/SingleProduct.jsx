/* eslint-disable no-unused-vars */
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleProduct = () => {
  const { name, flavor, quantity, price, expiryDate, productDescription, image } = useLoaderData();

  return (
    <div className="bg-green-300 min-h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white shadow-lg py-2 p-8 grid grid-cols-2 gap-8" style={{ maxWidth: '800px' }}>
        {/* Left column */}
        <div>
          <img src={image} alt={name} className="w-full mb-4 rounded-lg" style={{ maxWidth: '300px', maxHeight: '340px' }} />
          <h2 className="text-3xl font-semibold mb-4">{name}</h2>
          <p className="font-semibold">Flavor:</p>
          <p>{flavor}</p>
          <p className="font-semibold">Quantity in Stock:</p>
          <p>{quantity}</p>
          <p className="font-semibold">Price:</p>
          <p>{price}</p>
          <p className="font-semibold">Expiry Date:</p>
          <p>{expiryDate}</p>
        </div>
        {/* Right column */}
        <div>
          <div className="bg-white p-4 rounded-lg" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <h3 className="text-lg font-semibold mb-2">About this Product:</h3>
            <p>{productDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
