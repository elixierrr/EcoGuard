import React from 'react';
import ReportButton from '../components/ReportButton';
import FeatureCards from '../components/FeatureCards';
import HomeBg from '../assets/home-bg.png';

const Home = () => {
  const heroStyle = {
    background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)', 
    padding: '50px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  const heroContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    textAlign: 'left',
  };

  const textContainerStyle = {
    maxWidth: '50%',
    flex: '1',
    padding: '20px',
  };

  const textStyle = {
    color: '#555',
    fontSize: '18px',
    marginBottom: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
    padding: '20px',
  };

  const buttonStyle = {
    marginTop: '20px', 
  };

  const imageStyle = {
    marginTop: '-150px', 
    width: '100%',
    height: 'auto',
    borderRadius: '0px',
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container" style={heroContainerStyle}>
          {/* Deskripsi di kiri */}
          <div style={textContainerStyle}>
            <h1 style={{ color: '#388e3c', fontSize: '36px' }}>ECOGUARD</h1>
            <h3 style={{ color: '#388e3c', fontSize: '24px' }}>
              Protect the Earth, Starting with Your Report
            </h3>
            <p style={{ ...textStyle, marginTop: '24px' }}>
              EcoGuard is a platform that makes it easy for people to report environmental problems directly via
              interactive maps. With the data collected, EcoGuard provides the latest information about environmental
              conditions, helps people take quick action, and encourages cooperation between society and government in
              protecting the environment.
            </p>
          </div>

          {/* Tombol Report di kanan */}
          <div style={buttonContainerStyle}>
            <p style={{ ...textStyle, marginTop: '24px' }}>
              Report environmental problems around you easily and quickly. Together, we can make real change.
            </p>
            <div style={buttonStyle}>
              <ReportButton />
            </div>
          </div>
        </div>

        {/* Gambar di bawah */}
        <img
          src={HomeBg} 
          alt="EcoGuard Hero"
          style={imageStyle}
        />
      </section>

      {/* Feature Cards Section */}
      <section>
        <div className="container mt-5">
          <h2
            style={{
              color: '#388e3c',
              fontSize: '28px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Features
          </h2>
          <FeatureCards />
        </div>
      </section>
    </div>
  );
};

export default Home;
