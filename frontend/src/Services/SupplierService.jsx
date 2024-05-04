import axios from "axios"
import {toast} from "react-hot-toast"
const BACKEND_URL = "http://localhost:8000"


export const GetAllSupplier = async () =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/supplier`)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


export const deleteSupplier = async (sid) =>{
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/supplier/${sid}`)
        return response.message
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}

export const validateEmail = (Email) =>{
    return Email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}



export const SupplieRegister= async(userData) =>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/supplier`, userData)
        console.log(userData);
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


export const getSupplierById = async (supplierid) =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/supplier/${supplierid}`)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


export const UpdateDetailsSupplier = async (formdata,supplierid) =>{
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/supplier/${supplierid}`,formdata)
        // if(response.statusText ==="OK"){
        //     toast.success("Registration successfuly!...")    
        // }

        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}



