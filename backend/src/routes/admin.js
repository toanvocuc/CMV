const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

router.use(requireAuth);
router.use(requireAdmin);

// ─── Stats ────────────────────────────────────────────────────────────────────

router.get("/stats", async (req, res) => {
  const [newsTotal, jobsCount, contactsCount, draft, pending, published, rejected, recentContacts] =
    await Promise.all([
      prisma.news.count(),
      prisma.job.count({ where: { isActive: true } }),
      prisma.contact.count(),
      prisma.news.count({ where: { status: "draft" } }),
      prisma.news.count({ where: { status: "pending" } }),
      prisma.news.count({ where: { status: "published" } }),
      prisma.news.count({ where: { status: "rejected" } }),
      prisma.contact.count({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
    ]);

  res.json({
    success: true,
    data: {
      newsTotal,
      jobsCount,
      contactsCount,
      recentContacts,
      newsStatusCounts: { draft, pending, published, rejected },
    },
  });
});

// ─── Contacts (read-only) ─────────────────────────────────────────────────────

router.get("/contacts", async (req, res) => {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ success: true, data: contacts });
});

// ─── News ─────────────────────────────────────────────────────────────────────

router.get("/news", async (req, res) => {
  const { status, search, page = "1", limit = "15" } = req.query;
  const pageNum = Math.max(1, parseInt(page) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(limit) || 15));

  const where = {};
  // Admin never sees drafts — those belong to the writer portal
  where.status = status ? status : { not: "draft" };
  if (search?.trim()) {
    where.OR = [
      { title: { contains: search.trim() } },
      { category: { contains: search.trim() } },
    ];
  }

  const [news, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    }),
    prisma.news.count({ where }),
  ]);

  res.json({
    success: true,
    data: news,
    total,
    page: pageNum,
    pages: Math.ceil(total / pageSize) || 1,
  });
});

router.post("/news", async (req, res) => {
  const { title, slug, excerpt, content, category, image, date } = req.body;
  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return res.status(400).json({ success: false, message: "Thiếu các trường bắt buộc: tiêu đề, slug, nội dung" });
  }
  const exists = await prisma.news.findUnique({ where: { slug } });
  if (exists) return res.status(400).json({ success: false, message: "Slug đã tồn tại, hãy dùng slug khác" });

  const article = await prisma.news.create({
    data: {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt?.trim() ?? "",
      content: content.trim(),
      category: category?.trim() ?? "Khác",
      image: image?.trim() ?? "",
      date: date?.trim() ?? new Date().toLocaleDateString("vi-VN"),
      status: "draft",
    },
  });
  res.status(201).json({ success: true, data: article });
});

// Reorder published articles — must be before /:id to avoid route conflict
router.put("/news/reorder", async (req, res) => {
  const { orders } = req.body; // [{ id, sortOrder }]
  if (!Array.isArray(orders)) {
    return res.status(400).json({ success: false, message: "orders phải là mảng" });
  }
  await Promise.all(
    orders.map(({ id, sortOrder }) =>
      prisma.news.update({ where: { id: parseInt(id) }, data: { sortOrder: parseInt(sortOrder) } })
    )
  );
  res.json({ success: true });
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
    data: {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt?.trim() ?? "",
      content: content.trim(),
      category: category?.trim() ?? "Khác",
      image: image?.trim() ?? "",
      date: date?.trim() ?? "",
    },
  });
  res.json({ success: true, data: article });
});

router.delete("/news/:id", async (req, res) => {
  await prisma.news.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});


// ─── News Moderation ──────────────────────────────────────────────────────────

router.patch("/news/:id/status", async (req, res) => {
  const id = parseInt(req.params.id);
  const { action } = req.body;

  const article = await prisma.news.findUnique({ where: { id } });
  if (!article) return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });

  const TRANSITIONS = {
    submit:  { from: "draft",     to: "pending" },
    approve: { from: "pending",   to: "published" },
    reject:  { from: "pending",   to: "rejected" },
    retract: { from: "published", to: "draft" },
    redraft: { from: "rejected",  to: "draft" },
  };

  const t = TRANSITIONS[action];
  if (!t || article.status !== t.from) {
    return res.status(400).json({ success: false, message: "Hành động không hợp lệ với trạng thái hiện tại" });
  }

  const data = { status: t.to };
  if (action === "approve") {
    data.approvedBy = req.user.username;
    data.approvedAt = new Date();
    data.date = new Date().toLocaleDateString("vi-VN");
  }
  if (action === "retract" || action === "redraft") {
    data.approvedBy = null;
    data.approvedAt = null;
  }

  const updated = await prisma.news.update({ where: { id }, data });
  res.json({ success: true, data: updated });
});

// ─── Jobs ─────────────────────────────────────────────────────────────────────

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
    data: {
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: type?.trim() ?? "Toàn thời gian",
      level: level?.trim() ?? "Trung cấp",
      deadline: deadline?.trim() ?? "",
      isActive: isActive !== false,
    },
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
    data: {
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: type?.trim() ?? "Toàn thời gian",
      level: level?.trim() ?? "Trung cấp",
      deadline: deadline?.trim() ?? "",
      isActive: isActive !== false,
    },
  });
  res.json({ success: true, data: job });
});

router.delete("/jobs/:id", async (req, res) => {
  await prisma.job.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});

module.exports = router;
