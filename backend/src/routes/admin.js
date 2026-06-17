const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// ─── Stats ────────────────────────────────────────────────────────────────────

router.get("/stats", async (req, res) => {
  const [newsCount, jobsCount, contactsCount] = await Promise.all([
    prisma.news.count(),
    prisma.job.count({ where: { isActive: true } }),
    prisma.contact.count(),
  ]);
  const recentContacts = await prisma.contact.count({
    where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
  });
  res.json({ success: true, data: { newsCount, jobsCount, contactsCount, recentContacts } });
});

// ─── Contacts (read-only) ─────────────────────────────────────────────────────

router.get("/contacts", async (req, res) => {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ success: true, data: contacts });
});

// ─── News CRUD ────────────────────────────────────────────────────────────────

router.get("/news", async (req, res) => {
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ success: true, data: news });
});

router.post("/news", async (req, res) => {
  const { title, slug, excerpt, content, category, image, date } = req.body;
  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return res.status(400).json({ success: false, message: "Thiếu các trường bắt buộc: tiêu đề, slug, nội dung" });
  }
  const exists = await prisma.news.findUnique({ where: { slug } });
  if (exists) return res.status(400).json({ success: false, message: "Slug đã tồn tại, hãy dùng slug khác" });

  const article = await prisma.news.create({
    data: { title: title.trim(), slug: slug.trim(), excerpt: excerpt?.trim() ?? "", content: content.trim(), category: category?.trim() ?? "Khác", image: image?.trim() ?? "", date: date?.trim() ?? new Date().toLocaleDateString("vi-VN") },
  });
  res.status(201).json({ success: true, data: article });
});

router.put("/news/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, slug, excerpt, content, category, image, date } = req.body;
  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return res.status(400).json({ success: false, message: "Thiếu các trường bắt buộc" });
  }
  const conflict = await prisma.news.findFirst({ where: { slug, NOT: { id } } });
  if (conflict) return res.status(400).json({ success: false, message: "Slug đã tồn tại" });

  const article = await prisma.news.update({
    where: { id },
    data: { title: title.trim(), slug: slug.trim(), excerpt: excerpt?.trim() ?? "", content: content.trim(), category: category?.trim() ?? "Khác", image: image?.trim() ?? "", date: date?.trim() ?? "" },
  });
  res.json({ success: true, data: article });
});

router.delete("/news/:id", async (req, res) => {
  await prisma.news.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});

// ─── Jobs CRUD ────────────────────────────────────────────────────────────────

router.get("/jobs", async (req, res) => {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ success: true, data: jobs });
});

router.post("/jobs", async (req, res) => {
  const { title, department, location, type, level, deadline, isActive } = req.body;
  if (!title?.trim() || !department?.trim() || !location?.trim()) {
    return res.status(400).json({ success: false, message: "Thiếu các trường bắt buộc: tiêu đề, phòng ban, địa điểm" });
  }
  const job = await prisma.job.create({
    data: { title: title.trim(), department: department.trim(), location: location.trim(), type: type?.trim() ?? "Toàn thời gian", level: level?.trim() ?? "Trung cấp", deadline: deadline?.trim() ?? "", isActive: isActive !== false },
  });
  res.status(201).json({ success: true, data: job });
});

router.put("/jobs/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, department, location, type, level, deadline, isActive } = req.body;
  if (!title?.trim() || !department?.trim() || !location?.trim()) {
    return res.status(400).json({ success: false, message: "Thiếu các trường bắt buộc" });
  }
  const job = await prisma.job.update({
    where: { id },
    data: { title: title.trim(), department: department.trim(), location: location.trim(), type: type?.trim() ?? "Toàn thời gian", level: level?.trim() ?? "Trung cấp", deadline: deadline?.trim() ?? "", isActive: isActive !== false },
  });
  res.json({ success: true, data: job });
});

router.delete("/jobs/:id", async (req, res) => {
  await prisma.job.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});

module.exports = router;
