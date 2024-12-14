import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]); // State untuk menyimpan artikel
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // State untuk loading
  const { token } = useAuth();
  const navigate = useNavigate();

  // Ambil data artikel dari API saat komponen di-mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/private/articles/', {
          headers: {
            Authorization: `Bearer ${token}`, // Gunakan token dari authContext
          },
        });
        setArticles(response.data.content); // Simpan data artikel ke state
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false); // Set loading selesai
      }
    };

    fetchArticles();
  }, []);

  // Filter artikel berdasarkan pencarian
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleArticleClick = (id) => {
    navigate(`/user/article/${id}`); // Navigasi ke halaman detail artikel
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

  if (loading) {
    return <p>Loading articles...</p>;
  }

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
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              style={articleStyle}
              onClick={() => handleArticleClick(article.id)}
            >
              <img
                src={`http://localhost:3001/uploads/${article.image}`}
                alt={article.title}
                style={articleImageStyle}
              />
              <h3 style={{ color: '#388e3c', fontSize: '20px' }}>{article.title}</h3>
              <p style={{ color: '#555', fontSize: '16px' }}>{article.description}</p>
              <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#888' }}>
                Category: {article.category}
              </p>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </section>
  );
};

export default Articles;
