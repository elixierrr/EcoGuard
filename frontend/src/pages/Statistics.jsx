import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Statistics = () => {
  // Contoh Data Dinamis
  const statsData = {
    totalReports: 270,
    airPollution: 120,
    wasteManagement: 85,
    waterPollution: 65,
  };

  // Data untuk Grafik
  const barData = {
    labels: ['Air Pollution', 'Waste Management', 'Water Pollution'],
    datasets: [
      {
        label: 'Reported Issues',
        data: [
          statsData.airPollution,
          statsData.wasteManagement,
          statsData.waterPollution,
        ],
        backgroundColor: ['#81c784', '#64b5f6', '#4db6ac'],
      },
    ],
  };

  const pieData = {
    labels: ['Air Pollution', 'Waste Management', 'Water Pollution'],
    datasets: [
      {
        data: [
          statsData.airPollution,
          statsData.wasteManagement,
          statsData.waterPollution,
        ],
        backgroundColor: ['#81c784', '#64b5f6', '#4db6ac'],
      },
    ],
  };

  return (
    <section
      style={{
        background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)',
        padding: '50px 20px',
        borderRadius: '10px',
        marginBottom: '20px',
        textAlign: 'center',
      }}
    >
      <div className="container">
        <h1
          className="text-success mb-4"
          style={{ fontSize: '28px' }}
        >
          Environmental Statistics
        </h1>
        <p
          className="text-muted mb-5"
          style={{ fontSize: '18px' }}
        >
          Real-time statistics on environmental issues reported by users.
        </p>

        {/* Summary Section */}
        <div className="row g-4 mb-5">
          <div className="col-lg-4 col-md-6">
            <div
              className="p-4 bg-light text-center"
              style={{
                backgroundColor: '#f1f8e9',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 className="text-success">Total Reports</h3>
              <p>{statsData.totalReports}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div
              className="p-4 bg-light text-center"
              style={{
                backgroundColor: '#f1f8e9',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 className="text-success">Laporan Terselesaikan</h3>
              <p>185</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div
              className="p-4 bg-light text-center"
              style={{
                backgroundColor: '#f1f8e9',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 className="text-success">Area Terdampak</h3>
              <p>42 Regions</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row">
          {/* Bar Chart */}
          <div className="col-md-6">
            <h4 className="text-success">Issues Reported</h4>
            <Bar data={barData} options={{ maintainAspectRatio: true }} />
          </div>

          {/* Pie Chart */}
          <div className="col-md-6">
            <h4 className="text-success">Category Distribution</h4>
            <Pie data={pieData} options={{ maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
