const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// GET /api/jobs
router.get("/", async (req, res) => {
  const { search, department } = req.query;

  const where = {
    isActive: true,
    ...(department ? { department } : {}),
    ...(search ? {
      OR: [
        { title: { contains: search } },
        { department: { contains: search } },
      ],
    } : {}),
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  res.json({ success: true, data: jobs });
});

module.exports = router;
