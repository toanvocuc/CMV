const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10mb" }));

// Serve all uploaded files (images, videos, attachments) with inline Content-Disposition
const uploadsDir = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsDir, {
  setHeaders: (res) => res.setHeader("Content-Disposition", "inline"),
}));

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ success: false, message: "File quá lớn" });
  }
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

module.exports = app;
