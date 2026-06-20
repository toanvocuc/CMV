require("dotenv").config();
const app = require("./src/app");
const seed = require("./src/utils/seed");

const PORT = process.env.PORT || 5000;

seed()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
  });
