import React from 'react';

const EducationalTips = () => {
  const tips = [
    'Reduce, Reuse, Recycle.',
    'Conserve water by turning off the tap while brushing your teeth.',
    'Use public transportation or carpool to reduce air pollution.',
    'Plant trees to improve air quality.',
    'Avoid single-use plastics by switching to reusable alternatives.',
  ];

  return (
    <div className="container mt-5">
      <h2 style={{ color: '#28a745', textAlign: 'center', marginBottom: '20px' }}>Educational Tips</h2>
      <ul style={{ listStyleType: 'disc', padding: '20px', color: '#555' }}>
        {tips.map((tip, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default EducationalTips;
