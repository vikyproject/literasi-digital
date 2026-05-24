const toastElement = document.getElementById("toast");
let toastTimer;

function showToast(message, type = "success") {
  toastElement.className = `toast show ${type}`;
  toastElement.innerHTML = `<span class="toast-icon">${
    type === "success" ? "✔️" : "⚠️"
  }</span><span>${message}</span>`;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 3200);
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    // SIMPAN TOKEN KE BROWSER
    localStorage.setItem("token", data.token);
    showToast("Login berhasil! Selamat datang.");
    const target = data.role === "admin" ? "admin.html" : "menu.html";
    setTimeout(() => {
      window.location.href = target;
    }, 1200);
  } else {
    showToast("Gagal: " + data.msg, "error");
  }
});
