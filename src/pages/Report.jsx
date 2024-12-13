import React, { useState } from 'react';
import axios from 'axios';

const Report = () => {
  const cardStyle = {
    background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#388e3c',
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    content: '',
    severity: 'medium', // Default value
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('reportContent', formData.content);
    formDataToSend.append('severity', formData.severity);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/reports', // Use endpoint for creating report
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Your report has been submitted successfully!');
      console.log('Response:', response.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <h1 style={headingStyle}>Submit a Report</h1>
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="air pollution">Air Pollution</option>
                    <option value="waste management">Waste Management</option>
                    <option value="water pollution">Water Pollution</option>
                  </select>
                </div>

                {/* Date */}
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Report Content</label>
                  <textarea
                    id="content"
                    name="content"
                    className="form-control"
                    rows="4"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Severity */}
                <div className="mb-3">
                  <label htmlFor="severity" className="form-label">Severity</label>
                  <select
                    id="severity"
                    name="severity"
                    className="form-select"
                    value={formData.severity}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Upload Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
