import React, { useEffect, useState } from 'react';

const EditProductPage = ({ match, history }) => {
  const [product, setProduct] = useState(null);
  

  useEffect(() => {
    fetch(`http://localhost:8000/Shakya/get-menuItem/${match.params.id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [match.params.id]);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/Shakya/update-item/${match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then(res => res.json())
    .then(() => {
      alert("Product is Updated Successfully!");
      history.push('/manage-products');
    })
    .catch(error => console.error('Error updating product:', error));
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-2xl font-semibold py-12 text-center'>Edit Product</h2>
      {product && (
        <div className='flex justify-center items-center'>
          <form onSubmit={handleEdit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input type='text' id="name" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} />
            </div>
            <div className="mb-4">
              <label htmlFor="flavor" className="block text-gray-700 text-sm font-bold mb-2">Flavor</label>
              <input type='text' id="flavor" value={product.flavor} onChange={(e) => setProduct({...product, flavor: e.target.value})} />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <input type='number' id="quantity" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})} />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input type='number' id="price" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} />
            </div>
            {/* Add input fields for other product details */}
            
            <button type='submit'>Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;
