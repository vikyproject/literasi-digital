# 📱 Literasi Digital AI — Chatbot Edukasi Keamanan Digital

> Final Project — AI Productivity and AI API Integration for Developers | Hacktiv8

Literasi Digital AI adalah platform edukasi berbasis chatbot yang membantu pengguna memahami dan menerapkan keamanan digital dalam kehidupan sehari-hari. Chatbot ini berperan sebagai **pakar literasi digital** yang memberikan langkah-langkah aman, checklist keamanan, dan edukasi seputar dunia digital.

---

## 🎯 Use Case

**Education Bot — Digital Literacy Assistant**

Membantu pengguna memahami:
- 🔐 Keamanan akun dan password
- 🎣 Mengenali dan menghindari phishing & scam
- 🛡️ Perlindungan data pribadi
- 📱 Etika bermedia sosial
- 🛒 Belanja online yang aman
- 💰 Literasi finansial digital (pinjol & investasi)
- 🤖 Penggunaan AI secara bijak
- 👨‍👩‍👧 Parenting di era digital

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🤖 **AI Chatbot** | Didukung Groq AI (llama model), berperan sebagai pakar literasi digital |
| 🔑 **Autentikasi** | Register & login dengan JWT + enkripsi bcrypt |
| 💬 **Riwayat Chat** | Seluruh percakapan tersimpan di database per user |
| 📚 **Modul Belajar** | Koleksi modul & buku digital seputar literasi digital |
| 👥 **Multi-role** | Dukungan role admin dan user |
| ✅ **Checklist Keamanan** | Setiap jawaban AI dilengkapi checklist tindakan yang bisa diikuti |

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Backend** | Node.js + Express.js |
| **Database** | MySQL (via mysql2) |
| **AI Model** | Groq SDK — llama-3.3-70b-versatile |
| **Autentikasi** | JSON Web Token (JWT) + bcrypt |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Environment** | dotenv |

---

## 📁 Struktur Project

```
literasi-digital/
├── config/
│   └── db.js              # Konfigurasi koneksi MySQL
├── middleware/
│   └── auth.js            # Middleware JWT authentication
├── public/
│   ├── index.html         # Halaman utama / login
│   ├── chat.html          # Halaman chatbot
│   └── ...                # Aset CSS & JS
├── routes/
│   ├── auth.js            # Route register & login
│   ├── chat.js            # Route chatbot AI
│   └── modules.js         # Route modul belajar
├── utils/
│   └── groq.js            # Helper integrasi Groq API
├── server.js              # Entry point aplikasi
├── package.json           # Dependencies
├── literasi-ai.sql        # Skema & data awal database
├── .env                   # Variabel environment (tidak di-commit)
├── .gitignore
└── README.md
```

---

## 🗄️ Struktur Database

### Tabel `users`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT | Primary key, auto increment |
| username | VARCHAR(50) | Nama pengguna |
| password | VARCHAR(255) | Password terenkripsi (bcrypt) |
| role | ENUM | `admin` atau `user` |

### Tabel `history`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT | Primary key, auto increment |
| user_id | INT | Foreign key ke tabel users |
| message | TEXT | Pesan dari pengguna |
| response | TEXT | Jawaban dari AI |
| created_at | TIMESTAMP | Waktu percakapan |

### Tabel `modules`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT | Primary key, auto increment |
| title | VARCHAR(255) | Judul modul |
| description | TEXT | Deskripsi modul |
| image_url | VARCHAR(1024) | URL gambar cover |
| module_url | VARCHAR(1024) | Link ke modul / buku digital |
| created_at | TIMESTAMP | Waktu ditambahkan |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js v18+
- MySQL / MariaDB
- Akun Groq AI ([console.groq.com](https://console.groq.com))

### 1. Clone Repository
```bash
git clone https://github.com/vikyproject/literasi-digital.git
cd literasi-digital
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
Buka phpMyAdmin atau MySQL CLI, lalu import file SQL:
```bash
# Via MySQL CLI
mysql -u root -p < literasi-ai.sql

# Atau via phpMyAdmin:
# Database → Import → pilih file literasi-ai.sql
```

### 4. Konfigurasi Environment
Buat file `.env` di root folder:
```env
# Groq AI API Key
# Daftar di: https://console.groq.com/keys
GROQ_API_KEY=gsk_isi-api-key-groq-kamu

# Konfigurasi Database MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=literasi-ai

# JWT Secret (ganti dengan string acak yang kuat)
JWT_SECRET=rahasia_jwt_kamu_disini

# Port Server
PORT=3000
```

### 5. Jalankan Server
```bash
node server.js
```

### 6. Buka Browser
```
http://localhost:3000
```

---

## 🔒 Keamanan

- Password user dienkripsi menggunakan **bcrypt** sebelum disimpan ke database
- Autentikasi menggunakan **JWT Token** yang expire secara otomatis
- API key disimpan di `.env` dan **tidak pernah di-commit ke GitHub**
- File `.env` sudah terdaftar di `.gitignore`

---

## 🤖 Konfigurasi AI

Chatbot menggunakan model **llama-3.3-70b-versatile** dari Groq dengan persona:

> *"Kamu adalah pakar literasi digital yang membantu pengguna memahami keamanan online. Setiap jawaban dilengkapi langkah-langkah aman dan checklist yang bisa langsung diterapkan pengguna."*

**Parameter Kreatif:**
| Parameter | Nilai |
|-----------|-------|
| Model | llama-3.3-70b-versatile |
| Bahasa | Indonesia |
| Domain | Literasi & Keamanan Digital |
| Gaya | Edukatif, informatif, dilengkapi checklist |
| Memori | Riwayat chat tersimpan per user di database |

---

## 👥 Role Pengguna

| Role | Akses |
|------|-------|
| **User** | Register, login, chat dengan AI, lihat riwayat chat, akses modul |
| **Admin** | Semua akses user + kelola modul belajar |

---

## 📸 Screenshots

*(Tambahkan screenshot tampilan UI di sini)*

---

## 👤 Author

**Nama:** Viky  
**GitHub:** [@vikyproject](https://github.com/vikyproject)  
**Cohort:** Hacktiv8 — AI Productivity and AI API Integration for Developers
