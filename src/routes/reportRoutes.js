import express from "express";
import reportController from "../controllers/reportController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { createReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", reportController.getReports);
router.post("/", reportController.createReport);
router.put(
  "/:id",
  upload.single("uploadImages"),
  reportController.updateReport
);
router.delete("/:id", reportController.deleteReport);

router.post("/create", upload.single("uploadImages"), createReport);
router.get("/:category", reportController.getReportsByCategory);

export default router;
