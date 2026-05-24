const chatBox = document.getElementById("chat-box");
const queryInput = document.getElementById("userQuery");
const typingContainer = document.getElementById("typing-container");

// Fungsi untuk memuat history chat pengguna
async function loadChatHistory() {
  const token = localStorage.getItem("token");
  if (!token) {
    // Jika tidak ada token, redirect ke login
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("/history/my-history", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (data && data.length > 0) {
      // Tampilkan history di chat box
      data.forEach((item) => {
        chatBox.innerHTML += `
                <div class="bubble user-msg">${item.message}</div>
                <div class="bubble ai-msg">${item.response.replace(/\n/g, "<br>")}</div>
              `;
      });
      scrollChatToBottom();
    }
  } catch (error) {
    console.error("Error loading history:", error);
  }
}

function scrollChatToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendChat() {
  const msg = queryInput.value.trim();
  const token = localStorage.getItem("token");

  if (!msg) return;
  if (!token) return alert("Silakan login terlebih dahulu.");

  chatBox.innerHTML += `<div class="bubble user-msg">${msg}</div>`;
  queryInput.value = "";
  scrollChatToBottom();

  const typingId = "typing-" + Date.now();
  typingContainer.innerHTML = `<div id="${typingId}" class="typing">AI sedang mengetik...</div>`;
  scrollChatToBottom();

  try {
    const res = await fetch("/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();

    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    chatBox.innerHTML += `
                    <div class="bubble ai-msg">
                        ${data.reply.replace(/\n/g, "<br>")}
                    </div>
                `;
    scrollChatToBottom();
  } catch (error) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    chatBox.innerHTML += `<div class="bubble ai-msg" style="color: #d6336c; border-color: rgba(214, 51, 108, 0.18);">Maaf, terdapat gangguan koneksi. Coba lagi nanti.</div>`;
    scrollChatToBottom();
  }
}

// Muat history saat halaman dimuat
window.addEventListener("load", loadChatHistory);
