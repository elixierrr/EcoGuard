import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const UpdateArticle = () => {
  const { id } = useParams(); // Fetching the article ID from the URL
  const { token } = useAuth(); // Get token for authentication
  const navigate = useNavigate(); // To redirect after updating
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch article data by ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/private/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        });
        const { title, description, category, image } = response.data;
        setFormData({
          title,
          description,
          category,
          image: null, // You can keep image as null for now since we will send it on update
        });
      } catch (error) {
        console.error('Error fetching article:', error);
        alert('Error fetching article data.');
      }
    };

    fetchArticle();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill all fields!');
      return;
    }

    setLoading(true); // Start loading
    try {
      const updateData = new FormData();
      updateData.append('title', formData.title);
      updateData.append('description', formData.description);
      updateData.append('category', formData.category);

      if (formData.image) {
        updateData.append('image', formData.image); // Only append image if it's changed
      }

      const response = await axios.put(
        `http://localhost:3001/api/v1/private/admin/articles/${id}`, // Use PUT request to update article
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        }
      );

      console.log('Article updated:', response.data);
      alert('Article updated successfully!');
      navigate(`/articles/${id}`); // Redirect after update
    } catch (error) {
      console.error('Error updating article:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error: Something went wrong.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-success text-center mb-4">Update Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Article'}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
