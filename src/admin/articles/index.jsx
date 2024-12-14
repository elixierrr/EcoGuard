import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const AdminArticleIndex = () => {
  const { token } = useAuth(); // Ambil token dari AuthContext
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data artikel
  useEffect(() => {
    const fetchArticles = async () => {
      if (!token) {
        console.error('Token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/v1/private/articles', {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token untuk autentikasi
          },
        });
        setArticles(response.data.content || []); // Sesuaikan dengan struktur respons backend
      } catch (error) {
        console.error('Error fetching articles:', error);
        if (error.response) {
          const { status, data } = error.response;
          alert(`Error ${status}: ${data.message || 'Failed to fetch articles.'}`);
        } else {
          alert('Failed to connect to the server. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [token]);

  // Fungsi untuk menghapus artikel
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/v1/private/admin/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token untuk autentikasi
        },
      });
      alert('Article deleted successfully!');
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id)); // Perbarui daftar artikel
    } catch (error) {
      console.error('Error deleting article:', error);
      if (error.response) {
        const { status, data } = error.response;
        alert(`Error ${status}: ${data.message || 'Failed to delete article.'}`);
      } else {
        alert('Failed to connect to the server. Please try again later.');
      }
    }
  };

  // Jika data masih diambil, tampilkan loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika tidak ada artikel ditemukan
  if (!articles.length) {
    return <div>No articles found.</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-success text-center mb-4">Manage Articles</h1>
      <Link to="/admin/articles/create" className="btn btn-success mb-3">
        Create New Article
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.category}</td>
              <td>
                <Link
                  to={`/admin/articles/update/${article.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(article.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticleIndex;
