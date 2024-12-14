import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useAuth } from '../context/authContext';
import 'chart.js/auto';
import axios from 'axios';

const Statistics = () => {
  const [statsData, setStatsData] = useState({
    status: {},
    category: {},
    severity: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Fungsi untuk memformat label (menghapus underscore dan mengganti dengan spasi)
  const formatLabel = (label) =>
    label.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/private/statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.content) {
          setStatsData(response.data.content);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Filter data untuk menghapus key yang kosong
  const filterEmptyKeys = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => key.trim() !== '')
    );
  };

  // Data yang difilter
  const filteredCategoryData = filterEmptyKeys(statsData.category);
  const filteredSeverityData = filterEmptyKeys(statsData.severity);

  // Siapkan data untuk Bar Chart
  const barData = {
    labels: Object.keys(filteredCategoryData).map((key) => formatLabel(key)),
    datasets: [
      {
        label: 'Reported Issues',
        data: Object.values(filteredCategoryData),
        backgroundColor: ['#81c784', '#64b5f6', '#4db6ac'],
      },
    ],
  };

  // Siapkan data untuk Pie Chart
  const pieData = {
    labels: Object.keys(filteredSeverityData).map((key) => formatLabel(key)),
    datasets: [
      {
        data: Object.values(filteredSeverityData),
        backgroundColor: ['#e57373', '#ffd54f', '#81c784'],
      },
    ],
  };

  // Render komponen
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
              <h3 className="text-success">Pending Reports</h3>
              <p>{statsData.status['Pending'] || 0}</p>
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
              <h3 className="text-success">Completed Reports</h3>
              <p>{statsData.status['Completed'] || 0}</p>
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
              <h3 className="text-success">Total Reports</h3>
              <p>{Object.values(statsData.status).reduce((a, b) => a + b, 0)}</p>
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
            <h4 className="text-success">Severity Distribution</h4>
            <Pie data={pieData} options={{ maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
