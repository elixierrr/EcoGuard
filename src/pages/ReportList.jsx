import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const ReportList = () => {
  const { isLoggedIn, userId, token } = useAuth(); // Ensure 'isLoggedIn' is accessible here
  const [reports, setReports] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        //const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/v1/private/reports/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data.content);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch reports');
      }
    };

    if (isLoggedIn) {
      fetchReports();
    }
  }, [isLoggedIn]);

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Report List</h1>
      {fetchError ? (
        <div className="alert alert-danger">{fetchError}</div>
      ) : (
        <div className="row">
          {reports.map((report) => (
            <div className="col-md-4 mb-4" key={report.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{report.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{report.category}</h6>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
                    <br />
                    <strong>Location:</strong> {report.location}
                    <br />
                    <strong>Severity:</strong> {report.severity}
                    <br />
                    <strong>Status:</strong> {report.status} {/* Display status */}
                  </p>
                  <a href={`/user/report/list/${report.id}`} className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;
