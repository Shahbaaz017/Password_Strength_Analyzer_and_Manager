import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPage = () => {
  const [passwordStats, setPasswordStats] = useState({
    veryWeak: 0,
    weak: 0,
    moderate: 0,
    strong: 0,
    veryStrong: 0,
    total: 0,
  });

  // Fetch password statistics from backend
  useEffect(() => {
    const fetchPasswordStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/password-stats"); // Replace with your API endpoint
        const data = await response.json();
        setPasswordStats(data);
      } catch (error) {
        console.error("Error fetching password stats:", error);
      }
    };

    fetchPasswordStats();
  }, []);

  // Prepare data for the pie chart
  const pieData = {
    labels: ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"],
    datasets: [
      {
        data: [
          passwordStats.veryWeak,
          passwordStats.weak,
          passwordStats.moderate,
          passwordStats.strong,
          passwordStats.veryStrong,
        ],
        backgroundColor: ["#dc3545", "#fd7e14", "#ffc107", "#28a745", "#007bff"],
        hoverBackgroundColor: ["#b02a37", "#e1690c", "#e0a800", "#1c7c33", "#0056b3"],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Password Analytics</h1>
      <div className="row">
        {/* Statistics Table */}
        <div className="col-md-6">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Category</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Very Weak</td>
                <td>{passwordStats.veryWeak}</td>
              </tr>
              <tr>
                <td>Weak</td>
                <td>{passwordStats.weak}</td>
              </tr>
              <tr>
                <td>Moderate</td>
                <td>{passwordStats.moderate}</td>
              </tr>
              <tr>
                <td>Strong</td>
                <td>{passwordStats.strong}</td>
              </tr>
              <tr>
                <td>Very Strong</td>
                <td>{passwordStats.veryStrong}</td>
              </tr>
              <tr className="font-weight-bold">
                <td>Total</td>
                <td>{passwordStats.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pie Chart */}
        <div className="col-md-6">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Return Button */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">
          Return to Main Page
        </Link>
      </div>
    </div>
  );
};

export default AnalyticsPage;
