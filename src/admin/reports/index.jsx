import React, { useState } from 'react';

const AdminReports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Air Pollution in Jakarta',
      category: 'Air Pollution',
      date: '2024-01-10',
      location: 'Jakarta',
      content: 'Severe air pollution detected.',
    },
    {
      id: 2,
      title: 'Illegal Waste Dumping',
      category: 'Waste Management',
      date: '2024-02-05',
      location: 'Surabaya',
      content: 'Reports of illegal dumping of waste.',
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter((report) => report.id !== id));
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-success text-center mb-4">Manage Reports</h1>
      {reports.map((report) => (
        <div
          key={report.id}
          className="card mb-3"
          style={{
            background: '#f1f8e9',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="card-body">
            <h5 className="card-title">{report.title}</h5>
            <p className="card-text">
              <strong>Category:</strong> {report.category}
            </p>
            <p className="card-text">
              <strong>Date:</strong> {report.date}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {report.location}
            </p>
            <p className="card-text">{report.content}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(report.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminReports;
