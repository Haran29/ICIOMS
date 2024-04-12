import React from "react";
import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  IntensityBar,
  AromaBar,
  SweetnessBar,
  AftertasteBar,
  ConsistencyBar,
  AppearenceBar,
  MeltingBar,
  PackageQualityBar,
  OverallScore,
} from "../component/RangeBar";
import { useNavigate } from "react-router-dom";
import Image from "../assets/BackgroundMain4.jpg";
import {
  handleBatchIDChange,
  handleBatchIDBlur,
  handleBatchNameChange,
  handleBatchNameBlur,
} from "../component/ErrorHandler";

export default function CreateBatch() {
  const [batchID, setBatchID] = useState("");
  const [batchName, setBatchName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [receivedDate, setReceivedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [intensity, setintensity] = useState(0);
  const [aroma, setaroma] = useState(0);
  const [sweetness, setsweetness] = useState(0);
  const [aftertaste, setaftertaste] = useState(0);
  const [consistency, setconsistency] = useState(0);
  const [appearence, setappearence] = useState(0);
  const [packageQuality, setpackageQuality] = useState(0);
  const [melting, setmelting] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const inputRefs = Array.from({ length: 8 }).map(() => useRef(null));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      if (quantity === 0) {
        toast.error("Quantity cannot be 0");
        return; // Exit the function if quantity is 0
      }

      const currentDate = new Date().toISOString().split("T")[0];
      if (receivedDate > currentDate) {
        toast.error("Received date cannot be greater than the current date");
        return; // Exit the function if received date is greater than current date
      }

      const SubmissionResponse = await axios.post(
        "http://localhost:8000/api/products/create-batch",
        {
          batchID,
          batchName,
          quantity,
          receivedDate,
          intensity,
          aroma,
          sweetness,
          aftertaste,
          consistency,
          appearence,
          packageQuality,
          melting,
          overallScore,
        }
      );

      navigate("/view-batch");

      console.log(SubmissionResponse.data); // Handle response from backend
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Batch ID already exists, show toast message
        toast.error("Batch ID already exists");
      } else {
        // Other errors, log to console
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/qm-home"); // Navigate to a different page on cancel
  };

  useEffect(() => {
    const calculateOverallScore = () => {
      return (
        intensity +
        aroma +
        sweetness +
        aftertaste +
        consistency +
        appearence +
        packageQuality +
        melting
      );
    };

    // Update the overall score whenever any of the individual scores change
    const newOverallScore = calculateOverallScore();
    setOverallScore(newOverallScore);
  }, [
    intensity,
    aroma,
    sweetness,
    aftertaste,
    consistency,
    appearence,
    packageQuality,
    melting,
  ]);

  return (
    <div
      className="container max-w-full max-h-full"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="w-full md:w-11/12 lg:w-5/6 xl:w-2/3 relative">
          <div className="bg-blue-50 opacity-95 rounded-lg p-8 border-blue-300 border-4">
            <h1 className="text-center text-3xl font-bold mb-4">
              New Batch Form
            </h1>
            <hr className="border-slate-500 border-t-2 mx-auto w-4/5 mt-2" />

            <ToastContainer />

            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                opacity: 0;
              }
            `}</style>

            <form onSubmit={handleSubmit}>
              <div className="flex mb-4">
                <div className="w-1/3 pr-2 mt-6">
                  <label htmlFor="batchID" className="block mb-1 font-semibold">
                    Batch ID
                  </label>
                  <input
                    type="text"
                    id="batchID"
                    name="batchID"
                    value={batchID}
                    onChange={(e) => handleBatchIDChange(e, setBatchID, toast)}
                    onBlur={(e) => handleBatchIDBlur(e, toast)}
                    className="w-full border border-gray-300 rounded px-3 py-1 mb-2"
                  />
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Intensity of Flavor
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={intensity}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) => setintensity(Number(e.target.value))}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[0]}
                      />
                      <IntensityBar
                        intensity={intensity}
                        setintensity={setintensity}
                        inputRef={inputRefs[0]}
                      />
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Aroma Strength
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={aroma}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) => setaroma(Number(e.target.value))}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[1]}
                      />
                      <AromaBar
                        aroma={aroma}
                        setaroma={setaroma}
                        inputRef={inputRefs[1]}
                      />
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Balance of Sweetness
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={sweetness}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) => setsweetness(Number(e.target.value))}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[2]}
                      />
                      <SweetnessBar
                        sweetness={sweetness}
                        setsweetness={setsweetness}
                        inputRef={inputRefs[2]}
                      />
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Aftertaste
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={aftertaste}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) => setaftertaste(Number(e.target.value))}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[3]}
                      />
                      <AftertasteBar
                        aftertaste={aftertaste}
                        setaftertaste={setaftertaste}
                        inputRef={inputRefs[3]}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/3 px-2 mt-6 font-semibold">
                  <label htmlFor="batchName" className="block mb-1">
                    Batch Name
                  </label>
                  <input
                    type="text"
                    id="batchName"
                    name="batchName"
                    value={batchName}
                    onChange={(e) => handleBatchNameChange(e, setBatchName)}
                    onBlur={(e) => handleBatchNameBlur(e, toast)}
                    className="w-full border border-gray-300 rounded px-3 py-1 mb-2"
                  />
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Consistency and Texture
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={consistency}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) => setconsistency(Number(e.target.value))}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[4]}
                      />
                      <ConsistencyBar
                        consistency={consistency}
                        setconsistency={setconsistency}
                        inputRef={inputRefs[4]}
                      />
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Appearence
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={appearence}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) => setappearence(Number(e.target.value))}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[5]}
                      />
                      <AppearenceBar
                        appearence={appearence}
                        setappearence={setappearence}
                        inputRef={inputRefs[5]}
                      />
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Package Quality
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={packageQuality}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) =>
                          setpackageQuality(Number(e.target.value))
                        }
                        style={{ zIndex: 2 }}
                        ref={inputRefs[6]}
                      />
                      <PackageQualityBar
                        packageQuality={packageQuality}
                        setpackageQuality={setpackageQuality}
                        inputRef={inputRefs[6]}
                      />
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Resistance to Melting
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={melting}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={(e) => setmelting(Number(e.target.value))}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[7]}
                      />
                      <MeltingBar
                        melting={melting}
                        setmelting={setmelting}
                        inputRef={inputRefs[7]}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/3 pl-2 mt-6 font-semibold">
                  <label
                    htmlFor="receivedDate"
                    className="block mb-1 font-semibold"
                  >
                    Received Date
                  </label>
                  <input
                    type="date"
                    id="receivedDate"
                    name="receivedDate"
                    value={receivedDate}
                    onChange={(e) => setReceivedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1 mb-2"
                  />

                  <label
                    htmlFor="quantity"
                    className="block mb-1 font-semibold"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1 mb-2"
                  />

                  <div style={{ position: "relative" }}>
                    <label
                      htmlFor="overallScore"
                      className="block mb-1 font-semibold"
                    >
                      Overall Score
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        id="overallScore"
                        name="overallScore"
                        min="0"
                        max="80"
                        step="1"
                        value={overallScore}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        readOnly
                        style={{ zIndex: 2 }}
                      />
                      <OverallScore overallScore={overallScore} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 active:opacity-80 text-white font-bold py-2 px-4 rounded w-full mt-8"
                  >
                    Submit QC Form
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-slate-500 hover:bg-slate-600 active:opacity-80 text-white font-bold py-2 px-4 rounded w-full mt-8"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
