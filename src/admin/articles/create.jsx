import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const CreateArticle = () => {
  const { token } = useAuth();
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });

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

    try {
      const formData = new FormData();
      formData.append('title', formState.title);
      formData.append('description', formState.description);
      formData.append('category', formState.category);
      formData.append('image', formState.image);

      const response = await axios.post('http://localhost:3001/api/v1/articles/', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Menggunakan token dari authContext
        },
      });

      console.log('Token:', token); // Tambahkan ini untuk debugging
      console.log('Response:', response);
      alert('Article created successfully!');
      // Tambahkan tindakan lain jika perlu, seperti mereset form atau mengarahkan pengguna
    } catch (error) {
      console.error('Error creating article:', error);

      // Memeriksa apakah error.response dan error.response.data ada
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error: Something went wrong.');
      }
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
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
