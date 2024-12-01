import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const init = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware untuk parsing JSON
  app.use(express.json());
  app.use(bodyParser.json());
  app.use("/uploads", express.static("uploads"));

  app.use("/api/auth", authRoutes);
  app.use("/api/reports", reportRoutes);

  // Jalankan server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Panggil fungsi init
init();
