import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateDetailsSupplier, getSupplierById, validateEmail } from '../../Services/SupplierService'
import SupplierNavBar from '../../component/SupplierNavBar/SupplierNavBar'


const UpdateSupplier = () => {
    const { supplierid } = useParams();

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
    const navigate = useNavigate()

    const {
        SupplierName, 
        SupplierID, 
        SupplierEmail, 
        SupplierContact, 
        ProductName, 
        ProductId, 
        SupplierProductPrice, 
        MaxSupply
    } = formData

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
        setformData({...formData,[name]:value})
    }
      const updateSupplierDetails = async(e) =>{
        e.preventDefault()
        
        //validation
        if(!SupplierName || !SupplierID || !SupplierEmail || !SupplierContact || !ProductName || !ProductId || !SupplierProductPrice || !MaxSupply){
          return toast.error("All Fild must be fill")
        }
        if(!validateEmail(SupplierEmail)){
          return toast.error("Enter valid email")
        }
        
    
        try{
          const data = await UpdateDetailsSupplier(formData,supplierid)
          if(data){
            toast.success("User Update Successful")
          navigate("/list-suplier")
          }
    
    
        }catch(error){
          toast.error(error.message)
    
        }
      }


  return (
    <div>
        <div><SupplierNavBar/></div>
        <div>
            

            <form onSubmit={updateSupplierDetails} class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="SupplierName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Supplier name</label>
                <input type="text" id="SupplierName" name='SupplierName' value={formData.SupplierName} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div class="mb-5">
                <label for="SupplierID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Supplier ID</label>
                <input type="text" id="SupplierID" name='SupplierID' value={formData.SupplierID} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required readOnly/>
            </div>

            <div class="mb-5">
                <label for="SupplierEmail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Supplier email</label>
                <input type="email" id="SupplierEmail" name='SupplierEmail' value={formData.SupplierEmail} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div class="mb-5">
                <label for="SupplierContact" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Supplier contact</label>
                <input type="number" id="SupplierContact" name='SupplierContact' value={formData.SupplierContact} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div class="mb-5">
                <label for="ProductName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Product name</label>
                <input type="text" id="ProductName" name='ProductName' value={formData.ProductName} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div class="mb-5">
                <label for="ProductId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Product ID</label>
                <input type="text" id="ProductId" name='ProductId' value={formData.ProductId} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div class="mb-5">
                <label for="SupplierProductPrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Product Price</label>
                <input type="number" id="SupplierProductPrice" name='SupplierProductPrice' value={formData.SupplierProductPrice} min={0} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div class="mb-5">
                <label for="MaxSupply" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Max Supply</label>
                <input type="text" id="MaxSupply" name='MaxSupply' value={formData.MaxSupply} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>



            
            <button type="submit" class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Update</button>
            </form>

        </div>
    </div>
  )
}

export default UpdateSupplier