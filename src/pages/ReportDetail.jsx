import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';

const ReportDetail = () => {
  const { id } = useParams(); // Mendapatkan ID laporan dari URL parameter
  const { token } = useAuth();
  console.log(token);

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/private/reports/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Gunakan token dari authContext
            },
          });
        setReport(response.data.content);
      } catch (err) {
        setError('Error fetching report details');
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card" style={{ background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body">
              <h1 className="text-center" style={{ color: '#388e3c' }}>Report Details</h1>
              
              {report && (
                <>
                  <div className="mb-3">
                    <strong>Title:</strong> {report.title}
                  </div>
                  <div className="mb-3">
                    <strong>Category:</strong> {report.category}
                  </div>
                  <div className="mb-3">
                    <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
                  </div>
                  <div className="mb-3">
                    <strong>Location:</strong> {report.location}
                  </div>
                  <div className="mb-3">
                    <strong>Content:</strong> <p>{report.reportContent}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Severity:</strong> {report.severity}
                  </div>
                  {report.image && (
                    <div className="mb-3">
                      <strong>Image:</strong>
                      <img src={`http://localhost:3001/uploads/${report.image}`} alt="Report Image" className="img-fluid" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
