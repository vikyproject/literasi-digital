const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db"); // <--- PASTIIN INI ADA

router.get("/my-history", authMiddleware, (req, res) => {
    const sql = "SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC";
    db.query(sql, [req.user.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "DB Error" });
        }
        res.json(results);
    });
});

module.exports = router; // <--- PASTIIN INI ADA