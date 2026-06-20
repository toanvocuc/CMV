const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// Writer can only manage their own articles

router.get("/articles", async (req, res) => {
  const { status } = req.query;
  const where = { authorId: req.user.id };
  if (status) where.status = status;
  const articles = await prisma.news.findMany({ where, orderBy: { createdAt: "desc" } });
  res.json({ success: true, data: articles });
});

router.post("/articles", async (req, res) => {
  const { title, slug, excerpt, content, category, image, video, attachments } = req.body;
  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return res.status(400).json({ success: false, message: "Thiếu các trường bắt buộc: tiêu đề, slug, nội dung" });
  }
  const exists = await prisma.news.findUnique({ where: { slug } });
  if (exists) return res.status(400).json({ success: false, message: "Slug đã tồn tại" });

  const article = await prisma.news.create({
    data: {
      title: title.trim(), slug: slug.trim(),
      excerpt: excerpt?.trim() ?? "", content: content.trim(),
      category: category?.trim() ?? "Khác", image: image?.trim() ?? "",
      video: video?.trim() || null,
      attachments: attachments ? JSON.stringify(attachments) : null,
      date: new Date().toLocaleDateString("vi-VN"),
      status: "draft",
      authorId: req.user.id,
      authorName: req.user.name,
    },
  });
  res.status(201).json({ success: true, data: article });
});

router.put("/articles/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const article = await prisma.news.findFirst({ where: { id, authorId: req.user.id } });
  if (!article) return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
  if (!["draft", "rejected"].includes(article.status)) {
    return res.status(400).json({ success: false, message: "Chỉ có thể chỉnh sửa bài nháp hoặc bị từ chối" });
  }

  const { title, slug, excerpt, content, category, image, video, attachments } = req.body;
  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return res.status(400).json({ success: false, message: "Thiếu các trường bắt buộc" });
  }
  const conflict = await prisma.news.findFirst({ where: { slug, NOT: { id } } });
  if (conflict) return res.status(400).json({ success: false, message: "Slug đã tồn tại" });

  const updated = await prisma.news.update({
    where: { id },
    data: {
      title: title.trim(), slug: slug.trim(),
      excerpt: excerpt?.trim() ?? "", content: content.trim(),
      category: category?.trim() ?? "Khác", image: image?.trim() ?? "",
      video: video?.trim() || null,
      attachments: attachments ? JSON.stringify(attachments) : null,
      // Editing a rejected article moves it back to draft so writer can re-submit
      ...(article.status === "rejected" ? { status: "draft" } : {}),
    },
  });
  res.json({ success: true, data: updated });
});

// Submit for review: draft → pending
router.patch("/articles/:id/submit", async (req, res) => {
  const id = parseInt(req.params.id);
  const article = await prisma.news.findFirst({ where: { id, authorId: req.user.id } });
  if (!article) return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
  if (article.status !== "draft") {
    return res.status(400).json({ success: false, message: "Chỉ bài nháp mới có thể gửi duyệt" });
  }
  const updated = await prisma.news.update({ where: { id }, data: { status: "pending" } });
  res.json({ success: true, data: updated });
});

// Writer can delete only their own draft or rejected articles
router.delete("/articles/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const article = await prisma.news.findFirst({ where: { id, authorId: req.user.id } });
  if (!article) return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
  if (!["draft", "rejected"].includes(article.status)) {
    return res.status(400).json({ success: false, message: "Chỉ có thể xóa bài nháp hoặc bị từ chối" });
  }
  await prisma.news.delete({ where: { id } });
  res.json({ success: true });
});

module.exports = router;
