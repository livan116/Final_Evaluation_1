import React from "react";
import style from "./Response.module.css";
import { Chart } from "react-google-charts";

// Options for Google Chart
export const options = {
  title: "Completion Rate",
  pieHole: 0.4,
  is3D: false,
  legend: { position: "none" },
};

// Responses component
const Responses = ({ forms }) => {
  // Check if forms array is available
  if (!forms || forms.length === 0) {
    return <p>No form data available.</p>;
  }

  // Extract the first form for view, start, and submission counts
  const form = forms[0];
  const { viewCount, startedCount, submittedCount, fields } = form;

  // Calculate completion rate: (submitted / views) * 100
  const completionRate =
    viewCount > 0 ? ((submittedCount / viewCount) * 100).toFixed(2) : 0;

  // Prepare data for pie chart
  const chartData = [
    ["Task", "Count"],
    ["Completed", submittedCount],
    ["Not Completed", viewCount - submittedCount],
  ];
  console.log(forms)
  return (
    <div>
      <div className={style.container}>
        <div className={style.response}>
          <h3>Views</h3>
          <p>{viewCount}</p>
        </div>
        <div className={style.response}>
          <h3>Starts</h3>
          <p>{startedCount}</p>
        </div>
        <div className={style.response}>
          <h3>Submissions</h3>
          <p>{submittedCount}</p>
        </div>

        <div className={style.chartSection}>
          <Chart
            chartType="PieChart"
            width="400px"
            height="300px"
            data={chartData}
            options={options}
          />
          <div className={style.completionRate}>
            <h3>Completion rate</h3>
            <p>{completionRate}%</p>
          </div>
        </div>
      </div>

      <div className={style.tableContainer}>
        <h3>Responses Table</h3>
        <table className={style.responsesTable}>
          <thead>
            <tr>
              <th>Submitted at</th>
              {fields.map((field) => (
                <th key={field._id}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Assuming form has responses stored inside an array `form.responses` */}
            <tr>
            {form.fields.map((response) => (

              
                <td>{response.value}</td>
              
            ))}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Responses;
