import React from 'react';
import ReactDOM from 'react-dom/client'; // Menggunakan createRoot dari React 18
import App from './App'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Inisialisasi root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
