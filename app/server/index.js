const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Impor instance sequelize dari models
const { sequelize } = require("./models");

// Router yang diimpor secara dinamis. Tambahkan nama baru di sini bila perlu.
const arr_router = [
  "auth",
  "sepeda",
  "pelanggan",
  "penyewaan",
  "pengembalian",
  "riwayat",
  "dashboard",
];

const routers = {};
arr_router.forEach((name) => {
  routers[name] = require(`./router/router_${name}`);
});

Object.keys(routers).forEach((routerKey) => {
  app.use("/", routers[routerKey]);
});

async function bootstrap() {
  await sequelize.authenticate();
  console.log("MySQL connected!");

  await sequelize.sync({ force: false });
  console.log("Tabel sudah disinkronkan!");

  const { Admin } = require("./models");
  const [admin, created] = await Admin.findOrCreate({
    where: { username: "admin" },
    defaults: {
      name: "Admin Hazza Bike",
      username: "admin",
      password: await bcrypt.hash("admin", 10),
    },
  });

  if (created) {
    console.log("Akun admin default dibuat (username: admin, password: admin)");
  }

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Error saat bootstrap server:", err);
});
