const faqs = [
  {
    id: 1,
    question: "Apa itu Literasi AI?",
    answer:
      "Literasi AI adalah platform edukasi yang menyediakan materi pembelajaran tentang kecerdasan buatan (AI) untuk membantu masyarakat memahami konsep dasar, aplikasi, dan dampak AI dalam kehidupan sehari-hari.",
  },
  {
    id: 2,
    question: "Siapa yang dapat menggunakan Literasi AI?",
    answer:
      "Literasi AI dirancang untuk semua kalangan, mulai dari pelajar, mahasiswa, profesional, hingga masyarakat umum yang ingin belajar tentang AI tanpa memerlukan latar belakang teknis.",
  },
  {
    id: 3,
    question: "Apakah materi di Literasi AI gratis?",
    answer:
      "Ya, semua materi pembelajaran di Literasi AI dapat diakses secara gratis. Kami percaya bahwa pengetahuan tentang AI harus dapat diakses oleh semua orang tanpa hambatan biaya.",
  },
  {
    id: 4,
    question: "Bagaimana cara saya mulai belajar di Literasi AI?",
    answer:
      "Anda dapat mulai dengan mengunjungi halaman modul kami, memilih topik yang Anda minati, dan mengikuti panduan pembelajaran yang tersedia. Kami juga menyediakan studi kasus dan konsultasi AI untuk membantu Anda memahami konsep dengan lebih baik.",
  },
  {
    id: 5,
    question:
      "Apakah saya perlu memiliki pengetahuan teknis untuk menggunakan Literasi AI?",
    answer:
      "Tidak, Literasi AI dirancang untuk pemula dan tidak memerlukan pengetahuan teknis sebelumnya. Materi kami disusun dengan bahasa yang mudah dipahami dan dilengkapi dengan contoh serta ilustrasi untuk memudahkan pemahaman.",
  },
];

let expandedId = null;

function renderFAQs(itemsToShow = faqs) {
  const faqList = document.getElementById("faqList");
  faqList.innerHTML = itemsToShow
    .map(
      (faq) => `
                <div class="faq-item ${expandedId === faq.id ? "active" : ""}">
                    <button class="faq-question" onclick="toggleFAQ(${faq.id})">
                        <span>${faq.question}</span>
                        <span class="faq-icon">▼</span>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer-text">${faq.answer}</div>
                    </div>
                </div>
            `,
    )
    .join("");
}

function toggleFAQ(id) {
  expandedId = expandedId === id ? null : id;
  renderFAQs(getCurrentFilteredFAQs());
}

function getCurrentFilteredFAQs() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();
  if (!searchQuery) return faqs;

  return faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery) ||
      faq.answer.toLowerCase().includes(searchQuery),
  );
}

document.getElementById("searchInput").addEventListener("input", () => {
  expandedId = null;
  renderFAQs(getCurrentFilteredFAQs());
});

renderFAQs();
