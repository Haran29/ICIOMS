import React, { useEffect, useState } from 'react';
import SupplierNavBar from '../../component/SupplierNavBar/SupplierNavBar';
import { GetAllSupplier } from '../../Services/SupplierService';
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
    const [supplier, setSupplier] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function getUserData() {
            const data = await GetAllSupplier();
            setSupplier(data);
        }
        getUserData();
    }, []);

    const filteredUsers = supplier
        ? supplier.filter(
              (record) =>
                  record.SupplierID.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  record.SupplierName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    // const placeSupplierOrder = async () => {
    //     try {
    //         await OrderPlace(formData, sid);
    //         setFormData({ OrderQuantity: '' }); // Clear form after successful order placement
    //         setSid(''); // Clear supplier ID after successful order placement
    //         toast.success('Order placed successfully!');
    //     } catch (error) {
    //         toast.error('Failed to place order.');
    //     }
    // };

    // const handleFormSubmit = (e, recordId) => {
    //     e.preventDefault(); // Prevent default form submission
    //     setSid(recordId); // Set sid to the current record id
    //     placeSupplierOrder();
    // };

    return (
        <div>
            <div>
                <SupplierNavBar />
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search User"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="justify-center relative overflow-x-auto shadow-md sm:rounded-lg bg-green-100">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    PID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    SID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Max Supply
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((record) => (
                                    <tr
                                        key={record._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {record.ProductId}
                                        </td>
                                        <td className="px-6 py-4">{record.SupplierID}</td>
                                        <td className="px-6 py-4">{record.ProductName}</td>
                                        <td className="px-6 py-4">{record.MaxSupply}</td>
                                        <td className="px-6 py-4">
                                            <button><Link to={`/choose-place-order/${record._id}`}>Order</Link></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No matching users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
