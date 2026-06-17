const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập tên đăng nhập và mật khẩu" });
  }

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
  }

  const token = jwt.sign(
    { username, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
  );

  res.json({ success: true, token, username });
});

module.exports = router;
