import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext'; // Sesuaikan path ini

const AdminReports = () => {
  const { isLoggedIn, role } = useAuth();
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn && role === 'admin') {
      fetchReports();
    }
  }, [isLoggedIn, role]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/private/admin/reports/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Gunakan token dari local storage untuk autentikasi
        },
      });
      if (Array.isArray(response.data.content)) {
        setReports(response.data.content);
      } else {
        setReports([]); // Jika data tidak dalam bentuk array, tetapkan laporan kosong
      }
    } catch (err) {
      setError(err.message || 'Error fetching reports');
      console.error('Error fetching reports:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/private/admin/reports/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReports(reports.filter((report) => report.id !== id));
        alert('Report deleted successfully');
      } catch (err) {
        setError(err.message || 'Error deleting report');
        console.error('Error deleting report:', err);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/private/admin/reports/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Update the status in the local state after successful update
      const updatedReports = reports.map((report) =>
        report.id === id ? { ...report, status: response.data.content.status } : report
      );
      setReports(updatedReports);
    } catch (err) {
      setError(err.message || 'Error updating report status');
      console.error('Error updating report status:', err);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-success text-center mb-4">Manage Reports</h1>
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      {reports.length > 0 ? (
        reports.map((report) => (
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
              <p className="card-text">{report.reportContent}</p>

              {/* Display Image */}
              {report.image && (
                <div className="mb-3">
                  <img
                    src={`http://localhost:3001/uploads/${report.image}`} // Assuming images are stored in 'uploads' folder
                    alt="Report Image"
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Status Dropdown */}
              <div className="form-group">
                <label htmlFor={`status-${report.id}`}>Status</label>
                <select
                  id={`status-${report.id}`}
                  className="form-control"
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(report.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
};

export default AdminReports;
