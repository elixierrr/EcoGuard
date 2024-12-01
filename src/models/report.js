import db from "../config/db.js";

const Report = {
  // Fungsi untuk membuat laporan baru
  async createReport(
    userId,
    title,
    category,
    date,
    location,
    reportContent,
    uploadImages
  ) {
    const query =
      "INSERT INTO reports (user_id, title, category, date, location, reportContent, uploadImages) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [
      userId,
      title,
      category,
      date,
      location,
      reportContent,
      uploadImages,
    ]);
    return result;
  },

  // Fungsi untuk mengambil semua laporan
  async getAllReports() {
    const query = "SELECT * FROM reports";
    const [rows] = await db.execute(query);
    return rows;
  },

  // Fungsi untuk memperbarui laporan
  async updateReport(
    id,
    title,
    description,
    category,
    date,
    location,
    reportContent,
    uploadImages
  ) {
    const query = `
      UPDATE reports 
      SET title = ?, description = ?, category = ?, date = ?, location = ?, reportContent = ?, uploadImages = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      title,
      description,
      category,
      date,
      location,
      reportContent,
      uploadImages,
      id,
    ]);
    return result;
  },

  // Fungsi untuk menghapus laporan
  async deleteReport(id) {
    const query = "DELETE FROM reports WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

export default Report;
