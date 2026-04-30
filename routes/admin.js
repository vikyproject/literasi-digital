const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Pastikan config/db.js kamu udah bener

// Route buat ambil semua user
router.get("/users", (req, res) => {
  const query = "SELECT id, username, role FROM users";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update role user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const validRoles = ["admin", "user"];

  if (!role || !validRoles.includes(role)) {
    return res.status(400).json({ error: "Role tidak valid." });
  }

  const query = "UPDATE users SET role = ? WHERE id = ?";
  db.query(query, [role, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, affectedRows: results.affectedRows });
  });
});

// Hapus user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, affectedRows: results.affectedRows });
  });
});

router.get("/modules", (req, res) => {
  const query = "SELECT * FROM modules ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/modules", (req, res) => {
  const { title, description, image_url, module_url } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title dan deskripsi wajib diisi." });
  }

  const query =
    "INSERT INTO modules (title, description, image_url, module_url) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [title, description, image_url || "", module_url || ""],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, insertId: result.insertId });
    },
  );
});

module.exports = router;
