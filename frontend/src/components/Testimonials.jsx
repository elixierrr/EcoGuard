import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'EcoGuard made it so easy to report an issue in my neighborhood! The response was quick and effective.',
    },
    {
      name: 'Jane Smith',
      feedback: 'I learned so much about protecting the environment through their educational resources.',
    },
    {
      name: 'Sam Wilson',
      feedback: 'Tracking my report progress gave me peace of mind. Great platform!',
    },
  ];

  return (
    <div className="container mt-5">
      <h2 style={{ color: '#28a745', textAlign: 'center', marginBottom: '20px' }}>What People Are Saying</h2>
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="col-md-4">
            <div
              className="card"
              style={{
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontStyle: 'italic', color: '#555' }}>
                "{testimonial.feedback}"
              </p>
              <h5 style={{ color: '#388e3c', marginTop: '10px' }}>- {testimonial.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
