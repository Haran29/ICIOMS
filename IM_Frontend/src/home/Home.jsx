// eslint-disable-next-line no-unused-vars
import React from 'react'
import Banner from '../components/Banner'
import BestSellerProducts from './BestSellerProducts'
import FavProduct from './FavProduct'

const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSellerProducts/>
      <FavProduct/>
    </div>
  )
}

export default Home