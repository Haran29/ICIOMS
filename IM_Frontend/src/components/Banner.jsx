/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-400 flex items-center'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
            {/*left side*/}
            <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-4xl font-semibold leading-snug text-black'>Welcome to Vino IceCream !</h2>
            <p className='md:w-4/5'>“Stay updated on your inventory status, manage orders efficiently, 
                and delight your customers with our intuitive dashboard interface.This is your go-to place for all things inventory-related. 
                From keeping track of your stock levels to adding new products, updating existing ones, and generating reports – everything you need is right here. 
                Think of it as your control center for managing your inventory effortlessly. "</p>
                <div>
                    <input type='search' name='serach' id='serach' placeholder='Search Products...' className='py-2 px-24 rounded-s-sm outline-none'/>

                    <button className='bg-green-500 px-6 py-2 text-white font-medium hover:bg-green-700 transition-all ease-in duration-200'>Search</button>
                </div>
            </div>

            {/*right side */}
            <div>
               <BannerCard></BannerCard>
            </div>
        </div>
    </div>
  )
}

export default Banner