import React, { useState, useEffect, useRef } from "react";

//Creating Visual Objects that move along the Range for better UI and UX (For update component)

//Object created for Intensity Range Component

export function IntensityBar({
  batchDetails,
  setBatchDetails,
  inputRefs,
  setintensity,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.intensity / 10) * 100}%`,
        backgroundColor: `${batchDetails.intensity >= 8 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newIntensity = Math.round((clickPosition / rangeWidth) * 10);
        setintensity(newIntensity); // Ensure setintensity is used correctly here
        setBatchDetails({
          ...batchDetails,
          intensity: newIntensity,
        });
        // Add null check to prevent accessing current property of undefined ref
        if (inputRefs[0]?.current) {
          inputRefs[0].current.focus(); // Set focus back to the range input
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.intensity}</span>
    </div>
  );
}

//Object created for Aroma Range Component

export function AromaBar({
  batchDetails,
  setBatchDetails,
  setaroma,
  inputRefs,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.aroma / 10) * 100}%`,
        backgroundColor: `${batchDetails.aroma >= 8 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newAroma = Math.round((clickPosition / rangeWidth) * 10);
        setaroma(newAroma);

        setBatchDetails({
          ...batchDetails,
          aroma: newAroma,
        });

        if (inputRefs[1]?.current) {
          inputRefs[1].current.focus(); // Set focus back to the range input
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.aroma}</span>
    </div>
  );
}

//Object created for Sweetness Range Component

export function SweetnessBar({
  batchDetails,
  setBatchDetails,
  setsweetness,
  inputRefs,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.sweetness / 10) * 100}%`,
        backgroundColor: `${batchDetails.sweetness >= 8 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newSweetness = Math.round((clickPosition / rangeWidth) * 10);
        setsweetness(newSweetness);
        setBatchDetails({
          ...batchDetails,
          sweetness: newSweetness,
        });
        // Add null check to prevent accessing current property of undefined ref
        if (inputRefs[2]?.current) {
          inputRefs[2].current.focus(); // Set focus back to the range input
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.sweetness}</span>
    </div>
  );
}

//Object created for AfterTaste Range Component

export function AftertasteBar({
  batchDetails,
  setBatchDetails,
  setaftertaste,
  inputRefs,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.aftertaste / 10) * 100}%`,
        backgroundColor: `${batchDetails.aftertaste >= 8 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newaftertaste = Math.round((clickPosition / rangeWidth) * 10);
        setaftertaste(newaftertaste);
        setBatchDetails({
          ...batchDetails,
          aftertaste: newaftertaste,
        });
        // Add null check to prevent accessing current property of undefined ref
        if (inputRefs[3]?.current) {
          inputRefs[3].current.focus(); // Set focus back to the range input
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.aftertaste}</span>
    </div>
  );
}

//Object created for Consistency Range Component

export function ConsistencyBar({
  batchDetails,
  setBatchDetails,
  setconsistency,
  inputRefs,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.consistency / 10) * 100}%`,
        backgroundColor: `${batchDetails.consistency >= 8 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newConsistency = Math.round((clickPosition / rangeWidth) * 10);
        setconsistency(newConsistency);
        setBatchDetails({
          ...batchDetails,
          consistency: newConsistency,
        });

        if (inputRefs[4]?.current) {
          inputRefs[4].current.focus();
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.consistency}</span>
    </div>
  );
}

//Object created for Appearence Range Component

export function AppearenceBar({
  batchDetails,
  setBatchDetails,
  setappearence,
  inputRefs,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.appearence / 10) * 100}%`,
        backgroundColor: `${batchDetails.appearence >= 8 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newappearence = Math.round((clickPosition / rangeWidth) * 10);
        setappearence(newappearence);
        setBatchDetails({
          ...batchDetails,
          appearence: newappearence,
        });
        // Add null check to prevent accessing current property of undefined ref
        if (inputRefs[5]?.current) {
          inputRefs[5].current.focus(); // Set focus back to the range input
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.appearence}</span>
    </div>
  );
}

//Object created for PackageQuality Range Component

export function PackageQualityBar({
  batchDetails,
  setBatchDetails,
  setpackageQuality,
  inputRefs,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.packageQuality / 10) * 100}%`,
        backgroundColor: `${
          batchDetails.packageQuality >= 8 ? "green" : "red"
        }`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newpackageQuality = Math.round((clickPosition / rangeWidth) * 10);
        setpackageQuality(newpackageQuality);
        setBatchDetails({
          ...batchDetails,
          packageQuality: newpackageQuality,
        });
        // Add null check to prevent accessing current property of undefined ref
        if (inputRefs[6]?.current) {
          inputRefs[6].current.focus(); // Set focus back to the range input
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.packageQuality}</span>
    </div>
  );
}

//Object created for Melting Range Component

export function MeltingBar({
  batchDetails,
  setBatchDetails,
  setmelting,
  inputRefs,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(batchDetails.melting / 10) * 100}%`,
        backgroundColor: `${batchDetails.melting >= 8 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        const clickPosition = e.clientX - e.target.getBoundingClientRect().left;
        const rangeWidth = e.target.offsetWidth;
        const newmelting = Math.round((clickPosition / rangeWidth) * 10);
        setmelting(newmelting);
        setBatchDetails({
          ...batchDetails,
          melting: newmelting,
        });
        // Add null check to prevent accessing current property of undefined ref
        if (inputRefs[7]?.current) {
          inputRefs[7].current.focus(); // Set focus back to the range input
        }
      }}
    >
      <span style={{ color: "white" }}>{batchDetails.melting}</span>
    </div>
  );
}

//Object created for Overall Score Range Component

export function OverallScore({ overallScore }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(overallScore / 80) * 100}%`,
        backgroundColor: `${overallScore >= 64 ? "green" : "red"}`,
        border: "1px solid black",
        borderRadius: "999px",
        zIndex: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ color: "white" }}>{overallScore}</span>
    </div>
  );
}
