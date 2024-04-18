/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";

const AddProductPage = () => {
//handle adding products
const handleProductSubmit = (event) =>{
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
      name,flavor,quantity,price,expiryDate,image,productDescription
    }
    console.log(productObj);

    //send data to db
    fetch("http://localhost:9000/add-item",{
      method:"POST",
      headers: {
        "Content-type":"application/json",
      },
      body:JSON.stringify(productObj)
    }).then(res => res.json()).then(data => {
      //console.log(data)
      alert("Product Added Successfully!")
      form.reset();
    })

}

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-2xl font-semibold py-12 text-center'>Add New Products from Here!</h2>
<div className='flex justify-center items-center bg-green-50'>
    <form onSubmit={handleProductSubmit} className="flex lg:w-[800px] flex-col gap-2 ">
      {/*first row*/}
      <div className='flex gap-8 '>
        {/*product name */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="name" value="1. Product Name :" />
          </div>
        <TextInput id="name" type="text" placeholder=" enter product name..." name='name' required />
        </div>
        {/*flavor*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="flavor" value="2. Flavor :" />
          </div>
        <TextInput id="flavor" type="text" placeholder=" flavor of the product" name='flavor' required />
        </div>
      </div>  
      {/*2nd row*/}
      <div className='flex gap-8'>
        {/*quantity*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="quantity" value="3. Quantity :" />
          </div>
        <TextInput id="quantity" type="number" placeholder="quantity" name='quantity' required />
        </div>
        {/*price*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="price" value="4. Price :" />
          </div>
        <TextInput id="price" type="text" placeholder=" price" name='price' required />
        </div>
      </div>  

        {/*3rd row */}  
        <div className='flex gap-8'>
        {/*expiry  date*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="expiryDate" value="5. Expiry Date :" />
          </div>
        <TextInput id="expiryDate" type="date" placeholder=" expiry date" name='expiryDate' required />
        </div>
        {/*product image URL*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="image" value="6. Product Image URL :" />
          </div>
        <TextInput id="image" type="url" placeholder=" product image url" name='image' required />
        </div>
      </div>  

      <div>
        <div className="mb-2 block">
          <Label htmlFor="productDescription" value="7. Product Description" />
        </div>
        <Textarea id="productDescription" placeholder="Write your product description ..." name='productDescription' required rows={8} className='w-full'/>
        </div>
        <Button type="submit" className='mt-5 bg-green-400'>Add Product</Button>
      <div></div> 
    </form>
</div>
    </div>
  )
}

export default AddProductPage