const bcrypt = require("bcryptjs");
const prisma = require("../prisma");

async function seedUser({ username, password, name, role }) {
  if (!username || !password) return;
  const existing = await prisma.user.findUnique({ where: { username } });
  if (!existing) {
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { username, password: hash, name, role } });
    console.log(`✓ ${role} user "${username}" seeded`);
  }
}

module.exports = async function seed() {
  await seedUser({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    name: "Administrator",
    role: "admin",
  });

  await seedUser({
    username: process.env.WRITER_USERNAME,
    password: process.env.WRITER_PASSWORD,
    name: process.env.WRITER_NAME || "Writer",
    role: "writer",
  });
};
