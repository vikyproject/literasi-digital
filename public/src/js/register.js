const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Biar gak refresh halaman

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Kirim data ke backend (API yang tadi kita buat)
  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Wah, Berhasil! Sekarang silakan login ya.");
      window.location.href = "index.html"; // Pindah ke halaman login
    } else {
      alert("Duh, Gagal: " + data.msg);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan koneksi ke server.");
  }
});
