require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");

// 1. IMPORT SEMUA ROUTE (Dapur)
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");
const historyRoutes = require("./routes/history"); // <-- HAPUS TANDA // DI SINI

// Middleware
app.use(express.json());
app.use(express.static("public"));

// 2. PASANG JALUR URL (Pintu)
app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);
app.use("/admin", adminRoutes);
app.use("/history", historyRoutes); // <-- HAPUS TANDA // DI SINI

app.get("/", (req, res) => {
  res.send("Server jalan 🚀");
});

// 3. RUNNING SERVER
app.listen(3000, () => {
  console.log("Jalan di port 3000");
  console.log("Database terhubung");
});
