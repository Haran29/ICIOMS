import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import QMNavBar from "../component/QMNavBar"
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

//Creating Page for Update Batch Function

export default function UpdateBatch() {
  //Setting States and default values

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

  const [response, setResponse] = useState(null);

  //Getting Batch Details

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/view-batch/${batchID}`
        );
        setResponse(response.data);
      } catch (error) {
        console.error("Error fetching batch details:", error);
      }
    };

    fetchBatchDetails();
  }, [batchID]);

  useEffect(() => {
    // Updating batchDetails whenever response changes
    if (response) {
      setBatchDetails(response);
      // Updating state variables with values from batchDetails
      setintensity(response.intensity);
      setaroma(response.aroma);
      setsweetness(response.sweetness);
      setaftertaste(response.aftertaste);
      setconsistency(response.consistency);
      setappearence(response.appearence);
      setpackageQuality(response.packageQuality);
      setmelting(response.melting);
    }
  }, [response]);

  //Adding Updated information to the Database

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOverallScore = calculateOverallScore();

      //Setting Status to Approved or Rejected

      let status = "";

      if (newOverallScore >= 64) {
        status = "Approved";
      } else {
        status = "Rejected";
      }

      const currentDate = new Date().toISOString().split("T")[0];
      const testReceivedDate = batchDetails.receivedDate.split("T")[0];

      // Check if the receivedDate is empty
      if (!testReceivedDate) {
        toast.error("Received date cannot be empty", {
          className: "bg-red-500 text-white font-bold mt-13",
        });
        return;
      }

      // Check if the receivedDate is greater than the current date
      if (testReceivedDate > currentDate) {
        toast.error("Received date cannot be greater than the current date", {
          className: "bg-red-500 text-white font-bold mt-13",
        });
        return;
      }

      //sending new data to the database

      const updatedBatchDetails = {
        ...batchDetails,
        overallScore: newOverallScore,
        status: status,
      };

      const response = await axios.put(
        `http://localhost:8000/api/products/update-batch/${batchID}`,

        updatedBatchDetails
      );

      //removing all error toast messaages and displaying successful toast message

      toast.remove();

      toast.success("Batch was Successfully Updated", {
        className:
          "bg-gradient-to-r from-green-300 to-green-500 text-white font-bold mt-16",
      });

      navigate("/view-batch");
    } catch (error) {
      if (error.response && error.response.status === 411) {
        // Batch Name is Blank, show toast message
        toast.error("Batch Name cannot be kept Blank", {
          className: "bg-red-500 text-white font-bold mt-13",
        });
      } else if (error.response && error.response.status === 412) {
        // Batch Quanity is Less than 0, show toast message
        toast.error("Quantity should be greater than 0", {
          className: "bg-red-500 text-white font-bold mt-13",
        });
      } else {
        // Other errors, log to console
        console.error("Error submitting form:", error);
      }
    }
  };

  //Displaying Toast message if the Batch ID is clicked (Unique, cant edit)

  const handleInputClick = () => {
    toast.error("The Batch ID Field is not editable", {
      className: "bg-red-500 text-white font-bold mt-13",
      duration: 1500,
    });
  };

  //Calculating Overall Score

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

  // Updating the overall score whenever any of the individual scores change

  useEffect(() => {
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
    <>
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
            {/*Hiding old range bar components (the dragging button)*/}
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
                    onClick={handleInputClick}
                    readOnly
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
                        onChange={(e) => {
                          const newIntensity = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            intensity: newIntensity,
                          });
                          setintensity(newIntensity);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[0]}
                      />
                      <IntensityBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        inputRefs={inputRefs[0]}
                        setintensity={setintensity}
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
                        onChange={(e) => {
                          const newAroma = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            aroma: newAroma,
                          });
                          setaroma(newAroma);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[1]}
                      />
                      <AromaBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        setaroma={setaroma}
                        inputRefs={inputRefs}
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
                        onChange={(e) => {
                          const newSweetness = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            sweetness: newSweetness,
                          });
                          setsweetness(newSweetness);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[2]}
                      />
                      <SweetnessBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        setsweetness={setsweetness}
                        inputRefs={inputRefs}
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
                        onChange={(e) => {
                          const newaftertaste = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            aftertaste: newaftertaste,
                          });
                          setaftertaste(newaftertaste);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[3]}
                      />
                      <AftertasteBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        setaftertaste={setaftertaste}
                        inputRefs={inputRefs}
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
                    onChange={(e) => {
                      const newBatchName = e.target.value;
                      const capitalizedBatchName = newBatchName
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");
                      setBatchDetails({
                        ...batchDetails,
                        batchName: capitalizedBatchName,
                      });
                    }}
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
                        onChange={(e) => {
                          const newConsistency = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            consistency: newConsistency,
                          });
                          setconsistency(newConsistency);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[4]}
                      />
                      <ConsistencyBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        setconsistency={setconsistency}
                        inputRefs={inputRefs}
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
                        onChange={(e) => {
                          const newAppearence = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            appearence: newAppearence,
                          });
                          setappearence(newAppearence);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[5]}
                      />
                      <AppearenceBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        setappearence={setappearence}
                        inputRefs={inputRefs}
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
                        onChange={(e) => {
                          const newPackageQuality = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            packageQuality: newPackageQuality,
                          });
                          setpackageQuality(newPackageQuality);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[6]}
                      />
                      <PackageQualityBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        setpackageQuality={setpackageQuality}
                        inputRefs={inputRefs}
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
                        onChange={(e) => {
                          const newMelting = e.target.value;
                          setBatchDetails({
                            ...batchDetails,
                            melting: newMelting,
                          });
                          setmelting(newMelting);
                        }}
                        style={{ zIndex: 2 }}
                        ref={inputRefs[7]}
                      />
                      <MeltingBar
                        batchDetails={batchDetails}
                        setBatchDetails={setBatchDetails}
                        setmelting={setmelting}
                        inputRefs={inputRefs}
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
                    value={batchDetails.receivedDate.split("T")[0]}
                    onChange={(e) => {
                      const newReceivedDate = e.target.value;
                      setBatchDetails({
                        ...batchDetails,
                        receivedDate: newReceivedDate,
                      });
                    }}
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
                    onChange={(e) => {
                      const newQuantity = e.target.value;
                      setBatchDetails({
                        ...batchDetails,
                        quantity: newQuantity,
                      });
                    }}
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
    </>
  );
}
