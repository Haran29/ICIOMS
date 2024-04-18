/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import {} from 'react-icons/fa6'

const ProductCards = ({headline,products}) => {

   // console.log(products);

  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-3xl text-center font-semibold text-black my-5'>{headline}</h2>

        {/* cards */}
        <div className='mt-12'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      >
        
        {
            products.map(product => <SwiperSlide key={product._id}>
                <Link to ={`/get-item/${product._id}`}>
                    <div>
                        <img src={product.image} alt=''/>
                        <div>

                        </div>
                    </div>
                    <div>
                        <div>
                        <h3>{product.name}</h3>
                        <p>{product.flavor}</p>
                        </div>
                        <div>
                            <p>Rs.{product.price}</p>
                        </div>
                    </div>
                </Link>
            </SwiperSlide>)
        }
      </Swiper>
        </div>

    </div>
  )
}

export default ProductCards
