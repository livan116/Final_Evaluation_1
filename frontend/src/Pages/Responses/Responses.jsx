import React from "react";
import style from "./Response.module.css";

import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7], // CSS-style declaration
];

export const options = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};

const Responses = ({ forms }) => {
  console.log(forms);
  return (
    <div>
      <div className={style.container}>
        {forms.map((item) => (
          <div className="div" key={item._id}>
            <div className={style.response}>
              <h3>views</h3>
              <p>{item.viewCount}</p>
            </div>
            <div className={style.response}>
              <h3>started</h3>
              <p>{item.startedCount}</p>
            </div>
            <div className={style.response}>
              <h3>submitted</h3>
              <p>{item.submittedCount}</p>
            </div>
            <table>
            {
                item.fields.map((field) => {
                    return (
                    <tr key={field._id}>
                        <th>{field.label}</th>
                    </tr>
                    );
                })
            }
        </table>
          </div>
        ))}
      </div>

      <div className="table">
        
      </div>
      <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
      <div className={style.responsesData}></div>
    </div>
  );
};

export default Responses;
