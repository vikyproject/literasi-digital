require("dotenv").config();
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Groq = require("groq-sdk");
const db = require("../config/db"); // Pastikan ini mengarah ke file koneksi database kamu

const groqApiKey = process.env.GROQ_API_KEY;
if (!groqApiKey) {
  throw new Error(
    "GROQ_API_KEY tidak ditemukan. Buat file .env dan isi GROQ_API_KEY=your_key",
  );
}

const groq = new Groq({
  apiKey: groqApiKey,
});

// ... (bagian atas tetap sama) ...

router.post("/chat", authMiddleware, async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah pakar literasi digital. Berikan langkah-langkah aman dan checklist [ ].",
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    // --- INI YANG KURANG DI GAMBAR KAMU: SIMPAN KE DB ---
    const db = require("../config/db"); // Pastikan import db ada di atas atau di sini
    const sql =
      "INSERT INTO history (user_id, message, response) VALUES (?, ?, ?)";
    db.query(sql, [req.user.id, message, text], (err) => {
      if (err) console.error("Gagal simpan:", err.message);
      else console.log("Data chat tersimpan!");
    });
    // ---------------------------------------------------

    res.json({ reply: text });
  } catch (error) {
    console.error("ERROR GROQ:", error.message);
    res.status(500).json({ reply: "Duh, otaknya lagi berasap!" });
  }
});
module.exports = router;
