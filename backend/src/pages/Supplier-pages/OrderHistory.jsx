import React, { useEffect, useState } from 'react'
import SupplierNavBar from '../../component/SupplierNavBar/SupplierNavBar';
import toast from 'react-hot-toast';
import { GetConformOrders } from '../../Services/SupplieOrderService';

const OrderHistory = () => {
    const [orderData,setOrderData] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function getOrderData() {
          const data = await GetConformOrders();
          setOrderData(data);
          console.log(data)
        }
        getOrderData();
      }, []);

      const filteredUsers = orderData
      ? orderData.filter(
          (record) =>
          record.SupplierID.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.SupplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.ProductId.toLowerCase().includes(searchQuery.toLowerCase())  

            
        )
      : [];


  return (
    <div>
        <div><SupplierNavBar/></div>

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

            <div className="justify-center relative overflow-x-auto shadow-md sm:rounded-lg bg-green-100"> {/* Add bg-green-100 for light green background */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Supplier ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" class="px-6 py-3">
                                PID
                            </th>
                            <th scope="col" class="px-6 py-3">
                               Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                               Amount
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.length > 0 ? (
                            filteredUsers.map((record) => (
                        <tr key={record._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {record._id}
                            </th>
                            <td class="px-6 py-4">
                            {record.OrderDate}
                                
                            </td>
                            <td class="px-6 py-4">
                            {record.SupplierID}
                            
                            </td>
                            <td class="px-6 py-4">
                            {record.ProductName}     
                            </td>

                            <td class="px-6 py-4">
                            {record.ProductId}     
                             
                            </td>

                            <td class="px-6 py-4">
                            {record.OrderQuantity}     

                            </td>

                            <td class="px-6 py-4">
                            Rs.{record.Amount}/=
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
  )
}

export default OrderHistory