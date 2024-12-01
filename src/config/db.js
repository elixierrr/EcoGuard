import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Membuat koneksi ke database MySQL menggunakan pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "eco_guard",
});

// Mengekspor pool agar bisa digunakan di file lain
export default pool;
