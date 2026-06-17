const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// GET /api/news
router.get("/", async (req, res) => {
  const { category, page = "1", limit = "9" } = req.query;

  const pageNum = Math.max(1, parseInt(page));
  const pageSize = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * pageSize;

  const where = category && category !== "Tất cả" ? { category } : {};

  const [items, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        image: true,
        date: true,
      },
    }),
    prisma.news.count({ where }),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: {
      total,
      page: pageNum,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
});

// GET /api/news/:slug
router.get("/:slug", async (req, res) => {
  const article = await prisma.news.findUnique({
    where: { slug: req.params.slug },
  });

  if (!article) {
    return res.status(404).json({ success: false, message: "Article not found" });
  }

  res.json({ success: true, data: article });
});

module.exports = router;
