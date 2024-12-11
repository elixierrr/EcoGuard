import React, { useState } from 'react';

const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sending data to backend
    console.log('Submitted Article Data:', formData);
    alert('Article created successfully!');
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
        <button type="submit" className="btn btn-success w-100">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
