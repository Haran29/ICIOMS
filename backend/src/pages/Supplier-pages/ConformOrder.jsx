import React, { useEffect, useState } from 'react'
import { getSupplierById } from '../../Services/SupplierService';
import SupplierNavBar from '../../component/SupplierNavBar/SupplierNavBar';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderPlace } from '../../Services/SupplieOrderService';

const ConformOrder = () => {
    const { supplierid } = useParams();
    const navigate = useNavigate()
    const [qtyData,setQtyData] = useState({
        OrderQuantity:''
    })

    const {OrderQuantity}  = qtyData

    const [formData, setformData] = useState({
        SupplierName:'', 
        SupplierID:'', 
        SupplierEmail:'', 
        SupplierContact:'', 
        ProductName:'', 
        ProductId:'', 
        SupplierProductPrice:'', 
        SupplierOrderStatus:'', 
        MaxSupply:''
    })

    useEffect(() => {
        async function getSupplier() {
          const data = await getSupplierById(supplierid);
          setformData(data);
          console.log(data)
        }
        getSupplier();
      }, []);

    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setQtyData({...qtyData,[name]:value})
    }

    const  orderConform = async (e) =>{
        e.preventDefault()
        
        try{
            const data = OrderPlace(qtyData,supplierid);
            if(data){
                navigate("/ongoing-order")
            }

        }catch(error){
          toast.error(error.message)
    
        }
    }
    


  return (
    <div>
        <div><SupplierNavBar /></div>
        <div className="flex justify-center items-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={orderConform}>

                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Place Order</h5>
                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:  </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.SupplierName}</p> 
                </div>

                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID:  </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.SupplierID}</p> 
                </div>

                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:  </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.SupplierEmail}</p> 
                </div>

                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact number:  </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.SupplierContact}</p> 
                </div>

                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product:  </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.ProductName}</p> 
                </div>

                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ProductId:  </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.ProductId}</p> 
                </div>

                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price: Rs. </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.SupplierProductPrice}/=</p> 
                </div>

                <div className="flex items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Supplie:  </label>
                    <p className="lock ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">{formData.MaxSupply}</p> 
                </div>
                
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Quantity</label>
                    <input type="number" name="OrderQuantity" value={OrderQuantity} onChange={handleInputChange} placeholder="quantity" min={0} max={formData.MaxSupply} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Conform Order</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ConformOrder