import pool from "../config/db.js"; // Impor pool dari db.js

// Fungsi untuk mengambil semua laporan
const getReports = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM reports");
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

// Fungsi untuk mengambil laporan berdasarkan kategori
const getReportsByCategory = async (req, res) => {
  const { category } = req.params; // Mengambil kategori dari parameter URL

  try {
    // Query untuk mengambil laporan berdasarkan kategori
    const [results] = await pool.query(
      "SELECT * FROM reports WHERE category = ?",
      [category]
    );

    // Jika tidak ada laporan yang ditemukan
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports found for this category" });
    }

    // Jika laporan ditemukan
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reports by category",
      error: error.message,
    });
  }
};

// Fungsi untuk menambahkan laporan
export const createReport = async (req, res) => {
  const { title, category, date, location, reportContent } = req.body;
  const uploadImages = req.file ? req.file.filename : null;

  if (!title || !category || !date || !location || !reportContent) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const query = `INSERT INTO reports (title, category, date, location, reportContent, uploadImages) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      title,
      category,
      date,
      location,
      reportContent,
      uploadImages,
    ];
    await pool.query(query, values);

    res.status(201).json({ message: "Report created successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating report.", error: error.message });
  }
};

// Fungsi untuk memperbarui laporan
const updateReport = async (req, res) => {
  const { id } = req.params;
  const { title, category, date, location, reportContent } = req.body;
  const uploadImages = req.file ? req.file.filename : null;

  // Validasi input
  if (!title || !category || !date || !location || !reportContent) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Ambil data laporan yang ada untuk menjaga gambar yang ada jika tidak ada gambar baru yang diupload
    const [existingReport] = await pool.query(
      "SELECT * FROM reports WHERE id = ?",
      [id]
    );

    if (existingReport.length === 0) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Menggunakan uploadImages yang ada jika tidak ada gambar baru
    const imageToUpdate = uploadImages || existingReport[0].uploadImages;

    const [result] = await pool.query(
      "UPDATE reports SET title = ?, category = ?, date = ?, location = ?, reportContent = ?, uploadImages = ? WHERE id = ?",
      [title, category, date, location, reportContent, imageToUpdate, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Report updated",
      report: {
        id,
        title,
        category,
        date,
        location,
        reportContent,
        uploadImages: imageToUpdate,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating report", error: error.message });
  }
};

// Fungsi untuk menghapus laporan
const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM reports WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting report", error: error.message });
  }
};

// Buat objek reportController setelah mendeklarasikan semua fungsi
const reportController = {
  getReports,
  createReport,
  updateReport,
  deleteReport,
  getReportsByCategory,
};

// Ekspor objek reportController sebagai default
export default reportController;
