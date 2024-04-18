/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import FavProductIMG from '../assets/favProductsImage.jpg'
import { Link } from 'react-router-dom'

const FavProduct = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
      <div className='md:w-1/2'>
        <img src={FavProductIMG} alt='' className='rounded md:w-10/12'/>
      </div>

      <div className='md:w-1/2 space-y-6'>
        <h2 className='text-3xl font-semibold my-5 md:w-3/4 leading-snug'>Find Your  <span 
        className='text-green-500'>Products from Here!</span></h2>
        <p className='mb-10 text-lg md:w-5/6'>"Welcome to our delightful ice cream paradise! 🍦 Explore our wide range of flavors and discover your favorite! From classic favorites to exotic delights, there's something for everyone. Come on in and find your favorite flavor here!"</p>
        {/*stats*/}
        <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
          
          <div>
            <h3 className='text-3xl font-semibold '>800+</h3>
            <p className='text-base'>Product Listing</p>
          </div>
          <div>
            <h3 className='text-3xl font-semibold '>550+</h3>
            <p className='text-base'>Registered Users</p>
          </div>
          <div>
            <h3 className='text-3xl font-semibold '>1200+</h3>
            <p className='text-base'>Report Generates</p>
          </div>
        </div>

      <Link to="/shop" className='mt-12 block'><button className='bg-green-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>View Shop</button></Link>

      </div>
    </div>
  )
}

export default FavProduct
