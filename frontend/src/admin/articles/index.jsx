import React from 'react';
import { Link } from 'react-router-dom';

const AdminArticleIndex = () => {
  const articles = [
    { id: 1, title: '10 Ways to Reduce Plastic Waste', category: 'Waste Management' },
    { id: 2, title: 'The Impact of Air Pollution', category: 'Air Pollution' },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      console.log(`Article with ID ${id} deleted`);
      alert('Article deleted successfully!');
    }
  };

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
                <Link to={`/admin/articles/update/${article.id}`} className="btn btn-primary btn-sm me-2">
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
