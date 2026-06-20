const express = require("express");
const router = express.Router();

router.use("/health",  require("./health"));
router.use("/news",    require("./news"));
router.use("/jobs",    require("./jobs"));
router.use("/contact", require("./contact"));
router.use("/auth",    require("./auth"));
router.use("/admin",   require("./admin"));
router.use("/writer",  require("./writer"));
router.use("/upload",  require("./upload"));

module.exports = router;
