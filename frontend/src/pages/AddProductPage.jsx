/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Label, TextInput, Textarea } from "flowbite-react";

const AddProductPage = () => {
  //handle adding products
  const handleProductSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const flavor = form.flavor.value;
    const quantity = form.quantity.value;
    const price = form.price.value;
    const expiryDate = form.expiryDate.value;
    const image = form.image.value;
    const productDescription = form.productDescription.value;

    const productObj = {
      name, flavor, quantity, price, expiryDate, image, productDescription
    }
    console.log(productObj);

    //send data to db
    fetch("http://localhost:8000/Shakya/add-item", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productObj)
    }).then(res => res.json()).then(data => {
      //console.log(data)
      alert("Product Added Successfully!")
      form.reset();
    })
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-12 bg-white"  style={{ backgroundImage: "url('/src/assets/bannerImages/img1223.jpg')", backgroundSize: "full", backgroundPosition: "left" }}>
      <form onSubmit={handleProductSubmit} className="bg-green-300 rounded-lg overflow-hidden shadow-lg p-8 max-w-lg">
        <h2 className="mb-8 text-2xl font-semibold text-center">Add New Products from Here!</h2>
        {/* Product Name */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="name" value="1. Product Name :" />
            </div>
            <TextInput id="name" type="text" placeholder="Enter product name..." name='name' required />
          </div>
          {/* Flavor */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="flavor" value="2. Flavor :" />
            </div>
            <TextInput id="flavor" type="text" placeholder="Flavor of the product" name='flavor' required />
          </div>
        </div>
        {/* Quantity and Price */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="3. Quantity :" />
            </div>
            <TextInput id="quantity" type="number" placeholder="Quantity" name='quantity' required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" value="4. Price :" />
            </div>
            <TextInput id="price" type="text" placeholder="Price" name='price' required />
          </div>
        </div>
        {/* Expiry Date and Image URL */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="expiryDate" value="5. Expiry Date :" />
            </div>
            <TextInput id="expiryDate" type="date" placeholder="Expiry date" name='expiryDate' required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="image" value="6. Product Image URL :" />
            </div>
            <TextInput id="image" type="url" placeholder="Product image URL" name='image' required />
          </div>
        </div>
        {/* Product Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="productDescription" value="7. Product Description" />
          </div>
          <Textarea id="productDescription" placeholder="Write your product description ..." name='productDescription' required rows={8} className='w-full' />
        </div>
        {/* Submit Button */}
        <Button type="submit" className='mt-5 bg-green-400'>Add Product</Button>
      </form>
    </div>
  );
}

export default AddProductPage;