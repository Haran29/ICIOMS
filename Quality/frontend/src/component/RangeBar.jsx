import React from "react";

//Creating Visual Objects that move along the Range for better UI and UX

//Object created for Intensity Range Component

export function IntensityBar({ intensity, setintensity, inputRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(intensity / 10) * 100}%`,
        backgroundColor: `${intensity >= 8 ? "green" : "red"}`,
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
        setintensity(newIntensity);
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{intensity}</span>
    </div>
  );
}

//Object created for Aroma Range Component

export function AromaBar({ aroma, setaroma, inputRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(aroma / 10) * 100}%`,
        backgroundColor: `${aroma >= 8 ? "green" : "red"}`,
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
        const newaroma = Math.round((clickPosition / rangeWidth) * 10);
        setaroma(newaroma);
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{aroma}</span>
    </div>
  );
}

//Object created for Sweetness Range Component

export function SweetnessBar({ sweetness, setsweetness, inputRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(sweetness / 10) * 100}%`,
        backgroundColor: `${sweetness >= 8 ? "green" : "red"}`,
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
        const newsweetness = Math.round((clickPosition / rangeWidth) * 10);
        setsweetness(newsweetness);
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{sweetness}</span>
    </div>
  );
}

//Object created for AfterTaste Range Component

export function AftertasteBar({ aftertaste, setaftertaste, inputRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(aftertaste / 10) * 100}%`,
        backgroundColor: `${aftertaste >= 8 ? "green" : "red"}`,
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
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{aftertaste}</span>
    </div>
  );
}

//Object created for Consistency Range Component

export function ConsistencyBar({ consistency, setconsistency, inputRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(consistency / 10) * 100}%`,
        backgroundColor: `${consistency >= 8 ? "green" : "red"}`,
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
        const newconsistency = Math.round((clickPosition / rangeWidth) * 10);
        setconsistency(newconsistency);
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{consistency}</span>
    </div>
  );
}

//Object created for Appearence Range Component

export function AppearenceBar({ appearence, setappearence, inputRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(appearence / 10) * 100}%`,
        backgroundColor: `${appearence >= 8 ? "green" : "red"}`,
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
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{appearence}</span>
    </div>
  );
}

//Object created for PackageQuality Range Component

export function PackageQualityBar({
  packageQuality,
  setpackageQuality,
  inputRef,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(packageQuality / 10) * 100}%`,
        backgroundColor: `${packageQuality >= 8 ? "green" : "red"}`,
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
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{packageQuality}</span>
    </div>
  );
}

//Object created for Melting Range Component

export function MeltingBar({ melting, setmelting, inputRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1px",
        left: "0",
        height: "16px",
        width: `${(melting / 10) * 100}%`,
        backgroundColor: `${melting >= 8 ? "green" : "red"}`,
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
        inputRef.current.focus(); // Set focus back to the range input
      }}
    >
      <span style={{ color: "white" }}>{melting}</span>
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
