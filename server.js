require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const db = require("./config/db");

const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");
const historyRoutes = require("./routes/history");

app.use(express.json());
app.use((req, res, next) => {
  if (req.path === "/admin.html") {
    const rawCookie = req.headers.cookie || "";
    const cookies = Object.fromEntries(
      rawCookie
        .split(";")
        .map((cookie) => cookie.trim().split("="))
        .filter(([key]) => key),
    );

    const authHeader = req.header("Authorization");
    const token = authHeader
      ? authHeader.startsWith("Bearer ")
        ? authHeader.slice(7).trim()
        : authHeader
      : cookies.token;

    if (!token) {
      return res.redirect("/index.html");
    }

    try {
      const decoded = jwt.verify(token, "RAHASIA_KUNCI");
      if (decoded.role !== "admin") {
        return res.redirect("/menu.html");
      }
      next();
    } catch (err) {
      return res.redirect("/index.html");
    }
  } else {
    next();
  }
});
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);
app.use("/admin", adminRoutes);
app.use("/history", historyRoutes); // <-- HAPUS TANDA // DI SINI

// app.get("/public", (req, res) => {
//   res.send("Server jalan 🚀");
// });

// 3. RUNNING SERVER
app.listen(3000, () => {
  console.log("Jalan di port 3000");
  console.log("Database terhubung");
});
