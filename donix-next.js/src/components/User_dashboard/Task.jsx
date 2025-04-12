import React, { useState, useEffect } from "react";
import * as d3 from "d3";



export const Task = () => {
  const [formData, setFormData] = useState({
    heart_rate: "",
    bp: "",
    oxygen_saturation: "",
    symptoms: "",
    feedback: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-3xl p-6 shadow-md rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Generate My Task</h1>
          {/* <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-md ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button> */}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="heart_rate"
            placeholder="Enter Heart Rate (e.g., 72)"
            value={formData.heart_rate}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-md ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
            }`}
          />
          <input
            type="text"
            name="bp"
            placeholder="Enter Blood Pressure (e.g., 120/80)"
            value={formData.bp}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-md ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
            }`}
          />
          <input
            type="text"
            name="oxygen_saturation"
            placeholder="Enter Oxygen Saturation (e.g., 98%)"
            value={formData.oxygen_saturation}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-md ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
            }`}
          />
          <textarea
            name="symptoms"
            placeholder="Enter Symptoms (e.g., fever, cough)"
            value={formData.symptoms}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-md ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
            }`}
          />
          <textarea
            name="feedback"
            placeholder="Enter Feedback (e.g., patient is stable)"
            value={formData.feedback}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-md ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 font-bold rounded-md ${
              darkMode
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">Error: {error}</p>}

        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Response</h2>
            <div id="chart" className="flex justify-center my-4"></div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Recovery Score</h3>
              <p>{response[0]}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Recovery Plan</h3>
              <div
                className={`p-4 rounded-md ${
                  darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                {formatResponse(response[1])}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Feedback Prompt</h3>
              <p>{response[2]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};