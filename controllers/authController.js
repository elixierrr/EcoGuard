const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const db = admin.firestore(); // Pastikan Firebase Admin SDK sudah diinisialisasi

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke Firestore
    const userRef = db.collection("users").doc(email); // Menggunakan email sebagai ID user
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Menambahkan data pengguna ke Firestore
    await userRef.set({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna di Firestore
    const userRef = db.collection("users").doc(email);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists)
      return res.status(404).json({ message: "User not found" });

    const user = userSnapshot.data();

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Buat token JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};
