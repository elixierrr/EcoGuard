const db = require("../config/db"); // Import konfigurasi Firestore

// CREATE - Menambah data laporan
exports.createReport = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    // Validasi input
    if (!title || !description || !location) {
      return res
        .status(400)
        .json({ message: "Title, description, and location are required" });
    }

    // Buat dokumen baru di Firestore
    const reportRef = db.collection("reports").doc();
    await reportRef.set({
      title,
      description,
      location,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: "Report created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Mendapatkan semua laporan
exports.getReports = async (req, res) => {
  try {
    const reportsSnapshot = await db.collection("reports").get();
    const reports = [];
    reportsSnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Mendapatkan laporan berdasarkan ID
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const reportRef = db.collection("reports").doc(id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ id: reportDoc.id, ...reportDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Mengubah laporan berdasarkan ID
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location } = req.body;

    // Validasi input
    if (!title || !description || !location) {
      return res
        .status(400)
        .json({ message: "Title, description, and location are required" });
    }

    const reportRef = db.collection("reports").doc(id);
    await reportRef.update({
      title,
      description,
      location,
      updatedAt: new Date().toISOString(),
    });

    res.status(200).json({ message: "Report updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Menghapus laporan berdasarkan ID
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reportRef = db.collection("reports").doc(id);
    await reportRef.delete();

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
