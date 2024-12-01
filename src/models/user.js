import pool from "../config/db.js"; // Koneksi ke database

const User = {
  async createUser(username, hashedPassword) {
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    await pool.query(query, [username, hashedPassword]);
  },

  async findUserByUsername(username) {
    const query = "SELECT * FROM users WHERE username = ?";
    const [results] = await pool.query(query, [username]);
    return results[0]; // Mengembalikan pengguna pertama
  },
};

export default User;
