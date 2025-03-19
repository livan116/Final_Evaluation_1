import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import style from "./Response.module.css";
import { Chart } from "react-google-charts";

// Options for Google Chart
export const options = {
  title: "Completion Rate",
  pieHole: 0.4,
  is3D: false,
  colors: ["#4285F4", "#DADCE0"],
  legend: { position: "bottom" },
};

const apiUrl = import.meta.env.VITE_API_URI;

const Responses = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch form details and responses when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch form details - using the getFormById route
        const formResponse = await axios.get(`${apiUrl}/api/forms/form/${formId}`);
        
        if (!formResponse.data.success) {
          throw new Error("Failed to fetch form data");
        }
        
        setFormData(formResponse.data.form);
        
        // Fetch form responses - using your resonses route (with the typo)
        const responsesResponse = await axios.get(`${apiUrl}/api/forms/resonses/${formId}`);
        
        if (!responsesResponse.data.success) {
          throw new Error("Failed to fetch form responses");
        }
        
        setResponseData(responsesResponse.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data");
        setLoading(false);
      }
    };

    if (formId) {
      fetchData();
    }
  }, [formId]);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}></div>
        <p>Loading form data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.errorContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className={style.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  if (!formData) {
    return <div className={style.noData}>No form data available.</div>;
  }

  // Extract form metrics with default values
  const viewCount = formData.viewCount || 0;
  const startedCount = formData.startedCount || 0;
  const submittedCount = formData.submittedCount || 0;
  const fields = formData.fields || [];

  // Calculate completion rate
  const completionRate = viewCount > 0 ? ((submittedCount / viewCount) * 100).toFixed(2) : 0;

  // Prepare data for pie chart
  const chartData = [
    ["Task", "Count"],
    ["Completed", submittedCount],
    ["Not Completed", viewCount - submittedCount],
  ];

  return (
    <div className={style.responsesContainer}>
      <h2 className={style.formTitle}>{formData.name} - Responses</h2>
      
      {/* Stats Cards */}
      <div className={style.statsContainer}>
        <div className={style.statsCard}>
          <h3>Views</h3>
          <p className={style.statValue}>{viewCount}</p>
        </div>
        <div className={style.statsCard}>
          <h3>Starts</h3>
          <p className={style.statValue}>{startedCount}</p>
        </div>
        <div className={style.statsCard}>
          <h3>Submissions</h3>
          <p className={style.statValue}>{submittedCount}</p>
        </div>
        <div className={style.statsCard}>
          <h3>Completion Rate</h3>
          <p className={style.statValue}>{completionRate}%</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className={style.chartSection}>
        <Chart
          chartType="PieChart"
          width="100%"
          height="300px"
          data={chartData}
          options={options}
        />
      </div>

      {/* Responses Table */}
      <div className={style.tableContainer}>
        <h3>Form Responses ({responseData.length})</h3>
        {responseData.length === 0 ? (
          <div className={style.noResponses}>
            <p>No responses submitted yet.</p>
          </div>
        ) : (
          <div className={style.tableWrapper}>
            <table className={style.responsesTable}>
              <thead>
                <tr>
                  <th className={style.dateColumn}>Submitted</th>
                  {fields.map((field) => (
                    <th key={field._id}>{field.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responseData.map((response) => (
                  <tr key={response._id}>
                    <td className={style.dateCell}>
                      {format(new Date(response.createdAt), "MMM dd, yyyy HH:mm")}
                    </td>
                    {fields.map((field) => {
                      // Find the matching response for this field by label
                      const responseItem = response.responses.find(
                        item => item.label === field.label
                      );
                      
                      return (
                        <td key={field._id} className={style.responseCell}>
                          {responseItem ? responseItem.answer : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Responses;