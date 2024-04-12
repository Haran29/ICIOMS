import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
} from "../component/UpdateRangeBar";
import Image from "../assets/BackgroundMain3.jpg";

export default function UpdateBatch() {
  const { batchID } = useParams();
  const navigate = useNavigate();
  const inputRefs = Array.from({ length: 8 }).map(() => useRef(null));

  const [intensity, setintensity] = useState(0);
  const [aroma, setaroma] = useState(0);
  const [sweetness, setsweetness] = useState(0);
  const [aftertaste, setaftertaste] = useState(0);
  const [consistency, setconsistency] = useState(0);
  const [appearence, setappearence] = useState(0);
  const [packageQuality, setpackageQuality] = useState(0);
  const [melting, setmelting] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  const [batchDetails, setBatchDetails] = useState({
    batchID: "",
    batchName: "",
    receivedDate: "",
    quantity: 0,
    intensity: 0,
    aroma: 0,
    sweetness: 0,
    aftertaste: 0,
    consistency: 0,
    appearence: 0,
    packageQuality: 0,
    melting: 0,
    overallScore: 0,
  });

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/view-batch/${batchID}`
        );
        setBatchDetails(response.data);
      } catch (error) {
        console.error("Error fetching batch details:", error);
      }
    };

    fetchBatchDetails();
  }, [batchID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOverallScore = calculateOverallScore();

      let status = "";

      if (newOverallScore >= 64) {
        status = "Approved";
      } else {
        status = "Rejected";
      }

      const updatedBatchDetails = {
        ...batchDetails,
        overallScore: newOverallScore,
        status: status,
      };

      const response = await axios.put(
        `http://localhost:8000/api/products/update-batch/${batchID}`,

        updatedBatchDetails
      );
      console.log("Batch updated:", response.data);
      navigate("/view-batch");
    } catch (error) {
      console.error("Error updating batch:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchDetails({ ...batchDetails, [name]: value });
  };

  const calculateOverallScore = () => {
    const sum =
      parseInt(batchDetails.intensity) +
      parseInt(batchDetails.aroma) +
      parseInt(batchDetails.sweetness) +
      parseInt(batchDetails.aftertaste) +
      parseInt(batchDetails.consistency) +
      parseInt(batchDetails.appearence) +
      parseInt(batchDetails.packageQuality) +
      parseInt(batchDetails.melting);
    return sum;
  };

  useEffect(() => {
    // Update the overall score whenever any of the individual scores change
    const newOverallScore = calculateOverallScore();
    setOverallScore(newOverallScore);
  }, [
    batchDetails.intensity,
    batchDetails.aroma,
    batchDetails.sweetness,
    batchDetails.aftertaste,
    batchDetails.consistency,
    batchDetails.appearence,
    batchDetails.packageQuality,
    batchDetails.melting,
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
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                opacity: 0;
              }
            `}</style>
            <h1 className="text-center text-3xl font-bold mb-4">
              Update Batch Form
            </h1>
            <hr className="border-slate-500 border-t-2 mx-auto w-4/5 mt-2" />

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
                    value={batchDetails.batchID}
                    className="w-full border border-gray-300 rounded px-3 py-1 mb-2"
                  />
                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Intensity of Flavor
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        name="intensity"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.intensity}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[0]}
                      />
                      <IntensityBar
                        intensity={batchDetails.intensity}
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
                        name="aroma"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.aroma}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[1]}
                      />
                      <AromaBar
                        aroma={batchDetails.aroma}
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
                        name="sweetness"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.sweetness}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[2]}
                      />
                      <SweetnessBar
                        sweetness={batchDetails.sweetness}
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
                        name="aftertaste"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.aftertaste}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[3]}
                      />
                      <AftertasteBar
                        aftertaste={batchDetails.aftertaste}
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
                    value={batchDetails.batchName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-1 mb-2"
                  />

                  <div style={{ position: "relative" }}>
                    <label className="block mb-1 m-2 font-semibold">
                      Consistency and Texture
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="range"
                        name="consistency"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.consistency}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[4]}
                      />
                      <ConsistencyBar
                        consistency={batchDetails.consistency}
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
                        name="appearence"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.appearence}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[5]}
                      />
                      <AppearenceBar
                        appearence={batchDetails.appearence}
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
                        name="packageQuality"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.packageQuality}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[6]}
                      />
                      <PackageQualityBar
                        packageQuality={batchDetails.packageQuality}
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
                        name="melting"
                        min="0"
                        max="10"
                        step="1"
                        value={batchDetails.melting}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        onChange={handleChange}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[7]}
                      />
                      <MeltingBar
                        melting={batchDetails.melting}
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
                    value={batchDetails.receivedDate}
                    onChange={handleChange}
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
                    value={batchDetails.quantity}
                    onChange={handleChange}
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
                        value={batchDetails.overallScore}
                        className={`w-full mb-2 appearance-none h-4 rounded-full bg-gray-400 border border-gray-400`}
                        readOnly
                        style={{ zIndex: 2 }}
                      />
                      <OverallScore overallScore={overallScore} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 active:opacity-80 text-white font-bold py-0 px-4 rounded w-full h-9 mt-8"
                  >
                    Update Batch
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/view-batch")}
                    className="bg-slate-500 hover:bg-slate-600 active:opacity-80 text-white font-bold py-0 px-4 rounded w-full h-9 mt-4"
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
