require("dotenv").config(); // Mengonfigurasi environment variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS
app.use(bodyParser.json()); // Parsing JSON request body

// Route untuk root endpoint
app.get("/", (req, res) => {
  res.send("EcoGuardAPI is running!");
});

// Menyambungkan Routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/reports", reportRoutes); // Report routes

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
