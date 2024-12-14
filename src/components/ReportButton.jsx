import React from 'react';
import { Link } from 'react-router-dom';

const ReportButton = () => {
  return (
    <Link to="/report/create">
      <button
        className="btn btn-lg"
        style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          fontSize: '18px',
          marginTop: '20px',
        }}
      >
        REPORT NOW!
      </button>
    </Link>
  );
};

export default ReportButton;
