import axios from "axios"
import {toast} from "react-hot-toast"
const BACKEND_URL = "http://localhost:8000"


export const OrderPlace = async (formData,supplierid) =>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/supplier-order/${supplierid}`,formData)
        if(response.statusText ==="OK"){
            toast.success("Place Order successfuly!...")    
        }

        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}

export const GetOngoingOrders = async () =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/supplier-order/ongoing-order`)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


export const OngoinOrderConform = async (supplierid) =>{
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/supplier-order/${supplierid}`)
        if(response.statusText ==="OK"){
            toast.success("Registration successfuly!...")    
        }

        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


export const GetConformOrders = async () =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/supplier-order/conformed-order`)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}

