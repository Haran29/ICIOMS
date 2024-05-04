import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/BackgroundMain2.jpg";

//QM Home Page Creation
//Redirecting to different  Components usings Links

export default function QMHome() {
  return (
    <div className="container max-w-full max-h-full bg-gradient-to-br from-blue-400 to-blue-200">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full md:w-11/12 lg:w-5/6 xl:w-2/3 relative">
          <img
            src={Image}
            alt="placeholder Image"
            className="w-full h-full object-cover opacity-90 border-blue-950 border-4"
          />
          <h1 className="absolute inset-0 text-center text-white  font-bold font-serif top-6 text-3xl ">
            Quality Management
            <hr className="border-white border-t-2 mx-auto w-4/5 mt-2" />
          </h1>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Link
              to="/create-batch"
              className="w-3/6 h-10 bg-green-300 hover:bg-green-400 text-center text-black font-bold py-2 px-4 rounded mb-8 active:bg-green-600"
            >
              Create a New Batch
            </Link>
            <Link
              to="/view-batch"
              className="w-3/6 h-10 bg-green-300 hover:bg-green-400 text-center text-black font-bold py-2 px-4 rounded mb-20 active:bg-green-600"
            >
              View Quality Control Forms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
