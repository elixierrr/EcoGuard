import React from 'react';

const Articles = () => {
  const sectionStyle = {
    background: 'linear-gradient(to bottom, #ffffff, #DAF5B6)',
    padding: '50px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#388e3c',
    fontSize: '28px',
    marginBottom: '20px',
  };

  const articleContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const articleStyle = {
    backgroundColor: '#f1f8e9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const articleTitleStyle = {
    color: '#388e3c',
    fontSize: '22px',
    marginBottom: '10px',
  };

  const articleTextStyle = {
    color: '#555',
    fontSize: '16px',
  };

  return (
    <section style={sectionStyle}>
      <h1 style={headingStyle}>Environmental Articles</h1>
      <div style={articleContainerStyle}>
        <div style={articleStyle}>
          <h3 style={articleTitleStyle}>10 Ways to Reduce Plastic Waste</h3>
          <p style={articleTextStyle}>
            Plastic waste is a global issue. Here are some tips to reduce plastic consumption in your daily life.
          </p>
        </div>
        <div style={articleStyle}>
          <h3 style={articleTitleStyle}>The Impact of Air Pollution</h3>
          <p style={articleTextStyle}>
            Learn about the harmful effects of air pollution and what we can do to combat it.
          </p>
        </div>
        <div style={articleStyle}>
          <h3 style={articleTitleStyle}>Water Conservation Tips</h3>
          <p style={articleTextStyle}>
            Water is a precious resource. Discover simple ways to save water and protect the environment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Articles;
