const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name?.trim()) return res.status(400).json({ success: false, message: "Vui lòng nhập họ và tên." });
  if (!email?.trim()) return res.status(400).json({ success: false, message: "Vui lòng nhập email." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: "Email không hợp lệ." });
  if (!message?.trim()) return res.status(400).json({ success: false, message: "Vui lòng nhập nội dung." });

  const contact = await prisma.contact.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      subject: subject?.trim() || null,
      message: message.trim(),
    },
  });

  res.status(201).json({ success: true, data: { id: contact.id } });
});

module.exports = router;
