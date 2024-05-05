import React, { useEffect, useState } from 'react';
import SupplierNavBar from '../../component/SupplierNavBar/SupplierNavBar';
import { GetAllSupplier, deleteSupplier } from '../../Services/SupplierService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SuplierList = () => {
    const [supplier, setSupplier] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function getUserData() {
            const data = await GetAllSupplier();
            setSupplier(data);
            console.log(data);
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

    const deleteSupplierbtn = async (sid) => {
        try {
            await deleteSupplier(sid);
            toast.success('Successfully Supplier deleted!');
            setSupplier(supplier.filter((record) => record._id !== sid));
        } catch (error) {
            console.error('Error deleting supplier:', error);
            toast.error('Error deleting supplier');
        }
    };

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
                    <button className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <Link to={'/add-supplier'}>Create</Link>
                    </button>
                </div>

                <div className="justify-center relative overflow-x-auto shadow-md sm:rounded-lg bg-green-100">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-green-100">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    SID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Contact Number
                                </th>
                                <th scope="col" className="px-6 py-3 text-right"> {/* Align to the right */}
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
                                            {record.SupplierID}
                                        </td>
                                        <td className="px-6 py-4">{record.ProductName}</td>
                                        <td className="px-6 py-4">{record.SupplierName}</td>
                                        <td className="px-6 py-4">{record.SupplierContact}</td>
                                        <td className="px-6 py-4 text-right"> {/* Align to the right */}
                                            <button>
                                                <Link to={`/update-supplier/${record._id}`}>Edit</Link>
                                            </button>
                                            <button style={{marginLeft:"20px"}}
                                                onClick={() => deleteSupplierbtn(record._id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Delete
                                            </button>
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

export default SuplierList;
