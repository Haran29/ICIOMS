import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SupplieRegister, validateEmail } from '../../Services/SupplierService';
import SupplierNavBar from '../../component/SupplierNavBar/SupplierNavBar';

const AddSupplier = () => {
    const [formData, setformData] = useState({
        SupplierName: '', 
        SupplierID: '', 
        SupplierEmail: '', 
        SupplierContact: '', 
        ProductName: '', 
        ProductId: '', 
        SupplierProductPrice: '', 
        SupplierOrderStatus: '', 
        MaxSupply: ''
    });
    const navigate = useNavigate();

    const {
        SupplierName, 
        SupplierID, 
        SupplierEmail, 
        SupplierContact, 
        ProductName, 
        ProductId, 
        SupplierProductPrice, 
        MaxSupply
    } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const register = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!SupplierName || !SupplierID || !SupplierEmail || !SupplierContact || !ProductName || !ProductId || !SupplierProductPrice || !MaxSupply) {
            return toast.error("All fields must be filled");
        }
        if (!validateEmail(SupplierEmail)) {
            return toast.error("Enter a valid email");
        }


        

        
        try {
            const data = await SupplieRegister(formData);
            if (data) {
                toast.success("User Registration Successful");
                navigate("/add-supplier");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <div><SupplierNavBar/></div>
            <div>
                <form onSubmit={register} className="max-w-sm mx-auto bg-green-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="SupplierName" className="block text-gray-700 text-sm font-bold mb-2">Supplier name</label>
                        <input type="text" id="SupplierName" name='SupplierName' value={SupplierName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="SupplierID" className="block text-gray-700 text-sm font-bold mb-2">Supplier ID</label>
                        <input type="text" id="SupplierID" name='SupplierID' value={SupplierID} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="SupplierEmail" className="block text-gray-700 text-sm font-bold mb-2">Supplier email</label>
                        <input type="email" id="SupplierEmail" name='SupplierEmail' value={SupplierEmail} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="SupplierContact" className="block text-gray-700 text-sm font-bold mb-2">Supplier contact</label>
                        <input type="number" id="SupplierContact" name='SupplierContact' value={SupplierContact} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ProductName" className="block text-gray-700 text-sm font-bold mb-2">Product name</label>
                        <input type="text" id="ProductName" name='ProductName' value={ProductName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ProductId" className="block text-gray-700 text-sm font-bold mb-2">Product ID</label>
                        <input type="text" id="ProductId" name='ProductId' value={ProductId} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="SupplierProductPrice" className="block text-gray-700 text-sm font-bold mb-2">Product Price</label>
                        <input type="number" id="SupplierProductPrice" name='SupplierProductPrice' value={SupplierProductPrice} min={0} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="MaxSupply" className="block text-gray-700 text-sm font-bold mb-2">Max Supply</label>
                        <input type="text" id="MaxSupply" name='MaxSupply' value={MaxSupply} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                </form>
            </div>
        </div>
    )
}

export default AddSupplier;
