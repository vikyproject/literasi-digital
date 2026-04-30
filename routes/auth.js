const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users(username, password) VALUES(?, ?)",
    [username, hash],
    (err) => {
      if (err) return res.json({ msg: "Error register" });
      res.json({ msg: "Register berhasil" });
    },
  );
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // 1. Cek apakah user ada di database
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) return res.status(500).json({ msg: "Server error" });
        if (results.length === 0)
          return res.status(400).json({ msg: "User tidak ditemukan" });

        const user = results[0];

        // 2. Pastikan role yang dipilih sesuai dengan role di database
        if (role && user.role !== role) {
          return res.status(403).json({ msg: "Role tidak sesuai" });
        }

        // 3. Bandingkan password yang diketik dengan yang di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Password salah" });

        // 4. Kalau cocok, buat Token JWT (Surat Izin Masuk)
        const token = jwt.sign(
          { id: user.id, role: user.role },
          "RAHASIA_KUNCI",
          { expiresIn: "1h" },
        );

        res.json({
          msg: "Login berhasil!",
          token: token,
          role: user.role,
        });
      },
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
