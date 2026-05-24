async function loadHistory() {
  // 1. Ambil token dari localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login dulu ya, Lek!");
    window.location.href = "login.html";
    return;
  }

  try {
    // 2. Tembak API yang sudah kita buat di history.js
    const response = await fetch("/history/my-history", {
      method: "GET",
      headers: {
        Authorization: token, // Token ini kunci buat buka datamu
      },
    });

    const data = await response.json();
    const container = document.getElementById("history-list");
    const countLabel = document.getElementById("history-count");
    container.innerHTML = "";

    if (!data || data.length === 0) {
      countLabel.textContent = "0 riwayat";
      container.innerHTML =
        '<div class="history-empty">Belum ada riwayat chat nih. Yuk mulai chat dengan AI sekarang!</div>';
      return;
    }

    countLabel.textContent = `${data.length} riwayat`;

    // 3. Looping data dari Database ke HTML
    data.forEach((item) => {
      const date = new Date(item.created_at).toLocaleString("id-ID");
      container.innerHTML += `
                    <article class="history-card">
                        <div class="history-card-header">
                            <p class="history-question">${item.message}</p>
                            <span class="history-card-date">${date}</span>
                        </div>
                        <div class="history-answer">
                            ${item.response.replace(/\n/g, "<br>")}
                        </div>
                    </article>
                `;
    });
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("history-count").textContent = "Error";
    document.getElementById("history-list").innerHTML =
      '<div class="history-empty">Gagal ambil data. Cek koneksi server atau refresh halaman.</div>';
  }
}

// Jalankan fungsi pas halaman dibuka
loadHistory();
