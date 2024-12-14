import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null); // State untuk menyimpan artikel
  const { token } = useAuth(); // Ambil token dari authContext

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/private/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan header Authorization
          },
        });
        setArticle(response.data.content); // Sesuaikan dengan struktur data API
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id, token]);

  if (!article) {
    return <div className="container my-5 text-center">Article not found.</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card border-0 shadow" style={{ borderRadius: '10px' }}>
            <img
              src={`http://localhost:3001/uploads/${article.image}`}
              alt={article.title}
              className="card-img-top"
              style={{ borderRadius: '10px 10px 0 0', maxHeight: '400px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h1 className="text-success mb-3" style={{ fontSize: '28px' }}>{article.title}</h1>
              <p className="text-muted mb-4">
                By <strong>{article.author}</strong> on {new Date(article.date).toLocaleDateString()}
              </p>
              <p style={{ whiteSpace: 'pre-line', fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                {article.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
