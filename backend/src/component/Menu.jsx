import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('/get-menuItem');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredMenuItems.map(item => (
          <div key={item._id} className="flex flex-col items-center justify-center p-4 border rounded-md shadow-md">
            <img src={item.image} alt={item.name} className="mb-2 rounded-md" style={{ width: '100px', height: '100px' }} />
            <span className="text-lg">{item.name}</span>
            <span className="text-lg">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
