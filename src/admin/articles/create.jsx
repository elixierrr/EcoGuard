import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const CreateArticle = () => {
  const { token, userId } = useAuth();
  console.log(userId, token);
  

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Token:', token);

    // Validasi form
    if (!formState.title || !formState.description || !formState.category || !formState.image) {
      alert('Please fill all fields and upload an image!');
      return;
    }

    setLoading(true); // Mulai loading
    try {
      const formData = new FormData();
      formData.append('title', formState.title);
      formData.append('description', formState.description);
      formData.append('category', formState.category);
      formData.append('image', formState.image);

      const response = await axios.post(
        `http://localhost:3001/api/v1/private/admin/articles/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gunakan token dari authContext
          },
        }
      );

       // Debugging token
      console.log('Response:', response);

      alert('Article created successfully!');
      // Reset form state
      setFormState({
        title: '',
        description: '',
        category: '',
        image: null,
      });
    } catch (error) {
      console.error('Error creating article:', error);

      // Tampilkan pesan error
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error: Something went wrong.');
      }
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-success text-center mb-4">Create Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formState.title}
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
            value={formState.description}
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
            value={formState.category}
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
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Article'}
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
