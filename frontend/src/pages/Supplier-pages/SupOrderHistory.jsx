import React, { useEffect, useState } from 'react';
import SupplierNavBar from '../../component/SupplierNavBar/SupplierNavBar';
import toast from 'react-hot-toast';
import { GetConformOrders } from '../../Services/SupplieOrderService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SupOrderHistory = () => {
    const [orderData, setOrderData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function getOrderData() {
            try {
                const data = await GetConformOrders();
                setOrderData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching order data:', error);
                toast.error('Failed to fetch order data. Please try again later.');
            }
        }
        getOrderData();
    }, []);

    const filteredOrders = orderData
        ? orderData.filter(
              (record) =>
                  record.SupplierID.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  record.SupplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  record.ProductId.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    const generateOrderReport = () => {
        const doc = new jsPDF();
        const tableData = filteredOrders.map((record) => [
            record._id,
            new Date(record.OrderDate).toLocaleDateString(),
            record.SupplierID,
            record.ProductName,
            record.ProductId,
            record.OrderQuantity,
            `Rs.${record.Amount}/=`
        ]);
        doc.autoTable({
            head: [
                ['Order ID', 'Date', 'Supplier ID', 'Product', 'PID', 'Quantity', 'Amount']
            ],
            body: tableData,
        });
        doc.save('order_report.pdf');
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
                        placeholder="Search Supplier"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <button onClick={generateOrderReport} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Generate Order Report
                    </button>
                </div>

                <div className="justify-center relative overflow-x-auto shadow-md sm:rounded-lg bg-green-100">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Supplier ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    PID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((record) => (
                                    <tr
                                        key={record._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {record._id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(record.OrderDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">{record.SupplierID}</td>
                                        <td className="px-6 py-4">{record.ProductName}</td>
                                        <td className="px-6 py-4">{record.ProductId}</td>
                                        <td className="px-6 py-4">{record.OrderQuantity}</td>
                                        <td className="px-6 py-4">Rs.{record.Amount}/=</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No matching orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SupOrderHistory;



