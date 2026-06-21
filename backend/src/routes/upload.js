const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const requireAuth = require("../middleware/requireAuth");

const BASE = process.env.UPLOADS_DIR || path.join(__dirname, "../../uploads");
const DIRS = {
  images: BASE,
  videos: path.join(BASE, "videos"),
  files:  path.join(BASE, "files"),
};
Object.values(DIRS).forEach((d) => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

function makeStorage(subdir) {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, DIRS[subdir]),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
    },
  });
}

// ─── Image upload (existing) ──────────────────────────────────────────────────

const imageUpload = multer({
  storage: makeStorage("images"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(
      path.extname(file.originalname).toLowerCase()
    );
    cb(ok ? null : new Error("Chỉ chấp nhận ảnh JPG, PNG, WebP, GIF"), ok);
  },
});

router.post("/", requireAuth, imageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "Không có file nào được tải lên" });
  res.json({ success: true, url: `/uploads/${req.file.filename}` });
});

// ─── Video upload ─────────────────────────────────────────────────────────────

const videoUpload = multer({
  storage: makeStorage("videos"),
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  fileFilter: (req, file, cb) => {
    const ok = [".mp4", ".webm", ".mov", ".avi", ".mkv"].includes(
      path.extname(file.originalname).toLowerCase()
    );
    cb(ok ? null : new Error("Chỉ chấp nhận video MP4, WebM, MOV, AVI, MKV"), ok);
  },
});

router.post("/video", requireAuth, videoUpload.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "Không có file nào được tải lên" });
  res.json({ success: true, url: `/uploads/videos/${req.file.filename}` });
});

// ─── File (attachment) upload ─────────────────────────────────────────────────

const fileUpload = multer({
  storage: makeStorage("files"),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (req, file, cb) => {
    const ok = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".csv"].includes(
      path.extname(file.originalname).toLowerCase()
    );
    cb(ok ? null : new Error("Chỉ chấp nhận PDF, Word, Excel, PowerPoint, TXT, CSV"), ok);
  },
});

router.post("/file", requireAuth, fileUpload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "Không có file nào được tải lên" });
  res.json({
    success: true,
    url:  `/uploads/files/${req.file.filename}`,
    name: req.file.originalname,
    size: req.file.size,
  });
});

module.exports = router;
