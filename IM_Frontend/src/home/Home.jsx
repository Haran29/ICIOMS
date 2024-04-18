/* eslint-disable no-unused-vars */


import React, { useState } from 'react';
import Banner from '../components/Banner';
import BestSellerProducts from './BestSellerProducts';
import FavProduct from './FavProduct';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Perform search action here, if needed
    console.log("Search query:", searchQuery);
  };

  return (
    <div>
      <Banner onSearch={setSearchQuery} onSearchButtonClick={handleSearch} />
      <BestSellerProducts searchQuery={searchQuery} />
      <FavProduct />
    </div>
  );
};

export default Home;
