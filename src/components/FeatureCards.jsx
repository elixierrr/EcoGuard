import React from 'react';

const FeatureCards = () => {
  const features = [
    { title: 'Report', description: 'Create your report', link: 'user/report/create' },
    { title: 'Statistics', description: 'View environmental data.', link: 'user/statistics' },
    { title: 'Articles', description: 'Read environmental articles.', link: 'user/article' },
  ];

  return (
    <div className="container mt-5">
      <div className="row text-center">
        {features.map((feature, index) => (
          <div key={index} className="col-md-4">
            <div
              className="card"
              style={{
                backgroundColor: '#DAF5B6',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ color: '#388e3c', marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ color: '#555' }}>{feature.description}</p>
              <a
                href={feature.link}
                className="btn btn-outline-success"
                style={{
                  borderRadius: '5px',
                  padding: '8px 15px',
                  textDecoration: 'none',
                }}
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;