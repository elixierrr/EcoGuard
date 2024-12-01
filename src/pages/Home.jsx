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

  const imageStyle = {
    marginTop: '-50px',
    width: '100%',
    height: 'auto',
    borderRadius: '0px',
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container">
          <div className="row align-items-center">
            {/* Deskripsi di kiri */}
            <div className="col-lg-6 col-md-12 mb-4">
              <h1 className="text-success" style={{ fontSize: '36px' }}>ECOGUARD</h1>
              <h3 className="text-success" style={{ fontSize: '24px' }}>
                Protect the Earth, Starting with Your Report
              </h3>
              <p className="text-muted mt-3" style={{ fontSize: '18px' }}>
                EcoGuard is a platform that makes it easy for people to report environmental problems directly via
                interactive maps. With the data collected, EcoGuard provides the latest information about environmental
                conditions, helps people take quick action, and encourages cooperation between society and government in
                protecting the environment.
              </p>
            </div>

            {/* Tombol Report di kanan */}
            <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center">
              <p className="text-muted mt-3 text-center" style={{ fontSize: '18px' }}>
                Report environmental problems around you easily and quickly. Together, we can make real change.
              </p>
              <div className="mt-4">
                <ReportButton />
              </div>
            </div>
          </div>

          {/* Gambar di bawah */}
          <div className="row">
            <div className="col-12">
              <img
                src={HomeBg}
                alt="EcoGuard Hero"
                style={imageStyle}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section>
        <div className="container mt-5">
          <h2 className="text-success text-center mb-4" style={{ fontSize: '28px' }}>
            Features
          </h2>
          <FeatureCards />
        </div>
      </section>
    </div>
  );
};

export default Home;
