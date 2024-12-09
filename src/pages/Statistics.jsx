import React from 'react';

const Statistics = () => {
  const sectionStyle = {
    background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)',
    padding: '50px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  return (
    <section style={sectionStyle}>
      <div className="container">
        <h1 className="text-success mb-4" style={{ fontSize: '28px' }}>Environmental Statistics</h1>
        <p className="text-muted mb-5" style={{ fontSize: '18px' }}>
          Here are some real-time statistics on the environmental problems reported by users.
        </p>
        <div className="row g-4">
          {/* Air Pollution Card */}
          <div className="col-lg-4 col-md-6">
            <div
              className="p-4 bg-light text-center"
              style={{
                backgroundColor: '#f1f8e9',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 className="text-success">Air Pollution</h3>
              <p>Reported Issues: 120</p>
            </div>
          </div>

          {/* Waste Management Card */}
          <div className="col-lg-4 col-md-6">
            <div
              className="p-4 bg-light text-center"
              style={{
                backgroundColor: '#f1f8e9',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 className="text-success">Waste Management</h3>
              <p>Reported Issues: 85</p>
            </div>
          </div>

          {/* Water Pollution Card */}
          <div className="col-lg-4 col-md-6">
            <div
              className="p-4 bg-light text-center"
              style={{
                backgroundColor: '#f1f8e9',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 className="text-success">Water Pollution</h3>
              <p>Reported Issues: 65</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
