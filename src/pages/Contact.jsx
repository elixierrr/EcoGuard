import React from 'react';

const Contact = () => {
  const sectionStyle = {
    background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)',
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

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#388e3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
  };

  return (
    <section style={sectionStyle}>
      <h1 style={headingStyle}>Contact Us</h1>
      <form style={formStyle}>
        <input type="text" placeholder="Your Name" style={inputStyle} />
        <input type="email" placeholder="Your Email" style={inputStyle} />
        <textarea placeholder="Your Message" rows="5" style={inputStyle}></textarea>
        <button type="submit" style={buttonStyle}>
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
