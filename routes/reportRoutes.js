const express = require("express");
const {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Melindungi API dengan middleware autentikasi
router.post("/", authMiddleware, createReport);
router.get("/", getReports);
router.get("/:id", getReportById);
router.put("/:id", authMiddleware, updateReport);
router.delete("/:id", authMiddleware, deleteReport);

module.exports = router;
