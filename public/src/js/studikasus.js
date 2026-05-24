const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

const cases = [
  {
    id: "phishing",
    title: "Phishing Email",
    description:
      "Anda menerima email dari bank yang menyatakan akun Anda akan diblokir jika tidak memperbarui data. Email berisi tautan untuk login dan memverifikasi informasi.",
    actions: [
      { id: "click", label: "Klik tautan dan login segera" },
      { id: "report", label: "Laporkan email sebagai phishing" },
      { id: "ignore", label: "Lewatkan dan hapus email" },
    ],
    correct: "report",
    feedback: {
      click:
        "Tindakan ini berisiko karena tautan bisa mengarah ke halaman palsu yang mengambil data Anda.",
      report:
        "Bagus! Ini adalah tindakan aman. Email phishing harus dilaporkan dan dihapus tanpa memberi informasi pribadi.",
      ignore:
        "Membiarkannya saja kurang aman. Idealnya email phishing harus dilaporkan agar sistem dapat menanganinya.",
    },
  },
  {
    id: "scam",
    title: "Penipuan Hadiah",
    description:
      "Anda mendapat pesan dari nomor tak dikenal yang mengklaim Anda memenangkan hadiah besar, tetapi harus membayar biaya administrasi terlebih dahulu.",
    actions: [
      { id: "pay", label: "Bayar biaya administrasi agar hadiah cair" },
      {
        id: "verify",
        label: "Verifikasi kondisi dan sumber pesan terlebih dahulu",
      },
      {
        id: "share",
        label: "Bagikan pesan ke grup untuk dapat hadiah lebih cepat",
      },
    ],
    correct: "verify",
    feedback: {
      pay: "Risiko tinggi! Penipuan sering meminta biaya lebih dulu tanpa jaminan apapun.",
      verify:
        "Benar. Selalu periksa dulu keaslian tawaran sebelum membayar atau membagikan informasi.",
      share:
        "Berbagi pesan ini hanya menyebarkan penipuan ke orang lain dan tidak memperbaiki keamanan Anda.",
    },
  },
  {
    id: "password",
    title: "Password Bersama",
    description:
      "Seorang teman meminta Anda membagikan password akun belajar online agar mereka dapat melihat materi dalam satu akun.",
    actions: [
      {
        id: "share",
        label: "Berikan password agar teman bisa mengakses",
      },
      {
        id: "reject",
        label: "Tolak dan jelaskan pentingnya menjaga password",
      },
      { id: "swap", label: "Ajak teman membuat akun baru sendiri" },
    ],
    correct: "reject",
    feedback: {
      share:
        "Menyerahkan password membuka potensi penyalahgunaan akun dan membahayakan data Anda.",
      reject:
        "Tindakan tepat. Password adalah informasi pribadi yang tidak boleh dibagikan.",
      swap: "Membuat akun baru lebih baik daripada berbagi password, tetapi menjelaskan risiko tetap lebih penting.",
    },
  },
  {
    id: "privacy",
    title: "Pengaturan Privasi",
    description:
      "Aplikasi baru meminta akses penuh ke kontak dan lokasi Anda sebelum bisa digunakan. Anda perlu menilai apakah izin ini sesuai.",
    actions: [
      {
        id: "allow",
        label: "Izinkan semua akses agar aplikasi berjalan",
      },
      { id: "deny", label: "Tolak izin yang tidak relevan" },
      { id: "later", label: "Tangani nanti setelah mencoba aplikasi" },
    ],
    correct: "deny",
    feedback: {
      allow:
        "Memberi izin berlebihan bisa mengancam privasi Anda jika aplikasi tidak benar-benar memerlukannya.",
      deny: "Tindakan bijak. Hanya berikan izin yang relevan dengan fungsi aplikasi.",
      later:
        "Menunda keputusan dapat mengakibatkan akses data tetap diberikan tanpa berpikir matang.",
    },
  },
  {
    id: "malware",
    title: "Unduhan Aplikasi",
    description:
      "Anda menemukan aplikasi gratis di situs tidak resmi yang menjanjikan fitur premium. Untuk mengunduh, Anda harus memasang file .exe.",
    actions: [
      { id: "install", label: "Unduh dan pasang sekarang" },
      { id: "official", label: "Cari versi resmi di toko aplikasi" },
      { id: "share", label: "Bagikan tautan ke teman" },
    ],
    correct: "official",
    feedback: {
      install:
        "File dari sumber tidak resmi sering mengandung malware yang bisa merusak perangkat Anda.",
      official:
        "Langkah tepat. Selalu gunakan sumber resmi untuk mengunduh aplikasi.",
      share:
        "Menyebarkan file dari sumber tidak terpercaya dapat membahayakan orang lain juga.",
    },
  },
  {
    id: "rumor",
    title: "Kabar Viral",
    description:
      "Anda menerima kiriman pesan berantai yang mengatakan suatu berita besar sedang terjadi, tetapi tidak ada sumber resmi yang tercantum.",
    actions: [
      { id: "forward", label: "Teruskan pesan ke grup agar semua tahu" },
      { id: "check", label: "Cek sumber resmi sebelum percaya" },
      { id: "delete", label: "Hapus saja dan abaikan" },
    ],
    correct: "check",
    feedback: {
      forward:
        "Menyebarkan informasi tanpa verifikasi bisa memperkuat hoaks dan kebingungan.",
      check:
        "Sangat baik. Verifikasi sumber resmi adalah langkah utama dalam literasi digital.",
      delete:
        "Menghapus bisa mencegah penyebaran, tetapi memeriksa kebenaran tetap paling bijak.",
    },
  },
  {
    id: "wifi",
    title: "Wi-Fi Publik",
    description:
      "Anda ingin mengakses materi belajar di kafe, tetapi jaringannya tidak terenkripsi dan diminta beberapa informasi pribadi.",
    actions: [
      { id: "connect", label: "Sambungkan dan lanjutkan belajar" },
      { id: "wait", label: "Gunakan data seluler atau VPN" },
      { id: "share", label: "Berikan data untuk akses gratis" },
    ],
    correct: "wait",
    feedback: {
      connect:
        "Wi-Fi publik yang tidak terenkripsi rentan terhadap pencurian data dan serangan peretas.",
      wait: "Langkah cerdas. Prioritaskan koneksi aman atau gunakan VPN sebelum mengakses data sensitif.",
      share:
        "Memberikan data pribadi untuk akses gratis bisa menimbulkan risiko privasi dan penyalahgunaan.",
    },
  },
  {
    id: "deepfake",
    title: "Video Palsu",
    description:
      "Seorang influencer membagikan video yang tampak nyata, tetapi banyak detail terlihat kurang konsisten. Anda harus memutuskan bagaimana merespons.",
    actions: [
      { id: "like", label: "Suka dan komentari sebagai fakta" },
      {
        id: "investigate",
        label: "Periksa lebih jauh sumber dan keaslian video",
      },
      { id: "share", label: "Bagikan karena menarik" },
    ],
    correct: "investigate",
    feedback: {
      like: "Menganggapnya sebagai fakta tanpa verifikasi dapat membuat informasi keliru tersebar.",
      investigate:
        "Itu pilihan tepat. Selalu konfirmasi sumber sebelum menerima atau menyebarkan konten digital.",
      share:
        "Menyebarkan tanpa memeriksa keaslian berisiko memperbanyak hoaks dan misinformasi.",
    },
  },
];

const state = {
  stage: "start",
  selectedCase: null,
  selectedAction: null,
  score: 0,
};

const stepBox = document.getElementById("stepBox");
const scoreBadge = document.getElementById("scoreBadge");
const scoreValue = document.getElementById("scoreValue");

function render() {
  scoreValue.textContent = state.score;
  scoreBadge.style.display = state.score > 0 ? "flex" : "none";

  if (state.stage === "start") {
    stepBox.innerHTML = `
                    <div class="step-card">
                        <h2>Mulai Simulasi</h2>
                        <p>Pelajari skenario keamanan digital, pilih tindakan terbaik, dan dapatkan evaluasi dari AI. Tingkatkan skor Anda dengan membuat keputusan yang tepat.</p>
                        <div class="final-actions">
                            <button class="control-button" onclick="goToCaseSelection()">Mulai Simulasi</button>
                        </div>
                    </div>
                `;
    return;
  }

  if (state.stage === "choose-case") {
    stepBox.innerHTML = `
                    <div class="step-card">
                        <h2>Pilih Kasus Simulasi</h2>
                        <p>Tentukan skenario yang ingin Anda coba dari daftar berikut.</p>
                        <div class="option-grid">
                            ${cases
                              .map(
                                (item) => `
                                <button class="option-button secondary" onclick="selectCase('${item.id}')">
                                    <strong>${item.title}</strong>
                                    <p>${item.description}</p>
                                </button>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                `;
    return;
  }

  if (state.stage === "scenario") {
    const current = cases.find((c) => c.id === state.selectedCase);
    stepBox.innerHTML = `
                    <div class="step-card">
                        <h2>Skenario: ${current.title}</h2>
                        <p>${current.description}</p>
                        <p style="margin-top: 1.5rem; font-weight: 700; color: var(--text);">Pilih tindakan yang paling aman:</p>
                        <div class="option-grid">
                            ${current.actions
                              .map(
                                (action) => `
                                <button class="action-button" onclick="selectAction('${action.id}')\">${action.label}</button>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                `;
    return;
  }

  if (state.stage === "evaluation") {
    const current = cases.find((c) => c.id === state.selectedCase);
    const correct = state.selectedAction === current.correct;
    const feedback = current.feedback[state.selectedAction];
    const scoreText = correct ? "Skor 100" : "Skor 50";
    const scoreClass = correct ? "highlight-success" : "highlight-danger";

    stepBox.innerHTML = `
                    <div class="step-card">
                        <h2>Evaluasi AI</h2>
                        <div class="feedback">
                            <strong>${correct ? "✓ Tindakan Tepat!" : "✗ Tindakan Kurang Optimal"}</strong>
                            <p>${feedback}</p>
                        </div>
                        <div class="result-box ${!correct ? "error" : ""}">
                            <p style="margin: 0; color: var(--muted); font-size: 0.95rem;">Pilihan Anda: <strong>${current.actions.find((a) => a.id === state.selectedAction).label}</strong></p>
                            <div class="score-badge ${scoreClass}">${scoreText}</div>
                        </div>
                        <div class="final-actions">
                            <button class="control-button" onclick="repeatSimulation()">Coba Kasus Lain</button>
                            <button class="control-button" onclick="finishSimulation()">Selesai</button>
                        </div>
                    </div>
                `;
    return;
  }

  if (state.stage === "finished") {
    stepBox.innerHTML = `
                    <div class="step-card">
                        <h2>Simulasi Selesai</h2>
                        <p>Terima kasih telah menyelesaikan simulasi studi kasus. Skor akhir Anda: <strong class="highlight-success">${state.score}</strong> poin.</p>
                        <p>Anda telah belajar tentang keamanan digital melalui skenario praktis. Lanjutkan dengan modul atau coba simulasi lainnya!</p>
                        <div class="final-actions">
                            <button class="control-button" onclick="goToCaseSelection()">Coba Lagi</button>
                            <button class="control-button" onclick="restart()">Kembali ke Awal</button>
                        </div>
                    </div>
                `;
    return;
  }
}

function goToCaseSelection() {
  state.stage = "choose-case";
  state.selectedCase = null;
  state.selectedAction = null;
  render();
}

function selectCase(caseId) {
  state.selectedCase = caseId;
  state.stage = "scenario";
  state.selectedAction = null;
  render();
}

function selectAction(actionId) {
  state.selectedAction = actionId;
  const current = cases.find((c) => c.id === state.selectedCase);
  state.score = actionId === current.correct ? 100 : 50;
  state.stage = "evaluation";
  render();
}

function repeatSimulation() {
  state.stage = "choose-case";
  state.selectedCase = null;
  state.selectedAction = null;
  state.score = 0;
  render();
}

function finishSimulation() {
  state.stage = "finished";
  render();
}

function restart() {
  state.stage = "start";
  state.selectedCase = null;
  state.selectedAction = null;
  state.score = 0;
  render();
}

render();
