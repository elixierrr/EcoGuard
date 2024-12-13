import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: '10 Ways to Reduce Plastic Waste',
      description: 'Plastic waste is a global issue. Here are some tips to reduce plastic consumption in your daily life.',
      category: 'Waste Management',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'The Impact of Air Pollution',
      description: 'Learn about the harmful effects of air pollution and what we can do to combat it.',
      category: 'Air Pollution',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Water Conservation Tips',
      description: 'Water is a precious resource. Discover simple ways to save water and protect the environment.',
      category: 'Water Conservation',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  const sectionStyle = {
    background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)',
    padding: '50px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const articleContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const articleStyle = {
    backgroundColor: '#f1f8e9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    cursor: 'pointer',
  };

  const articleImageStyle = {
    width: '100%',
    height: '150px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '10px',
  };

  return (
    <section style={sectionStyle}>
      <h1 className="text-success mb-4" style={{ fontSize: '28px' }}>
        Environmental Articles
      </h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          width: '80%',
          maxWidth: '500px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      <div style={articleContainerStyle}>
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            style={articleStyle}
            onClick={() => handleArticleClick(article.id)}
          >
            <img
              src={article.image}
              alt={article.title}
              style={articleImageStyle}
            />
            <h3 style={{ color: '#388e3c', fontSize: '20px' }}>{article.title}</h3>
            <p style={{ color: '#555', fontSize: '16px' }}>{article.description}</p>
            <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#888' }}>
              Category: {article.category}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Articles;
