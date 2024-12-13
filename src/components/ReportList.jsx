import React from 'react';
import { useAuth } from './AuthContext'; // Sesuaikan dengan lokasi file AuthContext
import axios from 'axios';

const ReportList = () => {
  const { isLoggedIn, role } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/v1/reports'); // Sesuaikan endpoint sesuai kebutuhan
        setReports(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {reports.map((report) => (
          <div key={report.id} className="col-md-6 mb-4">
            <div className="card">
              <img src={report.image} alt="Report" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{report.title}</h5>
                <p className="card-text">{report.content}</p>
                <p className="card-text">
                  <small className="text-muted">{report.date} - {report.location}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportList;
