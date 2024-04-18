/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { useLoaderData, useParams } from 'react-router-dom';

const EditProduct = () => {
  const {id} = useParams();
  const {name,flavor,quantity,price,image,expiryDate,productDescription} = useLoaderData();


  //handle adding products
const handleUpdate = (event) =>{
  event.preventDefault();
  const form = event.target;

  const name = form.name.value;
  const flavor = form.flavor.value;
  const quantity = form.quantity.value;
  const price = form.price.value;
  const expiryDate = form.expiryDate.value;
  const image = form.image.value;
  const productDescription = form.productDescription.value;

    const UpdateProductObj = {
      name,flavor,quantity,price,expiryDate,image,productDescription
    }
    //console.log(productObj);
    //update product data
    fetch(`http://localhost:9000/update-item/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(UpdateProductObj)

    }).then(data => {
      //console.log(data)
      alert("Product is Updated Successfully!")
    
    })

}

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-2xl font-semibold py-12 text-center'>Update Product Details</h2>
<div className='flex justify-center items-center bg-green-50'>
    <form onSubmit={handleUpdate} className="flex lg:w-[800px] flex-col gap-2 ">
      {/*first row*/}
      <div className='flex gap-8 '>
        {/*product name */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="name" value="1. Product Name :" />
          </div>
        <TextInput id="name" type="text" placeholder=" enter product name..." name='name' defaultValue={name} required />
        </div>
        {/*flavor*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="flavor" value="2. Flavor :" />
          </div>
        <TextInput id="flavor" type="text" placeholder=" flavor of the product" name='flavor' defaultValue={flavor} required />
        </div>
      </div>  
      {/*2nd row*/}
      <div className='flex gap-8'>
        {/*quantity*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="quantity" value="3. Quantity :" />
          </div>
        <TextInput id="quantity" type="number" placeholder="quantity" name='quantity' defaultValue={quantity} required />
        </div>
        {/*price*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="price" value="4. Price :" />
          </div>
        <TextInput id="price" type="text" placeholder=" price" name='price' defaultValue={price} required />
        </div>
      </div>  

        {/*3rd row */}  
        <div className='flex gap-8'>
        {/*expiry  date*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="expiryDate" value="5. Expiry Date :" />
          </div>
        <TextInput id="expiryDate" type="date" placeholder=" expiry date" name='expiryDate' defaultValue={expiryDate} required />
        </div>
        {/*product image URL*/}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
          <Label htmlFor="image" value="6. Product Image URL :" />
          </div>
        <TextInput id="image" type="url" placeholder=" product image url" name='image' defaultValue={image} required />
        </div>
      </div>  

      <div>
        <div className="mb-2 block">
          <Label htmlFor="productDescription" value="7. Product Description" />
        </div>
        <Textarea id="productDescription" placeholder="Write your product description ..." name='productDescription' defaultValue={productDescription} required rows={8} className='w-full'/>
        </div>
        <Button type="submit" className='mt-5 bg-green-400'>Update Product Details</Button>
      <div></div> 
    </form>
</div>
    </div>
  )
}

export default EditProduct
