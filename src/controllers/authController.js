import User from "../models/user.js";
import bcrypt from "bcrypt";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "ecoguard24";

const authController = {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      // Validasi input
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Membuat pengguna baru
      await User.createUser(username, hashedPassword);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Validasi input
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required." });
      }

      // Mencari pengguna berdasarkan username
      const user = await User.findUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Membandingkan password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Mengembalikan pesan sukses dan informasi pengguna (tanpa password)
      res.status(200).json({
        message: "Login successful",
        user: { username: user.username },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async adminLogin(req, res) {
    const { username, password } = req.body;

    try {
      // Validasi input
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username dan password diperlukan." });
      }

      // Cek apakah username dan password sesuai dengan admin
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Mengembalikan pesan sukses dan informasi admin
        return res.status(200).json({
          message: "Login admin berhasil",
          user: { username: ADMIN_USERNAME },
        });
      } else {
        return res.status(401).json({ error: "Kredensial admin tidak valid" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Fungsi Logout
  logout(req, res) {
    // Untuk logout, kita cukup memberikan respons sukses
    res.status(200).json({ message: "Logout successful" });
  },
};

export default authController;
