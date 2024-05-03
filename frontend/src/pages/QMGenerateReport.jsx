import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";

export default function GenerateReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const navigate = useNavigate();

  //if  data available, calling statistical graphs

  useEffect(() => {
    if (showChart) {
      if (reportData.length > 0) {
        generateGraph();
        generateOverallScore();
        generateScoring();
      }
    }
  }, [showChart]);

  // Generating Data based on Summerized Information

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedStartDate = startDate
        ? new Date(startDate).toISOString().split("T")[0]
        : null;
      const formattedEndDate = endDate
        ? new Date(endDate).toISOString().split("T")[0]
        : null;

      const response = await axios.get(
        "http://localhost:8000/api/products/generate-report",
        {
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            status: status,
          },
        }
      );
      setReportData(response.data);
      toast.remove();
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
    setLoading(false);
  };

  //Formating the Date

  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return newDate.toLocaleDateString(undefined, options);
  };

  const generateGraph = () => {
    setShowChart(true);
    // Get counts of approved and rejected batches per day
    const counts = reportData.reduce((acc, curr) => {
      const date = formatDate(curr.receivedDate);
      acc[date] = acc[date] || { Approved: 0, Rejected: 0 };
      acc[date][curr.status]++;
      return acc;
    }, {});

    const labels = Object.keys(counts);

    // Check if labels array is not empty
    if (labels.length === 0) {
      return; // Exit early if no data is available
    }

    // Sort the labels array in ascending order
    const sortedLabels = labels.sort((a, b) => new Date(a) - new Date(b));

    const data = sortedLabels.map((date) => counts[date]);

    // Generate the graph - Line Graph

    const ctx = document.getElementById("statusChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Approved",
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: data.map((item) => item.Approved),
          },
          {
            label: "Rejected",
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: data.map((item) => item.Rejected),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  };

  //Generating Statistical Tables

  const handleGenerateStatistics = () => {
    if (reportData.length === 0) {
      toast.error("Please generate the report first", {
        className: "bg-red-500 text-white font-bold",
      });
      return;
    }
    generateGraph();
    generateOverallScore();
    generateScoring();
  };

  //Creating Bar Chart Graph

  const generateScoring = () => {
    setShowChart(true);

    // Extract data for the chart
    const batchIDs = reportData.map((item) => item.batchID);
    const intensity = reportData.map((item) => item.intensity);
    const aroma = reportData.map((item) => item.aroma);
    const sweetness = reportData.map((item) => item.sweetness);
    const aftertaste = reportData.map((item) => item.aftertaste);
    const consistency = reportData.map((item) => item.consistency);
    const appearence = reportData.map((item) => item.appearence);
    const packageQuality = reportData.map((item) => item.packageQuality);
    const melting = reportData.map((item) => item.melting);

    // Define colors for scoring categories
    const colors = [
      "rgba(0, 123, 255, 1)", // Blue
      "rgba(255, 193, 7, 1)", // Yellow
      "rgba(40, 167, 69, 1)", // Green
      "rgba(220, 53, 69, 1)", // Red
      "rgba(108, 117, 125, 1)", // Gray
      "rgba(255, 0, 130, 1)", // Pink
      "rgba(23, 162, 184, 1)", // Cyan
      "rgba(255, 138, 0, 1)", // Orange
      "rgba(255, 65, 105, 1)", // Magenta
      "rgba(64, 255, 0, 1)", // Lime
      "rgba(166, 85, 204, 1)", // Purple
      "rgba(0, 217, 255, 1)", // Aqua
      "rgba(255, 193, 203, 1)", // Light Pink
      "rgba(75, 192, 192, 1)", // Turquoise
      "rgba(153, 102, 255, 1)", // Light Purple
    ];
    // Generate datasets for each batch
    const datasets = [];
    for (let i = 0; i < batchIDs.length; i++) {
      datasets.push({
        label: `${batchIDs[i]}`,
        backgroundColor: colors[i % colors.length],
        borderColor: colors[i % colors.length],
        borderWidth: 1,
        data: [
          intensity[i],
          aroma[i],
          sweetness[i],
          aftertaste[i],
          consistency[i],
          appearence[i],
          packageQuality[i],
          melting[i],
        ],
      });
    }

    // Generate the bar chart
    const ctx = document.getElementById("scoringChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Intensity",
          "Aroma",
          "Sweetness",
          "Aftertaste",
          "Consistency",
          "Appearence",
          "Package Quality",
          "Melting",
        ],
        datasets: datasets,
      },
      options: {
        indexAxis: "x", // Display scoring categories on x-axis
        scales: {
          y: {
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            position: "top", // Position legend at the top
          },
        },
        responsive: true,
      },
    });
  };

  //Generating the Pie Chart

  const generateOverallScore = () => {
    setShowChart(true);

    // Extract overall scores
    const overallScores = reportData.map((item) => item.overallScore);

    // Calculate number of passes and fails
    const passes = overallScores.filter((score) => score >= 64).length;
    const fails = overallScores.length - passes;

    // Calculate pass and fail percentages
    const total = overallScores.length;
    const passPercentage = ((passes / total) * 100).toFixed(2);
    const failPercentage = (100 - passPercentage).toFixed(2);

    // Generate the graph
    const ctx = document.getElementById("overallScoreChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          `Approved (${passPercentage}%)`,
          `Rejected (${failPercentage}%) `,
        ],
        datasets: [
          {
            label: "Overall Score",
            backgroundColor: [
              "rgba(11, 175, 11, 1)",
              "rgba(255, 28, 47, 0.77)",
            ],
            borderWidth: 1,
            data: [passes, fails],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || "";
                if (label) {
                  label += ": ";
                }
                label += context.parsed;
                return label;
              },
            },
          },
        },
      },
    });
  };

  //Generating a PDF to Summerize Data and get the Report in a PDF Version

  const handleGeneratePDF = () => {
    if (reportData.length === 0) {
      toast.error("Please generate the report first", {
        className: "bg-red-500 text-white font-bold",
      });
      return;
    }

    const element = document.getElementById("capture");
    const opt = {
      margin: 0,
      filename: "BatchReport.pdf",
      image: { type: "jpeg", quality: 7 },
      html2canvas: { scale: 1 },
      jsPDF: {
        unit: "in",
        format: "a2",
        orientation: "landscape",
      },
    };

    html2pdf().from(element).set(opt).save();

    toast.success(
      "Report Generate Successfully, please check your Downloads.",
      {
        className:
          "bg-gradient-to-r from-green-300 to-green-500 text-white font-bold mt-16",
      }
    );
  };

  return (
    <div id="capture" className=" container bg-blue-100 max-w-full max-h-full">
      <div className="bg-gray-300 pt-1 sticky top-0">
        <form onSubmit={handleSubmit}>
          <label
            className="font-bold m-2 font-serif text-base"
            htmlFor="startDate"
          >
            Start Date:
          </label>
          <input
            className="bg-gray-100 font-bold text-center m-2"
            style={{ width: "200px", height: "30px" }}
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label
            className="font-bold m-2 font-serif text-base"
            htmlFor="endDate"
          >
            End Date:
          </label>
          <input
            className="bg-gray-100 font-bold text-center m-2 "
            style={{ width: "200px", height: "30px" }}
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label
            className="font-bold m-2 font-serif text-base"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            className="bg-gray-100 font-bold text-center m-2"
            style={{ width: "200px", height: "30px" }}
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            className="bg-red-500 hover:bg-red-700 active:opacity-65 text-white font-bold py-2 px-4 m-4 rounded w-40"
            type="submit"
          >
            Generate Report
          </button>
          <button
            type="button"
            onClick={() => navigate("/view-batch")}
            className="bg-green-500 hover:bg-green-600 active:opacity-80 text-white font-bold py-2 px-4 rounded m-4 w-40"
          >
            Go Back
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={handleGenerateStatistics}
            className=" mb-5 bg-blue-500 hover:bg-blue-600 active:opacity-80 text-white font-bold py-2 px-4 w-40 rounded "
          >
            Statistics
          </button>
          <button
            onClick={handleGeneratePDF}
            className="mb-5 bg-yellow-500 hover:bg-yellow-600 active:opacity-80 text-white font-bold py-2 px-4 w-40 ml-8 rounded"
          >
            Generate PDF
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center bg-gradient-to-br from-gray-200 to-gray-100">
        {loading ? (
          <p>Loading...</p>
        ) : reportData.length === 0 ? ( // Conditionally render the table header
          <div className="w-full px-4 mt-8">
            <table className="w-full mt-4">
              <thead className="bg-gray-400 border-b-2 border-gray-600 ">
                <tr>
                  <th className="p-3 text-sm font-bold tracking-wide text-center">
                    Batch ID
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-center">
                    Batch Name
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-center">
                    Received Date
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-center">
                    Quantity
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-center">
                    Overall Score
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-center">
                    Status
                  </th>
                </tr>
              </thead>
            </table>
            <p>No data available</p>
          </div>
        ) : (
          <>
            <div className="w-full lg:w-1/2 px-4 mt-4">
              <div
                className="bg-white rounded-lg shadow-lg p-4"
                style={{ border: "1px solid black" }}
              >
                <table className="w-full mt-4 border-gray-300 border-2">
                  <thead className="bg-gray-400 border-b-2 border-gray-600">
                    <tr>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Batch ID
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Batch Name
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Received Date
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Batch Form Completion
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Quantity
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Overall Score
                      </th>
                      <th className="p-3 text-sm font-bold tracking-wide text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-200 border-gray-400">
                    {reportData.map((product, index) => (
                      <tr
                        key={product.batchID}
                        className={
                          index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                        }
                      >
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {product.batchID}
                        </td>
                        <td className="p-3 text-sm  b border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {product.batchName}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {formatDate(product.receivedDate)}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {formatDate(product.CurrentDate)}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {product.quantity}
                        </td>
                        <td className="p-3 text-sm   border-gray-400 text-black font-semibold border-t-2 border-b-2 text-center">
                          {product.overallScore}
                        </td>
                        <td
                          className={`p-3 text-sm border-gray-400 font-semibold border-t-2 border-b-2 text-center ${
                            product.status === "Rejected"
                              ? "text-red-700"
                              : "text-green-700"
                          }`}
                        >
                          {product.status}
                        </td>{" "}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 mt-4">
              {showChart && (
                <div
                  className="bg-white rounded-lg shadow-lg p-4"
                  style={{ height: "450px", border: "1px solid black" }}
                >
                  <canvas id="statusChart"></canvas>
                </div>
              )}
            </div>
            <div className="w-full lg:w-1/2 px-4 mt-4">
              {showChart && (
                <div
                  className="bg-white rounded-lg shadow-lg p-4 mb-5"
                  style={{ height: "450px", border: "1px solid black" }}
                >
                  <canvas id="overallScoreChart"></canvas>
                </div>
              )}
            </div>
            <div
              className="w-full lg:w-1/2 px-4 mt-4 mb-5"
              style={{ height: "450px" }}
            >
              {showChart && (
                <div
                  className="bg-white rounded-lg shadow-lg p-4"
                  style={{ height: "450px", border: "1px solid black" }}
                >
                  <canvas id="scoringChart"></canvas>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
