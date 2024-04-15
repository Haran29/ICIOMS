import React from 'react'
import axios from "axios";

const HomePage = () => {
  const handleClick = async()=>{
    console.log("Called")
   await  axios.get("/test")
  }
  return (
    <>
     <div>HomePage</div>
    <button onClick={handleClick}>button</button>
    </>
   
  )
}

export default HomePage